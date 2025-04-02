import { useState } from "react";
import { useBG, useBGForButtons, useText } from "../ColorClass";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar/TopBar";

function AutobusView() {

const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const userId = decodedToken.id;
  const bgColor = useBG(theme);
  const textColor = useText(theme);

  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleButtonClick = (name) => setActiveButton(name);
  return (
    <>
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
            <Sidebar handleButtonClick={handleButtonClick} activeButton={activeButton} />
        <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
            <TopBar title="Panel de Incidencias" />
            <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
                <div className='text-black'>AutobusView</div>
            </main>
        </div>
    </div>
    </>
  )
}

export default AutobusView