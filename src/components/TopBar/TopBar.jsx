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
      className={`fixed top-0 left-0 w-full h-[122px] ${bgColor} shadow flex justify-between items-center px-4 sm:px-6 md:px-8 text-balance lg:px-[68px] py-4 z-40`}
    >
      <div
        className={`${primaryColors} text-2xl md:text-3xl ml-20 font-semibold `}
      >
        {title}
      </div>

      <div className="flex items-center  md:mr-6 lg:mr-8">
        <AdditionalIcon primaryHover={primaryHover} iconColor={iconColor} />

        <NotificationBell primaryHover={primaryHover} iconColor={iconColor} />

        <UserMenu
          theme={theme}
          primaryColors={primaryColors}
          primaryHover={primaryHover}
        />
      </div>
    </header>
  );
}
