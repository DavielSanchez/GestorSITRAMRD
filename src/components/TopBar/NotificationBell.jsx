import { Notifications } from "@mui/icons-material";
import { useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import {useOutsideClick} from './TopBar'
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

export default function NotificationBell({ primaryHover, iconColor }) {

  const alertasNoLeidasCount = useSelector(state => state.alertas.noLeidas);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef(null);
  
    // Cierra el contenedor al hacer clic fuera
    useOutsideClick(notificationsRef, () => setShowNotifications(false));
  
    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
    };
  
    return (
      <div className="relative">
        <div
          className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
          onClick={toggleNotifications}
        >
          {alertasNoLeidasCount > -1 && (
            <Badge badgeContent={alertasNoLeidasCount} color="primary">
              <Notifications className={iconColor} sx={{fontSize:23}}/>
          </Badge>
          )}
        </div>
  
        {showNotifications && (
          <div
            ref={notificationsRef}
            className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
          >
            {/* Título: "Tienes # nuevas notificaciones" */}
            <div className="text-[#6a62dc] text-base font-semibold mb-4 text-center">
              Tienes 3 nuevas notificaciones
            </div>
  
            {/* Lista de notificaciones */}
            <div className="flex flex-col gap-4">
              <NotificationItem />
              <NotificationItem />
              <NotificationItem />
            </div>
  
            {/* Ver todas las notificaciones */}
            <div className="mt-4 text-center">
              <button className="text-[#6a62dc] text-sm font-medium underline underline-offset-2">
                Ver todas las notificaciones
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }