import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";
import BuscarUsuarios from "../components/chat/BuscarUsuarios";
import { AttachFile, Done, DoneAll } from "@mui/icons-material";



function Chat() {
    const [chatActivo, setChatActivo] = useState(null);
    const [mensajes, setMensajes] = useState([]);
    const [mensajesNoLeidos, setMensajesNoLeidos] = useState({});
    const [chatId, setChatId] = useState("");
    const [chatsUsuario, setChatsUsuario] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const messagesEndRef = useRef(null);

    const token = localStorage.getItem("token");
    let userId = null;
    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            userId = decodedToken?.id;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
    }

    const fetchChatsUsuario = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chats-usuario/${userId}`);
            if (response.ok) {
                const data = await response.json();
                const chatsUnicos = data.filter((chat, index, self) =>
                    index === self.findIndex((t) => (
                        t._id === chat._id
                    ))
                );
                setChatsUsuario(chatsUnicos);
            } else {
                console.error("Error al obtener los chats del usuario");
            }
        } catch (error) {
            console.error("Error al obtener los chats del usuario:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchChatsUsuario();
        }
    }, [userId]);
    

    const fetchChat = async (usuarioId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-chat-por-usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emisor: userId,
                    receptor: usuarioId,
                }),
            });

            if (response.ok) {
                const chatData = await response.json();
                console.log("Chat cargado correctamente:", chatData);
                return chatData;
            }
            return null;
        } catch (error) {
            console.error("Error al obtener el chat:", error);
            return null;
        }
    };

    const crearNuevoChat = async (usuarioId) => {
        try {
            const chatExistente = await fetchChat(usuarioId);
            if (chatExistente) {
                console.log("El chat ya existe:", chatExistente);
                return chatExistente;
            }

            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/crear-chat`, {
                method: "POST",
                body: JSON.stringify({
                    tipo: "privado",
                    participantes: [usuarioId, userId],
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const chat = await response.json();
            return chat;
        } catch (error) {
            console.error("Error al crear el chat:", error);
        }
    };

    const seleccionarUsuario = async (usuario) => {
        console.log("Usuario seleccionado:", usuario);
        console.log(chatActivo);
    
        // Asegúrate de que la búsqueda de un chat existente sea correcta
        const chatExistente = chatsUsuario.find(chat => {
            const participantesIds = chat.participantes.map(p => p._id || p);
            return participantesIds.length === 2 &&
                participantesIds.includes(usuario._id) &&
                participantesIds.includes(userId);
        });
    
        if (chatExistente) {
            const mensajesOrdenados = [...chatExistente.mensajes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setChatActivo(chatExistente);
            setMensajes(mensajesOrdenados);
            setChatId(chatExistente._id);
        } else {
            const nuevoChat = {
                participantes: [usuario, { _id: userId }],
                nombre: usuario.nombre,
                imagenUrl: usuario.userImage || "/ruta/por/defecto/imagen.jpg",
                mensajes: [],
                tipo: "privado",
                _id: null
            };
    
            setChatActivo(nuevoChat);
            setMensajes([]);
            setChatId(null);
        }
    };

    const marcarComoLeido = async (mensajeId) => {
        // Primero, actualiza el estado de manera optimista
        setMensajes((prevMensajes) =>
            prevMensajes.map((msg) =>
                msg._id === mensajeId
                    ? { ...msg, leidoPor: [...msg.leidoPor, { usuarioId: userId, leido: true }] }
                    : msg
            )
        );
    
        try {
            // Luego, realiza la solicitud a la API para persistir el cambio
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/chat/marcar-como-leido`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mensajeId,
                    usuarioId: userId,
                }),
            });
    
            if (response.ok) {
                // Emitir el evento a través de socket para actualizar a todos los usuarios conectados
                socket.emit("marcar-como-leido", { mensajeId, usuarioId: userId });
            } else {
                console.log("Hubo un problema al marcar el mensaje como leído");
            }
        } catch (error) {
            console.error("Error al marcar el mensaje como leído:", error);
        }
    };
    
    useEffect(() => {
        if (chatId) {
            const obtenerMensajes = async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_LINK}/chat/obtener-mensajes/${chatId}?usuarioId=${userId}`);
                    const data = await res.json();
                    const mensajesOrdenados = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Orden descendente
                    setMensajes(mensajesOrdenados);
                    
                    // Marcar los mensajes como leídos tan pronto lleguen
                    data.forEach(mensaje => {
                        if (mensaje.remitente !== userId) {
                            marcarComoLeido(mensaje._id);
                        }
                    });
    
                    // Actualiza el conteo de mensajes no leídos después de obtener los mensajes
                    const mensajesNoLeidosPorChat = {
                        [chatId]: contarMensajesNoLeidos(data, userId),
                    };
                    setMensajesNoLeidos(mensajesNoLeidosPorChat);
                } catch (err) {
                    console.error("Error al obtener mensajes:", err);
                }
            };
    
            obtenerMensajes();
    
            const manejarNuevoMensaje = (nuevoMensaje) => {
                // Verifica si el nuevo mensaje pertenece al chat actual antes de agregarlo
                if (nuevoMensaje.chatId === chatId) {
                    setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
                    if (nuevoMensaje.remitente !== userId) {
                        marcarComoLeido(nuevoMensaje._id);
                    }
                }
            };
    
            // Escuchar el evento de un mensaje marcado como leído
            socket.on("marcar-como-leido", (mensajeActualizado) => {
                setMensajes((prevMensajes) =>
                    prevMensajes.map((msg) =>
                        msg._id === mensajeActualizado._id
                            ? { ...msg, leidoPor: mensajeActualizado.leidoPor }
                            : msg
                    )
                );
            });
    
            // Escuchar el evento de mensaje recibido
            socket.on("mensaje-recibido", manejarNuevoMensaje);
    
            return () => {
                socket.off("mensaje-recibido", manejarNuevoMensaje);
                socket.off("marcar-como-leido");
            };
        }
    }, [chatId, userId]);
    
    


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        console.log(chatActivo)
    }, [mensajes]);

    const enviarMensaje = async () => {
        if (!mensaje.trim() || !userId) return;
    
        let currentChatId = chatId;
        let otroUsuario;
    
        // Siempre intentamos identificar al otro participante
        if (chatActivo?.participantes) {
            otroUsuario = chatActivo.participantes.find(p => p._id !== userId);
        }
    
        // Si no hay chat aún, lo creamos
        if (!chatId && otroUsuario) {
            const nuevoChat = await crearNuevoChat(otroUsuario._id);
            if (!nuevoChat) return;
    
            setChatsUsuario(prev => [...prev, nuevoChat]);
            setChatActivo(nuevoChat);
            setChatId(nuevoChat._id);
            currentChatId = nuevoChat._id;
        }
    
        if (!currentChatId || !otroUsuario) return;
        console.log("otro: " + otroUsuario);
        socket.emit("nuevo-mensaje", {
            chatId: currentChatId,
            remitente: userId,
            receptores: [otroUsuario._id], // ✅ asegurado
            contenido: mensaje,
            imagenUrl: null,
        });
    
        setMensaje("");
        fetchChat(otroUsuario);
        fetchChatsUsuario();
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            const isAtBottom = messagesEndRef.current.getBoundingClientRect().top <= window.innerHeight;
            if (isAtBottom) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [mensajes]);

    useEffect(() => {
        socket.on("marcar-como-leido", (mensajeActualizado) => {
            setMensajes((prevMensajes) =>
                prevMensajes.map((msg) =>
                    msg._id === mensajeActualizado._id
                        ? { ...msg, leidoPor: mensajeActualizado.leidoPor } // Actualiza la propiedad leidoPor
                        : msg
                )
            );
        });
    
        return () => {
            socket.off("marcar-como-leido"); // Limpiar el evento cuando el componente se desmonte
        };
    }, []);

    useEffect(() => {
        socket.on("mensaje-recibido", (nuevoMensaje) => {
            if (nuevoMensaje.chatId !== chatId) {
                setMensajesNoLeidos((prev) => ({
                    ...prev,
                    [nuevoMensaje.chatId]: (prev[nuevoMensaje.chatId] || 0) + 1,
                }));
            }
        });
    
        return () => {
            socket.off("mensaje-recibido");
        };
    }, [chatId]);

    const contarMensajesNoLeidos = (mensajes, userId) => {
        return mensajes.filter(mensaje => 
            mensaje.remitente !== userId && 
            !mensaje.leidoPor.some(leido => leido.userId === userId)
        ).length;
    };

    useEffect(() => {
        if (chatsUsuario.length > 0) {
            const mensajesNoLeidosPorChat = {};
            
            chatsUsuario.forEach(chat => {
                const noLeidos = contarMensajesNoLeidos(chat.mensajes, userId);
                if (noLeidos > 0) {
                    mensajesNoLeidosPorChat[chat._id] = noLeidos;
                }
            });
    
            setMensajesNoLeidos(mensajesNoLeidosPorChat);
        }
    }, [chatsUsuario, userId]);

    useEffect(() => {
        if (chatsUsuario.length > 0) {
            const nuevosMensajesNoLeidos = {};
    
            chatsUsuario.forEach(chat => {
                nuevosMensajesNoLeidos[chat._id] = contarMensajesNoLeidos(chat.mensajes, userId);
            });
    
            setMensajesNoLeidos(nuevosMensajesNoLeidos);
        }
    }, [chatsUsuario, userId]);
    

    return (
        <div className="flex flex-col md:flex-row h-full w-full">
            <title>CHAT | GESTOR</title>
      
          <div className="flex flex-col lg:flex-row h-full w-full gap-4">
  <div className="w-full lg:w-1/4 p-4 bg-white border-r border-gray-700   overflow-y-auto flex flex-col">
   
    <div>
      <BuscarUsuarios onSeleccionarUsuario={seleccionarUsuario} />
    </div>
    <h2 className="text-md text-[#8780e9] font-bold mb-4">Chats activos</h2>

    <div className="flex-1 overflow-auto">
                        {chatsUsuario.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => {
                                    if (chatId === chat._id) return;
                                    setChatActivo(chat);
                                    setMensajes(chat.mensajes);
                                    setChatId(chat._id);
                                    setMensajesNoLeidos(prev => ({
                                        ...prev,
                                        [chat._id]: 0
                                    }));
                                }}
                                className={`cursor-pointer p-2 mb-2 hover:bg-gray-700 text-[#6a62dc] hover:text-white rounded ${chatId === chat._id ? "bg-[#c1dbf9]" : ""}`}
                            >
                                <div className="flex items-center gap-2 relative">
                                    {chat.tipo === "privado" ? (
                                        chat.participantes
                                            .filter((participante) => participante._id !== userId)
                                            .map((usuario) => (
                                                <img
                                                    key={usuario._id}
                                                    src={usuario.userImage || "/ruta/por/defecto/imagen.jpg"}
                                                    alt="Avatar del usuario"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ))
                                    ) : (
                                        <img
                                            src={chat.imagenUrl || "/ruta/por/defecto/imagen.jpg"}
                                            alt="Avatar del grupo"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )}
                                    
                                    <div className="flex items-center gap-1">
                                        <p className="">{chat.nombre || "Chat de grupo"}</p>

                                        {/* Indicador de mensajes no leídos */}
                                        {mensajesNoLeidos[chat._id] > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {mensajesNoLeidos[chat._id]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
    <div className="border-t border-gray-600 mt-2"></div>

                    <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg shadow-lg hover:bg-blue-600 mt-2">
                        Crear Grupo
                    </button>
  </div>
  

  {/* Contenedor de mensajes */}
  <div className="w-full lg:w-3/4 p-4 flex flex-col max-h-[calc(100vh-180px)]">
  {/* Encabezado del chat */}
  {chatActivo && (
    <div className="flex items-center gap-2 mb-4 border-b border-gray-600 pb-2">
        {chatActivo.tipo === "privado"
            ? chatActivo.participantes
                .filter((p) => p._id !== userId)
                .map((usuario) => (
                    <div key={usuario._id} className="flex items-center gap-2">
                        <img
                            src={usuario.userImage || "/default-user.png"}
                            alt="Foto de usuario"
                            className="w-13 h-13 rounded-full object-cover"
                        />
                        <span className="text-2xl font-medium text-[#6a62dc]">
                            {usuario.nombre}
                        </span>
                    </div>
                ))
            : (
                <div className="flex items-center gap-2">
                    <img
                        src={chatActivo.imagenUrl || "/default-group.png"}
                        alt="Foto del grupo"
                        className="w-13 h-13 rounded-full object-cover"
                    />
                    <span className="text-2xl font-medium text-white">
                        {chatActivo.nombre || "Chat de grupo"}
                    </span>
                </div>
            )}
    </div>
)}

  {/* Área de mensajes con scroll */}
  <div className="flex-1 overflow-y-auto border  p-4 rounded bg-white">
  {chatActivo ? (
  mensajes.length > 0 ? (
    mensajes.map((msg, index) => {
      const fechaActual = new Date(msg.enviadoEn);
      const fechaAnterior =
        index > 0 ? new Date(mensajes[index - 1].enviadoEn) : null;

      // Función para formato tipo WhatsApp
      const formatFecha = (fecha) => {
        const hoy = new Date();
        const ayer = new Date();
        ayer.setDate(hoy.getDate() - 1);

        const fechaStr = fecha.toDateString();
        if (fechaStr === hoy.toDateString()) return 'Hoy';
        if (fechaStr === ayer.toDateString()) return 'Ayer';
        return fecha.toLocaleDateString(); // Ej: 18/04/2025
      };

      const mostrarFecha =
        !fechaAnterior ||
        fechaAnterior.toDateString() !== fechaActual.toDateString();

      return (
        <React.Fragment key={index}>
          {mostrarFecha && (
            <div className="text-center my-4">
              <span className="bg-[#a19bf5] text-white px-4 py-1 rounded-full text-sm shadow-md">
                {formatFecha(fechaActual)}
              </span>
            </div>
          )}

          <div
            className={`flex ${
              msg.remitente === userId ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            {msg.remitente !== userId &&
              chatActivo.participantes
                .filter((p) => p._id === msg.remitente)
                .map((usuario) => (
                  <img
                    key={usuario._id}
                    src={usuario.userImage || '/ruta/por/defecto/imagen.jpg'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                ))}

            <div
              className={`p-2 max-w-[70%] rounded-lg text-sm whitespace-pre-wrap break-words ${
                msg.remitente === userId
                  ? 'bg-gray-300 text-black'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {msg.remitente !== userId && (
  <p className="text-xs font-semibold">
    {
      chatActivo.participantes.find((p) => p._id === msg.remitente)
        ?.nombre || 'Usuario'
    }
  </p>
)}
              <p className="text-md">{msg.contenido}</p>
              <p className="mt-1 text-right flex items-center justify-end gap-2 text-xs text-gray-600">
                <span>
                    {msg.enviadoEn
                    ? new Date(msg.enviadoEn).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        })
                    : 'Hora no disponible'}
                </span>

                {msg.leidoPor?.some((l) => l.leido && l.usuarioId !== userId) ? (
                    <DoneAll className="text-blue-500" fontSize="extrasmall" />
                ) : (
                    <DoneAll className="text-gray-500" fontSize="extrasmall" />
                )}
                </p>
            </div>
          </div>
        </React.Fragment>
      );
    })
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <img
        src="/undraw_messaging_1s2k.svg"
        alt="Sin mensajes"
        className="w-60 h-60 opacity-60 mb-6"
      />
      <p className="mt-4">No hay mensajes en esta conversación.</p>
    </div>
  )
) : (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-8">
      <img
        src="/undraw_chat_qmyo.svg" 
        alt="Selecciona un chat"
        className="w-60 h-60 opacity-60 mb-6"
      />
      <h2 className="text-2xl font-semibold text-[#6a62dc]">Selecciona un chat para comenzar</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-md">
        Elige una conversación de la lista o crea una nueva para empezar a chatear con tus contactos.
      </p>
    </div>
  )}
    <div ref={messagesEndRef} />
  </div>

  {/* Input de mensaje */}
  {chatActivo && (
    <form
    onSubmit={(e) => {
      e.preventDefault();
      enviarMensaje();
    }}
    className="flex mt-4 gap-2"
  >
    <button
        // onClick={enviarMensaje}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
        <AttachFile className="text-white" fontSize="small" />
    </button>
    <input
      type="text"
      value={mensaje}
      onChange={(e) => setMensaje(e.target.value)}
      placeholder="Escribe un mensaje..."
      className="flex-1 p-2 border border-gray-600 text-gray-800 rounded"
    />
  </form>
    // <div className="flex mt-4 gap-2">
    //   <input
    //     type="text"
    //     value={mensaje}
    //     onChange={(e) => setMensaje(e.target.value)}
    //     placeholder="Escribe un mensaje..."
    //     className="flex-1 p-2 border border-gray-600 text-gray-800 rounded"
    //   />
    //   <button
    //     onClick={enviarMensaje}
    //     className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
    //   >
    //     Enviar
    //   </button>
    // </div>
  )}
</div>

</div>
              
        </div>
      );
}

export default Chat;



