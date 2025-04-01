import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WarningAmber, Message, Preview } from "@mui/icons-material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CloseIcon from "@mui/icons-material/Close";

const menuConfig = {
  operador: [
    {
      label: "Dashboard",
      path: "/",
      onClick: () => handleButtonClick && handleButtonClick("Dashboard"),
      icon: (
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-16 h-16 bg-[#f1f2ff] rounded-2xl flex items-center justify-center">
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
      title: "Gestor de buses",
      label: "Admin",
      path: "",
      onclick: () => handleButtonClick && handleButtonClick("Admin"),
      icon: <SupervisorAccountIcon />,
      subMenu: [
        { label: "Visualizar", icon: <Preview />, path: "" },
        { label: "Asignar", icon: <ContentPasteIcon />, path: "asignar" },
        { label: "Registrar", icon: <ContentPasteGoIcon />, path: "" },
      ],
    },
    {
      title: "Comunicaciones",
      label: "Comunicaiones",
      path: "",
      onclick: () => handleButtonClick && handleButtonClick("Comunicaiones"),
      icon: <ConnectWithoutContactIcon />,
      subMenu: [
        { label: "Chat", icon: <Message />, path: "" },
        { label: "Alertas", icon: <WarningAmber />, path: "" },
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

function Sidebar({ role = "operador", handleButtonClick, activeButton }) {
  const menuItems = menuConfig[role] || [];
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="box-border bg-[#6A62DC] w-[120px] h-screen flex flex-col items-center py-6 fixed top-0 left-0 z-20">
      <div className="mb-8"></div>
      <div className="flex flex-col gap-6 items-center">
        {menuItems.map((item, index) => (
          <div key={index} className="relative">
            <Link to={item.path}>
              <div
                onClick={() => toggleMenu(index)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#f1f2ff] text-[#6A62DC] rounded-2xl border flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-white font-semibold mt-2">
                  {item.label}
                </div>
              </div>
            </Link>
            {openMenu === index && item.subMenu && (
              <div className="w-86 h-86 absolute left-full top-0 bg-[#6A62DC] text-white shadow-md rounded-md p-2">
                <div className="flex justify-end items-end">
                  <button onClick={() => toggleMenu(index)} className="cursor-pointer">
                    <CloseIcon />
                  </button>
                </div>
                <div className="text-center text-3xl font-semibold text-white mb-5">
                  {item.title}
                </div>

                <div className="grid grid-cols-3">
                  {item.subMenu.map((sub) => (
                    <Link
                      to={sub.path}
                      className="flex flex-col p-3 items-center gap-2"
                    >
                      <div className="w-16 h-16 bg-[#f1f2ff] rounded-2xl border flex items-center justify-center">
                        <span className="text-[#6A62DC]">{sub.icon}</span>
                      </div>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
