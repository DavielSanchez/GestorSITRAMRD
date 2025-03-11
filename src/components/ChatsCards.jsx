import React from 'react';
import { jwtDecode } from "jwt-decode";

export function ChatsCards({ title, value, change, changeType, chart }) {
    return (
      <div className="w-full sm:w-64 p-4 bg-[#f2f1ff] rounded-lg shadow-sm">
        <div className="space-y-2">
          <h3 className="text-[#6b63ff] font-medium">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{value}</span>
            <span className={`text-sm font-medium ${changeType === "positive" ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {change}
            </span>
          </div>
          <div className="h-12 mt-2">{chart}</div>
        </div>
      </div>
    )
  }
  
//--------------------
//  EJEMPLO DE USO    |
//--------------------

//   return (
//     <div className="flex flex-col sm:flex-row gap-4">
//       {/* Usuarios activos card */}
//       <div className="w-full sm:w-64 p-4 bg-[#f2f1ff] rounded-lg shadow-sm">
//         <div className="space-y-2">
//           <h3 className="text-[#6b63ff] font-medium">Usuarios activos</h3>
//           <div className="flex justify-between items-center">
//             <span className="text-2xl font-bold">105.3K</span>
//             <span className="text-[#22c55e] text-sm font-medium">+5%</span>
//           </div>
//           <div className="h-12 mt-2">
//             <svg viewBox="0 0 100 30" className="w-full h-full">
//               <path
//                 d="M0,15 L10,10 L20,5 L30,15 L40,25 L50,5 L60,15 L70,10 L80,15 L90,10 L100,5"
//                 fill="none"
//                 stroke="#6b63ff"
//                 strokeWidth="2"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Incidencias card */}
//       <div className="w-full sm:w-64 p-4 bg-[#f2f1ff] rounded-lg shadow-sm">
//         <div className="space-y-2">
//           <h3 className="text-[#6b63ff] font-medium">Incidencias</h3>
//           <div className="flex justify-between items-center">
//             <span className="text-2xl font-bold">18</span>
//             <span className="text-[#ef4444] text-sm font-medium">-15%</span>
//           </div>
//           <div className="h-12 mt-2">
//             <svg viewBox="0 0 100 30" className="w-full h-full">
//               <path
//                 d="M0,15 L10,20 L20,10 L30,5 L40,10 L50,5 L60,15 L70,20 L80,15 L90,20 L100,15"
//                 fill="none"
//                 stroke="#6b63ff"
//                 strokeWidth="2"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
//}

