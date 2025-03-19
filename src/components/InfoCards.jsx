import React from 'react';
import { jwtDecode } from "jwt-decode";
export default function InfoCard({ label, value }) {
    return (
      <div className="bg-[#f5f6ff] rounded-xl p-4">
        <h3 className="text-[#7b6cf6] font-medium text-lg">{label}</h3>
        <p className="text-[#ff5757] text-2xl font-semibold">{value}</p>
      </div>
    )
  }
  

//   -------------
//   Como usar    |
//   -------------
//   return (
//     <div className="flex flex-col gap-4 p-4 max-w-xs">
//       {/* Tarjeta de Rutas */}
//       <div className="bg-[#f5f6ff] rounded-xl p-4">
//         <h3 className="text-[#7b6cf6] font-medium text-lg">Rutas</h3>
//         <p className="text-[#ff5757] text-2xl font-semibold">12</p>
//       </div>

//       {/* Tarjeta de Autobuses */}
//       <div className="bg-[#f5f6ff] rounded-xl p-4">
//         <h3 className="text-[#7b6cf6] font-medium text-lg">Autobuses disp.</h3>
//         <p className="text-[#ff5757] text-2xl font-semibold">82</p>
//       </div>

//       {/* Tarjeta de Paradas */}
//       <div className="bg-[#f5f6ff] rounded-xl p-4">
//         <h3 className="text-[#7b6cf6] font-medium text-lg">Paradas</h3>
//         <p className="text-[#ff5757] text-2xl font-semibold">200</p>
//       </div>
//     </div>
//   )
// }