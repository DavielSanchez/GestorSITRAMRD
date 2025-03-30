import React, { useState, useRef, useEffect } from "react";
import { Email, Notifications } from "@mui/icons-material";
import {
  useBG,
  usePrimaryColors,
  useColorsWithHover,
  useIconColor,
} from "../../ColorClass";
import AdditionalIcon from "./AdditionalIcon";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export function useOutsideClick(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onOutsideClick]);
}

export default function BarraSuperior({ title, theme }) {
  const bgColor = useBG(theme);
  const primaryColors = usePrimaryColors(theme);
  const primaryHover = useColorsWithHover(theme);
  const iconColor = useIconColor(theme, "default");

  return (
    <header
      className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}
    >
      {/* Título en morado */}
      <div className={`${primaryColors} text-[40px] font-semibold font-['Inter']`}>
        {title}
      </div>

      {/* Íconos a la derecha */}
      <div className="flex items-center gap-4">
        {/* Ícono de correo + panel de mensajes */}
        <AdditionalIcon primaryHover={primaryHover} iconColor={iconColor} />

        {/* Ícono de notificaciones + panel de notificaciones */}
        <NotificationBell primaryHover={primaryHover} iconColor={iconColor} />

        {/* Menú del usuario */}
        <UserMenu
          theme={theme}
          primaryColors={primaryColors}
          primaryHover={primaryHover}
        />
      </div>
    </header>
  );
}








