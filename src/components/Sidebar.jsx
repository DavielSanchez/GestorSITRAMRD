import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useBG,
  useBGForButtons,
  usePrimaryColorsBG,
  useText,
  useColorWandB,
  useColors,
  useIconColor,
  usePrimaryColors,
} from "../ColorClass";
import { jwtDecode } from "jwt-decode";
import {
  WarningAmber,
  Message,
  Preview,
  ContentPasteGo,
  ContentPaste,
  SupervisorAccount,
  ConnectWithoutContact,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import CommuteIcon from "@mui/icons-material/Commute";
import { SitramIcon } from "../assets/SitramIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { fontGrid } from "@mui/material/styles/cssUtils";

const menuConfig = {
  Operador: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 23 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.27378 5.49045H4.45525C3.70773 5.49045 2.99083 5.85197 2.46225 6.49548C1.93367 7.13899 1.63672 8.01177 1.63672 8.92183V29.5101C1.63672 30.4201 1.93367 31.2929 2.46225 31.9364C2.99083 32.5799 3.70773 32.9414 4.45525 32.9414H18.5479C19.2954 32.9414 20.0123 32.5799 20.5409 31.9364C21.0695 31.2929 21.3664 30.4201 21.3664 29.5101V8.92183C21.3664 8.01177 21.0695 7.13899 20.5409 6.49548C20.0123 5.85197 19.2954 5.49045 18.5479 5.49045H15.7294M7.27378 5.49045C7.27378 4.5804 7.57074 3.70761 8.09931 3.06411C8.62789 2.4206 9.3448 2.05908 10.0923 2.05908H12.9109C13.6584 2.05908 14.3753 2.4206 14.9039 3.06411C15.4324 3.70761 15.7294 4.5804 15.7294 5.49045M7.27378 5.49045C7.27378 6.40051 7.57074 7.27329 8.09931 7.9168C8.62789 8.56031 9.3448 8.92183 10.0923 8.92183H12.9109C13.6584 8.92183 14.3753 8.56031 14.9039 7.9168C15.4324 7.27329 15.7294 6.40051 15.7294 5.49045M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
            stroke="#6a62dc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Asignar",
      path: "/asignar",
      onClick: "Asignar",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 30 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.89123 29.6817H5.41982C4.51283 29.6817 3.64298 29.3171 3.00164 28.6682C2.3603 28.0193 2 27.1392 2 26.2215V5.46021C2 4.5425 2.3603 3.66239 3.00164 3.01347C3.64298 2.36456 4.51283 2 5.41982 2H19.0991C20.0061 2 20.8759 2.36456 21.5173 3.01347C22.1586 3.66239 22.5189 4.5425 22.5189 5.46021V19.301M17.3892 27.9516L20.809 31.4118L27.6486 24.4913M8.83964 8.92042H15.6793M8.83964 15.8408H12.2595"
            stroke="#6a62dc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Incidencias",
      path: "/incidencias",
      onClick: "Incidencias",
      icon: <FlagIcon />,
    },
    {
      label: "Comunicacion  ",
      icon: <ConnectWithoutContact />,
      title: "Comunicaciones",
      subMenu: [
        { label: "Chat", icon: <Message />, path: "/Chat" },
        { label: "Alertas", icon: <WarningAmber />, path: "/Alertas" },
      ],
    },
    {
      label: "Reportes",
      path: "/reportes",
      onClick: "Reportes",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 36 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0031 7.18519H6.50154C5.30766 7.18519 4.16267 7.73148 3.31847 8.70389C2.47427 9.6763 2 10.9952 2 12.3704V43.4815C2 44.8567 2.47427 46.1756 3.31847 47.148C4.16267 48.1204 5.30766 48.6667 6.50154 48.6667H29.0092C30.2031 48.6667 31.3481 48.1204 32.1923 47.148C33.0365 46.1756 33.5108 44.8567 33.5108 43.4815V12.3704C33.5108 10.9952 33.0365 9.6763 32.1923 8.70389C31.3481 7.73148 30.2031 7.18519 29.0092 7.18519H24.5077M11.0031 7.18519C11.0031 5.80999 11.4774 4.49112 12.3216 3.51871C13.1658 2.54629 14.3107 2 15.5046 2H20.0062C21.2 2 22.345 2.54629 23.1892 3.51871C24.0334 4.49112 24.5077 5.80999 24.5077 7.18519M11.0031 7.18519C11.0031 8.56038 11.4774 9.87925 12.3216 10.8517C13.1658 11.8241 14.3107 12.3704 15.5046 12.3704H20.0062C21.2 12.3704 22.345 11.8241 23.1892 10.8517C24.0334 9.87925 24.5077 8.56038 24.5077 7.18519M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ],

  Administrador: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: <DashboardIcon />,
    },
    {
      label: "Administrador",
      icon: <SupervisorAccount />,
      title: "Operaciones",
      subMenu: [
        { label: "Visualizar", icon: <Preview />, path: "" },
        { label: "Asignar", icon: <ContentPaste />, path: "" },
        { label: "Registrar", icon: <ContentPasteGo />, path: "" },
      ],
    },
    {
      label: "Comunicacion  ",
      icon: <ConnectWithoutContact />,
      title: "Comunicaciones",
      subMenu: [
        { label: "Chat", icon: <Message />, path: "/Chat" },
        { label: "Alertas", icon: <WarningAmber />, path: "/Alertas" },
      ],
    },
    {
      label: "Choferes",
      icon: <ConnectWithoutContact />,
      title: "Panel Choferes",
      subMenu: [
        { label: "Dashbord", icon: <DashboardIcon />, path: "" },
        { label: "Chat", icon: <Message />, path: "" },
        { label: "Modo viaje", icon: <CommuteIcon />, path: "" },
      ],
    },
    {
      label: "Incidencias",
      path: "/incidencias",
      onClick: "Incidencias",
      icon: <FlagIcon />,
    },
  ],

  Chofer: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: (
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="89"
              height="87"
              viewBox="0 0 89 87"
              fill="none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="88"
                height="86"
                rx="19.5"
                fill="#F1F2FF"
                stroke="#6A62DC"
              />
              <path
                d="M39.3462 29.5693H35.9099C34.9986 29.5693 34.1245 29.9886 33.4801 30.7351C32.8357 31.4816 32.4736 32.494 32.4736 33.5497V57.432C32.4736 58.4877 32.8357 59.5001 33.4801 60.2466C34.1245 60.993 34.9986 61.4124 35.9099 61.4124H53.0914C54.0028 61.4124 54.8768 60.993 55.5212 60.2466C56.1656 59.5001 56.5277 58.4877 56.5277 57.432V33.5497C56.5277 32.494 56.1656 31.4816 55.5212 30.7351C54.8768 29.9886 54.0028 29.5693 53.0914 29.5693H49.6551M39.3462 29.5693C39.3462 28.5136 39.7083 27.5012 40.3527 26.7547C40.9971 26.0082 41.8712 25.5889 42.7825 25.5889H46.2188C47.1302 25.5889 48.0042 26.0082 48.6486 26.7547C49.2931 27.5012 49.6551 28.5136 49.6551 29.5693M39.3462 29.5693C39.3462 30.6249 39.7083 31.6374 40.3527 32.3838C40.9971 33.1303 41.8712 33.5497 42.7825 33.5497H46.2188C47.1302 33.5497 48.0042 33.1303 48.6486 32.3838C49.2931 31.6374 49.6551 30.6249 49.6551 29.5693M39.3462 53.4516V43.5006M44.5007 53.4516V51.4614M49.6551 53.4516V47.481"
                stroke="#6A62DC"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      ),
    },
    {
      label: "Chat",
      path: "/chat",
      onClick: () => handleButtonClick && handleButtonClick("Chat"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="34"
          viewBox="0 0 38 34"
          fill="none"
        >
          <path
            d="M2 32.0395L4.4375 24.727C2.33083 21.6113 1.56874 17.9215 2.29291 14.3438C3.01708 10.7661 5.17824 7.5439 8.37456 5.27628C11.5709 3.00866 15.5849 1.84995 19.6702 2.01559C23.7555 2.18123 27.6341 3.65996 30.5849 6.17682C33.5357 8.69368 35.3579 12.0774 35.7126 15.6989C36.0674 19.3203 34.9305 22.9331 32.5135 25.8654C30.0965 28.7977 26.5637 30.85 22.5721 31.6408C18.5805 32.4316 14.4016 31.907 10.8125 30.1645L2 32.0395Z"
            stroke="#6A62DC"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Modo Viaje",
      path: "/modo-viaje",
      onClick: () => handleButtonClick && handleButtonClick("Modo Viaje"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="41"
          viewBox="0 0 35 41"
          fill="none"
        >
          <path
            d="M0 30.2105C0 32.1095 0.853125 33.8142 2.1875 35.0011V38.8421C2.1875 40.0289 3.17188 41 4.375 41H6.5625C7.76562 41 8.75 40.0289 8.75 38.8421V36.6842H26.25V38.8421C26.25 40.0289 27.2344 41 28.4375 41H30.625C31.8281 41 32.8125 40.0289 32.8125 38.8421V35.0011C34.1469 33.8142 35 32.1095 35 30.2105V8.63158C35 1.07895 27.1688 0 17.5 0C7.83125 0 0 1.07895 0 8.63158V30.2105ZM7.65625 32.3684C5.84062 32.3684 4.375 30.9226 4.375 29.1316C4.375 27.3405 5.84062 25.8947 7.65625 25.8947C9.47188 25.8947 10.9375 27.3405 10.9375 29.1316C10.9375 30.9226 9.47188 32.3684 7.65625 32.3684ZM27.3438 32.3684C25.5281 32.3684 24.0625 30.9226 24.0625 29.1316C24.0625 27.3405 25.5281 25.8947 27.3438 25.8947C29.1594 25.8947 30.625 27.3405 30.625 29.1316C30.625 30.9226 29.1594 32.3684 27.3438 32.3684ZM30.625 19.4211H4.375V8.63158H30.625V19.4211Z"
            fill="#6A62DC"
          />
        </svg>
      ),
    },
  ],

  Conductor: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: <DashboardIcon />,
    },
    {
      label: "Modo viaje",
      path: "/Chat",
      onClick: "Chat",
      icon: <Message />,
    },
    {
      label: "Modo viaje",
      path: "/ModoViaje",
      onClick: "ModoViaje",
      icon: <CommuteIcon />,
    },
  ],
};

function Sidebar({ handleButtonClick, activeButton }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userRole = decodedToken.userRol;
  console.log(decodedToken);
  const userId = decodedToken.id;
  const bgColor = useBG(theme);
  const primaryColorBG = usePrimaryColorsBG(theme);
  const iconColor = useIconColor(theme);
  const colorWandB = useColorWandB(theme);
  const colors = useColors(theme);
  const PrimaryColor = usePrimaryColors(theme);

  const menuItems = menuConfig[userRole] || [];
  console.log(menuItems);
  const [openMenu, setOpenMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sideRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
        if (sideRef.current && !sideRef.current.contains(event.target)) {
          setIsSidebarOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);
  
  

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <>
      {/* Botón de hamburguesa (solo visible en móviles) */}
      <button
        className="fixed top-9 left-4 z-50 p-2 rounded-lg  lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <CloseIcon className={`${PrimaryColor}`} />
        ) : (
          <MenuIcon
            sx={{ fontSize: 35 }}
            className={`${PrimaryColor} text-4xl`}
          />
        )}
      </button>

      <div ref={sideRef}
        className={`box-border ${primaryColorBG} w-30 h-screen flex flex-col items-center py-6 fixed top-0 left-0 z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Botón de cerrar dentro del sidebar en móviles */}
        <div className="w-full flex justify-end lg:hidden pr-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
          >
            
          </button>
        </div>

        <div className="mb-8">
          <SitramIcon />
        </div>
        <div className="flex flex-col gap-6 items-center">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <Link to={item.path} onClick={() => setIsSidebarOpen(true)}>
                <div
                  onClick={() => toggleMenu(index)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 bg-[#f1f2ff] ${PrimaryColor} rounded-2xl border flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-white font-semibold mt-2">
                    {item.label}
                  </div>
                </div>
              </Link>
              {openMenu === index && item.subMenu && (
                <div
                  className={`w-50 h-screen fixed left-0 top-0 ${primaryColorBG} text-white shadow-md p-2 z-20`}
                >
                  <div className="flex justify-end">
                    <button
                      onClick={() => setOpenMenu(null)}
                      className="cursor-pointer"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="text-center text-2xl font-semibold text-white mb-5">
                    {item.title}
                  </div>
                  <div 
                   className="grid grid-cols-2">
                    {item.subMenu.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className="flex flex-col p-3 items-center gap-2"
                        onClick={() => setOpenMenu(index)}
                      >
                        <div className="w-16 h-16 bg-[#f1f2ff] rounded-2xl border flex items-center justify-center">
                          <span className={`${PrimaryColor}`}>{sub.icon}</span>
                        </div>
                        <div className="text-center font-semibold">
                          {sub.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Sidebar;