import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useBG,
  useBGForButtons,
  usePrimaryColorsBG,
  useText,
  useColorWandB,
  useColors,
  useIconColor,
  usePrimaryColors,
} from '../ColorClass';
import { jwtDecode } from 'jwt-decode';
import {
  WarningAmber,
  Message,
  Preview,
  ContentPasteGo,
  ContentPaste,
  SupervisorAccount,
  ConnectWithoutContact,
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import CommuteIcon from '@mui/icons-material/Commute';
import { SitramIcon } from '../assets/SitramIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { fontGrid } from '@mui/material/styles/cssUtils';

const menuConfig = {
  Operador: [
    {
      label: 'Dashboard',
      path: '/',
      onClick: () => handleButtonClick && handleButtonClick('Dashboard'),
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 23 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      label: 'Asignar',
      path: '/asignar',
      onClick: 'Asignar',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      label: 'Incidencias',
      path: '/incidencias',
      onClick: 'Incidencias',
      icon: <FlagIcon />,
    },
    {
      label: 'Comunicacion  ',
      icon: <ConnectWithoutContact />,
      title: 'Comunicaciones',
      subMenu: [
        { label: 'Chat', icon: <Message />, path: '/Chat' },
        { label: 'Alertas', icon: <WarningAmber />, path: '/Alertas' },
      ],
    },
    {
      label: 'Reportes',
      path: '',
      onClick: 'Reportes',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 36 51" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      label: 'Dashboard',
      path: '/',
      onClick: () => handleButtonClick && handleButtonClick('Dashboard'),
      icon: <DashboardIcon />,
    },
    {
      label: 'Administrador',
      icon: <SupervisorAccount />,
      title: 'Operaciones',
      subMenu: [
        { label: 'Visualizar', icon: <Preview />, path: '/autobus' },
        { label: 'Asignar', icon: <ContentPaste />, path: '' },
        { label: 'Registrar', icon: <ContentPasteGo />, path: '' },
      ],
    },
    {
      label: 'Comunicacion  ',
      icon: <ConnectWithoutContact />,
      title: 'Comunicaciones',
      subMenu: [
        { label: 'Chat', icon: <Message />, path: '/Chat' },
        { label: 'Alertas', icon: <WarningAmber />, path: '/alertas' },
      ],
    },
    {
      label: 'Choferes',
      icon: <ConnectWithoutContact />,
      title: 'Panel Choferes',
      subMenu: [
        { label: 'Dashbord', icon: <DashboardIcon />, path: '' },
        { label: 'Chat', icon: <Message />, path: '' },
        { label: 'Modo viaje', icon: <CommuteIcon />, path: '' },
      ],
    },
    {
      label: 'Incidencias',
      path: '/incidenciasAdmin',
      onClick: 'Incidencias',
      icon: <FlagIcon />,
    },
  ],

  Conductor: [
    {
      label: 'Dashboard',
      path: '/',
      onClick: () => handleButtonClick && handleButtonClick('Dashboard'),
      icon: <DashboardIcon />,
    },
    {
      label: 'Chat',
      icon: <Message />,
      title: 'Chat',
      path: '/chat',
    },
    {
      label: 'Modo viaje',
      icon: <CommuteIcon />,
      title: 'Modo viaje',
      path: 'modo-viaje',
    },
  ],
};

function Sidebar({ handleButtonClick, activeButton }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userRole = decodedToken.userRol;
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
  const sideRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sideRef.current && !sideRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? (
          <CloseIcon className={`${PrimaryColor}`} />
        ) : (
          <MenuIcon sx={{ fontSize: 35 }} className={`${PrimaryColor} text-4xl`} />
        )}
      </button>

      <div
        ref={sideRef}
        className={`box-border ${primaryColorBG} w-30 h-screen flex flex-col items-center py-6 fixed top-0 left-0 z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        {/* Botón de cerrar dentro del sidebar en móviles */}
        {/* <div className="w-full flex justify-end lg:hidden pr-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="cursor-pointer"
          ></button>
        </div> */}

        <div className="mb-8">
          <SitramIcon />
        </div>
        <div className="flex flex-col gap-6 items-center">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <Link to={item.path} onClick={() => setIsSidebarOpen(true)}>
                <div
                  onClick={() => toggleMenu(index)}
                  className="flex flex-col items-center cursor-pointer">
                  <div
                    className={`w-16 h-16 bg-[#f1f2ff] ${PrimaryColor} rounded-2xl border flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div className="text-white font-semibold mt-2">{item.label}</div>
                </div>
              </Link>
              {openMenu === index && item.subMenu && (
                <div
                  className={`w-50 h-screen fixed left-0 top-0 ${primaryColorBG} text-white shadow-md p-2 z-20 transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  } lg:translate-x-0`}>
                  <div className="flex justify-end">
                    <button onClick={() => setOpenMenu(false)} className="cursor-pointer">
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="text-center text-2xl font-semibold text-white mb-5">
                    {item.title}
                  </div>
                  <div className="grid grid-cols-2">
                    {item.subMenu.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className="flex flex-col p-3 items-center gap-2"
                        onClick={() => setOpenMenu(index)}>
                        <div className="w-16 h-16 bg-[#f1f2ff] rounded-2xl border flex items-center justify-center">
                          <span className={`${PrimaryColor}`}>{sub.icon}</span>
                        </div>
                        <div className="text-center font-semibold">{sub.label}</div>
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
