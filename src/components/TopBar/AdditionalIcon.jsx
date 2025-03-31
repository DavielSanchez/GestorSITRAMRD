import { Email } from "@mui/icons-material";
import MessageItem from "./MessageItem";
import { useRef, useState } from "react";
import {useOutsideClick} from './TopBar'

export default function AdditionalIcon({ primaryHover, iconColor }) {
    const [showMessages, setShowMessages] = useState(false);
    const messagesRef = useRef(null);
  
    // Cierra el panel al hacer clic fuera de él
    useOutsideClick(messagesRef, () => setShowMessages(false));
  
    const toggleMessages = () => {
      setShowMessages(!showMessages);
    };
  
    return (
      <div className="relative">
        {/* Ícono de correo */}
        <div
          className={`flex items-center cursor-pointer p-2 ${primaryHover} rounded-full`}
          onClick={toggleMessages}
        >
          <Email  className={iconColor} sx={{fontSize:23}} />
        </div>
  
        {/* Contenedor de mensajes */}
        {showMessages && (
          <div
            ref={messagesRef}
            className="absolute right-0 mt-2 w-[320px] bg-white border border-[#6a62dc] rounded-xl shadow-lg p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-[#6a62dc] text-base font-semibold">
                Mensajes
              </div>
              <button className="text-red-500 text-sm font-medium">
                Marcar todos como leídos
              </button>
            </div>
  
            {/* Lista de mensajes */}
            <div className="flex flex-col gap-4">
              <MessageItem user="Usuario" />
              <MessageItem user="Admin" />
              <MessageItem user="Daviel" />
            </div>
  
            {/* Ver todos los mensajes */}
            <div className="mt-4 text-center">
              <button className="text-[#6a62dc] text-sm font-medium underline underline-offset-2">
                Ver todos los mensajes
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }