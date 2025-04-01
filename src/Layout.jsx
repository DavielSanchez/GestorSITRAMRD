
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import TopBar from "./components/TopBar/TopBar";
import { useState } from 'react';
import { useBG } from "./ColorClass";
import { jwtDecode } from "jwt-decode";

function Layout({children, title}) {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const theme = decodedToken.theme;

    const [activeButton, setActiveButton] = useState("Dashboard");
    const bgColor = useBG(theme);

    const handleButtonClick = (name) => setActiveButton(name);

    return (
        <>
        <div className={`flex h-screen overflow-hidden ${bgColor}`}>
        <Sidebar handleButtonClick={handleButtonClick} activeButton={activeButton} />
        <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
            <TopBar theme={theme} title={title} />
            <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
                {children}
            </main>
        </div>
        </div>
        </>
    )}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout