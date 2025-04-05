import React, { createContext, useState } from "react";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState([
    {
      id: "A",
      name: "Ruta A",
      stops: [
        { lat: 18.47286, lng: -69.89232 },
        { lat: 18.47500, lng: -69.89400 },
        { lat: 18.47800, lng: -69.89600 },
      ],
    },
  ]);

  return (
    <RoutesContext.Provider value={{ routes, setRoutes }}>
      {children}
    </RoutesContext.Provider>
  );
};
