import React from "react";
import { Link } from "react-router-dom";
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

// Objeto de configuración del menú según el rol
const menuConfig = {
  operador: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: (
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-[60px] h-[60px] bg-[#f1f2ff] rounded-[20px] border border-[#6A62DC] flex items-center justify-center">
            <svg
              className="w-6 h-6"
              viewBox="0 0 23 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.27378 5.49045H4.45525C3.70773 5.49045 2.99083 5.85197 2.46225 6.49548C1.93367 7.13899 1.63672 8.01177 1.63672 8.92183V29.5101C1.63672 30.4201 1.93367 31.2929 2.46225 31.9364C2.99083 32.5799 3.70773 32.9414 4.45525 32.9414H18.5479C19.2954 32.9414 20.0123 32.5799 20.5409 31.9364C21.0695 31.2929 21.3664 30.4201 21.3664 29.5101V8.92183C21.3664 8.01177 21.0695 7.13899 20.5409 6.49548C20.0123 5.85197 19.2954 5.49045 18.5479 5.49045H15.7294M7.27378 5.49045C7.27378 4.5804 7.57074 3.70761 8.09931 3.06411C8.62789 2.4206 9.3448 2.05908 10.0923 2.05908H12.9109C13.6584 2.05908 14.3753 2.4206 14.9039 3.06411C15.4324 3.70761 15.7294 4.5804 15.7294 5.49045M7.27378 5.49045C7.27378 6.40051 7.57074 7.27329 8.09931 7.9168C8.62789 8.56031 9.3448 8.92183 10.0923 8.92183H12.9109C13.6584 8.92183 14.3753 8.56031 14.9039 7.9168C15.4324 7.27329 15.7294 6.40051 15.7294 5.49045M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
                stroke="#6A62DC"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
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
            stroke="#6A62DC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Modificar",
      path: "",
      onClick: "",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 30 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.64226 8.92041H5.09484C4.27404 8.92041 3.48685 9.28497 2.90646 9.93389C2.32606 10.5828 2 11.4629 2 12.3806V27.9516C2 28.8693 2.32606 29.7494 2.90646 30.3983C3.48685 31.0472 4.27404 31.4118 5.09484 31.4118H19.0216C19.8424 31.4118 20.6296 31.0472 21.21 30.3983C21.7904 29.7494 22.1165 28.8693 22.1165 27.9516V26.2215M20.569 5.46021L25.2113 10.6505M27.3545 8.20261C27.9639 7.52121 28.3063 6.59704 28.3063 5.6334C28.3063 4.66976 27.9639 3.74559 27.3545 3.0642C26.745 2.3828 25.9184 2 25.0566 2C24.1947 2 23.3681 2.3828 22.7586 3.0642L9.7371 17.5711V22.7614H14.3794L27.3545 8.20261Z"
            stroke="#6A62DC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Registrar",
      path: "/registrar",
      onClick: "Registrar",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.63707 5.43137H4.81853C4.07101 5.43137 3.35411 5.79289 2.82553 6.4364C2.29695 7.07991 2 7.95269 2 8.86275V29.451C2 30.361 2.29695 31.2338 2.82553 31.8773C3.35411 32.5208 4.07101 32.8824 4.81853 32.8824H18.9112C19.6587 32.8824 20.3756 32.5208 20.9042 31.8773C21.4328 31.2338 21.7297 30.361 21.7297 29.451V8.86275C21.7297 7.95269 21.4328 7.07991 20.9042 6.4364C20.3756 5.79289 19.6587 5.43137 18.9112 5.43137H16.0927M7.63707 5.43137C7.63707 4.52132 7.93402 3.64853 8.4626 3.00503C8.99117 2.36152 9.70808 2 10.4556 2H13.2741C14.0217 2 14.7386 2.36152 15.2671 3.00503C15.7957 3.64853 16.0927 4.52132 16.0927 5.43137M7.63707 5.43137C7.63707 6.34143 7.93402 7.21421 8.4626 7.85772C8.99117 8.50123 9.70808 8.86275 10.4556 8.86275H13.2741C14.0217 8.86275 14.7386 8.50123 15.2671 7.85772C15.7957 7.21421 16.0927 6.34143 16.0927 5.43137M9.04633 20.8725H14.6834M11.8649 17.4412V24.3039"
            stroke="#6A62DC"
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
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 32 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.76216 25.3193C4.76216 26.3501 5.05317 27.3387 5.57118 28.0675C6.08919 28.7964 6.79175 29 7.52432 29C8.2569 29 8.95946 28.7964 9.47747 28.0675C9.99547 27.3387 10.2865 26.3501 10.2865 25.3193M4.76216 25.3193C4.76216 24.2885 5.05317 23.3 5.57118 22.5711C6.08919 21.8422 6.79175 21.4328 7.52432 21.4328C8.2569 21.4328 8.95946 21.8422 9.47747 22.5711C9.99547 23.3 10.2865 24.2885 10.2865 25.3193M4.76216 25.3193H2V3.94328C2 3.42789 2.14551 2.93361 2.40451 2.56917C2.66351 2.20474 3.0148 2 3.38108 2H22.7162C24.5476 2 26.3041 3.43316 27.5991 5.98421C28.8941 8.53526 29.6216 11.9952 29.6216 15.6029M10.2865 25.3193H21.3351M21.3351 25.3193C21.3351 26.3501 21.6261 27.3387 22.1442 28.0675C22.6622 28.7964 23.3647 29 24.0973 29C24.8299 29 25.5324 28.7964 26.0504 28.0675C26.5684 27.3387 26.8595 26.3501 26.8595 25.3193M21.3351 25.3193C21.3351 24.2885 21.6261 23.3 22.1442 22.5711C22.6622 21.8422 23.3647 21.4328 24.0973 21.4328C24.8299 21.4328 25.5324 21.8422 26.0504 22.5711C26.5684 23.3 26.8595 24.2885 26.8595 25.3193M26.8595 25.3193H29.6216V15.6029M29.6216 15.6029H23.4068L21.3351 2"
            stroke="#6A62DC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
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
            stroke="#6A62DC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ],
  administrador: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: <DashboardIcon />,
    },
    {
      label: "Admin",
      icon: <SupervisorAccount />,
      subMenu: [
        {
          sectionTitle: "Operaciones",
          items: [
            { label: "Visualizar", icon: <Preview />, path: "" },
            { label: "Asignar", icon: <ContentPaste />, path: "asignar" },
            { label: "Registrar", icon: <ContentPasteGo />, path: "" },
          ],
        },
      ],
    },
    {
      label: "Comunicaciones",
      icon: <ConnectWithoutContact />,
      subMenu: [
        {
          sectionTitle: "Centro de Mensajes",
          items: [
            { label: "Chat", icon: <Message />, path: "" },
            { label: "Alertas", icon: <WarningAmber />, path: "" },
          ],
        },
      ],
    },

    {
      label: "Incidencias",
      path: "/incidencias",
      onClick: "Incidencias",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 32 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.76216 25.3193C4.76216 26.3501 5.05317 27.3387 5.57118 28.0675C6.08919 28.7964 6.79175 29 7.52432 29C8.2569 29 8.95946 28.7964 9.47747 28.0675C9.99547 27.3387 10.2865 26.3501 10.2865 25.3193M4.76216 25.3193C4.76216 24.2885 5.05317 23.3 5.57118 22.5711C6.08919 21.8422 6.79175 21.4328 7.52432 21.4328C8.2569 21.4328 8.95946 21.8422 9.47747 22.5711C9.99547 23.3 10.2865 24.2885 10.2865 25.3193M4.76216 25.3193H2V3.94328C2 3.42789 2.14551 2.93361 2.40451 2.56917C2.66351 2.20474 3.0148 2 3.38108 2H22.7162C24.5476 2 26.3041 3.43316 27.5991 5.98421C28.8941 8.53526 29.6216 11.9952 29.6216 15.6029M10.2865 25.3193H21.3351M21.3351 25.3193C21.3351 26.3501 21.6261 27.3387 22.1442 28.0675C22.6622 28.7964 23.3647 29 24.0973 29C24.8299 29 25.5324 28.7964 26.0504 28.0675C26.5684 27.3387 26.8595 26.3501 26.8595 25.3193M21.3351 25.3193C21.3351 24.2885 21.6261 23.3 22.1442 22.5711C22.6622 21.8422 23.3647 21.4328 24.0973 21.4328C24.8299 21.4328 25.5324 21.8422 26.0504 22.5711C26.5684 23.3 26.8595 24.2885 26.8595 25.3193M26.8595 25.3193H29.6216V15.6029M29.6216 15.6029H23.4068L21.3351 2"
            stroke="#6A62DC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ],
};

function Sidebar({ role = "administrador", handleButtonClick, activeButton }) {
  // Selecciona las opciones según el rol recibido
  const menuItems = menuConfig[role] || [];

  return (
    <div className="box-border bg-[#6A62DC] w-[120px] h-screen flex flex-col items-center py-6 fixed top-0 left-0 z-20">
      {/* Opciones del menú según el rol */}
      <div className="flex flex-col gap-6 items-center">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              onClick={() =>
                handleButtonClick && handleButtonClick(item.onClick)
              }
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-15 h-15 text-[#6A62DC] bg-[#f1f2ff] rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <div className="text-white text-base font-bold mt-2">
                {item.label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
