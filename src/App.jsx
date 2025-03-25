import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import PanelOperador from './pages/PanelOperador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar'
import RegistrarRuta from './pages/RegistrarRuta'


function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/asignar" element={<VistaAsignar />} />
          <Route path='/registrar' element={<RegistrarRuta />} />
        
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
