import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PanelOperador from "./pages/PanelOperador";
import Incidencias from "./pages/Incidencias";
import VistaAsignar from "./pages/VistaAsignar";
import Rutas from "./pages/RegistroRutas";
import RegistroBuses from "./pages/RegistroBuses";
import PanelAdmin from "./pages/PanelAdmin";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/asignar" element={<VistaAsignar />} />
          <Route path="/RegistrarRutas" element={<Rutas />} />
          <Route path="RegistrarBuses" element={<RegistroBuses />} />
          <Route path="/Admin" element={<PanelAdmin/>}/>
          <Route path="/Operador" element={<PanelOperador />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
