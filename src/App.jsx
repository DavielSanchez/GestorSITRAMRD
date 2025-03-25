import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import PanelOperador from './pages/PanelOperador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar'
import ChoferesView from './pages/ChoferesView';
import ModoViaje from './pages/ModoViaje';


function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/asignar" element={<VistaAsignar />} />
          <Route path="/choferes" element={<ChoferesView />} />
          <Route path="/modo-viaje" element={<ModoViaje />} />
          <Route 
            path="/" 
            element={
                <PanelOperador />
            } 
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
