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

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Usuarios Activos: {loadingUsers ? "..." : activeUsers}
      </div>
    </div>
  );
}

export default UsuariosActivosCard;
