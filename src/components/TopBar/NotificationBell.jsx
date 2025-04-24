import { Notifications } from "@mui/icons-material";
import { useRef, useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import { useOutsideClick } from "./TopBar";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import socket from "../../socket";
import { useNavigate } from "react-router-dom";


export default function NotificationBell({ primaryHover, iconColor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alertasNoLeidasCount = useSelector((state) => state.alertas.noLeidas);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const [alertas, setAlertas] = useState([]);
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useOutsideClick(notificationsRef, () => setShowNotifications(false));

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNewNoLeidas = async () => {
    const response = await fetch(`${API_LINK}/alerta/no-leidas`, {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    })

    if (response.ok) {
      const data = await response.json();
      setAlertas(data)
    }else{
      console.error('error al traer alertas no leidas')
    }

  }

  useEffect(() => {
    if (!userId) return;

    handleNewNoLeidas()
  
    socket.emit("join-alert-room", { userId });
    socket.emit("getNoLeidasCount", { userId });
  
    const handleNoLeidas = (count) => {
      dispatch({ type: "UPDATE_ALERT_COUNT", payload: count });
    };
  
    const handleNuevaAlerta = (alerta) => {
      if (alerta.destinatarios.includes(userId)) {
        dispatch({ type: "ADD_ALERT", payload: alerta });
      }
    };
  
    const handleAlertaRecibida = (alerta) => {
      if (alerta.destinatarios.includes(userId)) {
        dispatch({ type: "ADD_ALERT", payload: alerta });
        toast.info(`Nueva alerta`);

        const audio = new Audio("/sounds/alertas.wav");

        audio.play().then(() => {
          audio.onended = () => {
            const secondAudio = new Audio("/sounds/alertas.wav");
            secondAudio.play().catch((err) => console.error("Error al repetir sonido:", err));
          };
        }).catch((error) => {
          console.error("Error al reproducir sonido:", error);
        });
      }
    };
  
    socket.off("noLeidasCount").on("noLeidasCount", handleNoLeidas);
    socket.off("nueva-alerta").on("nueva-alerta", handleNuevaAlerta);
    socket.off("alerta-recibida").on("alerta-recibida", handleAlertaRecibida);
  
    return () => {
      socket.off("noLeidasCount", handleNoLeidas);
      socket.off("nueva-alerta", handleNuevaAlerta);
      socket.off("alerta-recibida", handleAlertaRecibida);
    };
  }, [dispatch, userId, showNotifications]);
  

  return (
    <div className="relative">
      <div
        className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
        onClick={toggleNotifications}
      >
        {alertasNoLeidasCount > -1 && (
          <Badge badgeContent={alertasNoLeidasCount} color="primary">
            <Notifications className={iconColor} sx={{ fontSize: 23 }} />
          </Badge>
        )}
      </div>

      {showNotifications && (
        <div
          ref={notificationsRef}
          className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
        >
          <div className="text-[#6a62dc] text-base font-semibold mb-4 text-center">
            Tienes {alertasNoLeidasCount} nuevas notificaciones
          </div>
          <div className="flex flex-col gap-4">
          {alertas.slice().reverse().slice(0, 5).map((alerta, index) => (
  <NotificationItem key={index} alerta={alerta} />
))}
          </div>

          <div className="mt-4 text-center">
            <a className="text-[#6a62dc] text-sm font-medium hover:underline underline-offset-2"
            onClick={() => {
              setShowNotifications(!showNotifications)
              navigate('/Alertas')
              }}>
              Ver todas las notificaciones
            </a>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" theme="dark" autoClose={50000} />

    </div>
  );
}
