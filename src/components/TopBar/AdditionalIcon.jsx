import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import MessageItem from "./MessageItem";
import { toast, ToastContainer } from "react-toastify";
import { Email } from "@mui/icons-material";

export default function MessageBell({ primaryHover, iconColor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessages, setShowMessages] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const mensajesNoLeidosCount = useSelector((state) => state.mensajes.noLeidos);
  const messagesRef = useRef(null);
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;

  useEffect(() => {
    if (!userId) return;

    console.log("🔌 Conectando socket...");
    socket.emit("join-mensaje-room", { userId });
    socket.emit("getMensajesNoLeidosCount", { userId });

    // Cargar los mensajes no leídos inicialmente
    const cargarMensajesNoLeidos = async () => {
      try {
        const res = await fetch(`${API_LINK}/chat/obtener-mensajes/no-leidos/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setMensajes(data);
          dispatch({ type: "UPDATE_MENSAJES_COUNT", payload: data.length });
        }
      } catch (error) {
        console.error("❌ Error al obtener mensajes no leídos:", error);
      }
    };

    cargarMensajesNoLeidos();

    // Manejar eventos del socket
    const handleMensajesCount = (count) => {
      dispatch({ type: "UPDATE_MENSAJES_COUNT", payload: count });
    };

    const handleNuevoMensaje = (mensaje) => {
      if (mensaje.receptores.includes(userId)) {
        dispatch({ type: "ADD_MENSAJE", payload: mensaje });
        setMensajes(prev => [...prev, mensaje]);
        toast.info("📩 Nuevo mensaje recibido");
        new Audio("/sounds/mensaje.wav").play();
      }
    };

    socket.on("mensajesNoLeidosCount", handleMensajesCount);
    socket.on("nuevo-mensaje", handleNuevoMensaje);


    return () => {
      socket.off("mensajesNoLeidosCount", handleMensajesCount);
      socket.off("nuevo-mensaje", handleNuevoMensaje);
    };
  }, [userId, dispatch, API_LINK]);

  const toggleMessages = () => setShowMessages(!showMessages);

  return (
    <div className="relative">
      <div
        className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
        onClick={toggleMessages}
      >
        <Badge badgeContent={mensajesNoLeidosCount} color="primary">
          <Email className={iconColor} sx={{ fontSize: 23 }} />
        </Badge>
      </div>

      {showMessages && (
        <div
          ref={messagesRef}
          className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
        >
          <div className="text-[#6a62dc] text-base font-semibold mb-4 text-center">
            Tienes {mensajesNoLeidosCount} mensajes sin leer
          </div>
          <div className="flex flex-col gap-4">
            {mensajes.slice().reverse().slice(0, 5).map((msg, index) => (
              <MessageItem key={index} mensaje={msg} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <button
              className="text-[#6a62dc] text-sm font-medium underline underline-offset-2"
              onClick={() => {
                setShowMessages(false);
                navigate("/chat");
              }}
            >
              Ver todos los mensajes
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" theme="dark" autoClose={5000} />
    </div>
  );
}
