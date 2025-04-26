import React, { useEffect, useState } from "react";

function UsuariosActivosCard() {
  const [activeUsers, setActiveUsers] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_LINK}/auth/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const activeCount = data.filter((user) => user.estadoUsuario === "activo").length;
        setActiveUsers(activeCount);
      } catch (error) {
        console.error("Error fetching users:", error);
        setActiveUsers(null);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [API_LINK]);

  const BusIcon = () => (
    <div data-svg-wrapper>
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="40" 
      height="31" 
      fill="#6A62DC" 
      className="bi bi-people-fill" 
      viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>
    </div>
  );

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">
      <BusIcon />
      <div className="text-xl font-bold">
        Usuarios Activos: ({loadingUsers ? "..." : activeUsers})
      </div>
    </div>
  );
}

export default UsuariosActivosCard;
