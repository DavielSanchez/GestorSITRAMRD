import PropTypes from "prop-types";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import { useState } from "react";
import { useBG } from "./ColorClass";
import { jwtDecode } from "jwt-decode";

function Layout({ children, title }) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;

  const [activeButton, setActiveButton] = useState("Dashboard");
  const bgColor = useBG(theme);

  const handleButtonClick = (name) => setActiveButton(name);

  return (
    <>
      <div className={`flex h-screen overflow-hidden ${bgColor}`}>
        <Sidebar
          handleButtonClick={handleButtonClick}
          activeButton={activeButton}
        />
        <div className="flex flex-col flex-1 overflow-auto lg:ml-[120px]">
        <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow">
          <TopBar theme='light' title={title} />
        </div>
        <main className="flex-1 p-4 bg-white md:p-8 pt-[72px] mt-[100px] transition-all duration-300">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
