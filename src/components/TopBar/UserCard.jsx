import { Notifications } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function UserCard({ theme }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userImage = decodedToken.userImage;
  const navigate = useNavigate();

  const handleLogOut = async () => {
    
        localStorage.removeItem("token");
        navigate("/login");
  };

  return (
    <div className=" w-[180px] bg-white rounded-2xl border border-[#6a62dc] p-4 z-50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div
            data-svg-wrapper
            className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden border-2 focus:outline-none">
            <img
              src={userImage}
              alt="Avatar"
              width="25"
              height="25"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">Mi cuenta</div>
        </div>
        {/* <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <Notifications className="text-[#6A62DC]" fontSize="medium" />
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">Notificaciones</div>
        </div>

        {/* Opción: Configuración */}
        {/* <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <SettingsIcon className="text-[#6A62DC]" fontSize="medium" />
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']">Configuración</div>
        </div> */}
        {/* Divisor */}
        <div className="w-full h-px bg-[#d9d9d9] border border-[#6a62dc]/50" />
        {/* Opción: Cerrar sesión */}
        <div className="flex items-center gap-2">
          <div data-svg-wrapper className="flex-shrink-0">
            <LogoutIcon className="text-[#6A62DC]" fontSize="medium" />
          </div>
          <div className="text-[#6a62dc] text-xl font-normal font-['Inter']" onClick={handleLogOut}>Cerrar sesión</div>
        </div>
      </div>
    </div>
  );
}
