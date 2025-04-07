import React, { useEffect, useState } from "react";

function AutobusesCard() {
  const [autobuses, setAutobuses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutobuses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/autobus/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAutobuses(data.length);
      } catch (error) {
        console.error("Error fetching autobuses:", error);
        setAutobuses(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAutobuses();
  }, []);

  return (
    <div className="w-[95%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Autobuses Registrados: {loading ? "..." : autobuses}
      </div>
    </div>
  );
}

export default AutobusesCard;
