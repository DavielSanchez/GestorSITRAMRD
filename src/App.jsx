import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import PanelOperador from './pages/PanelOperador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar'
import AutobusView from './pages/AutobusView';
import Unauthorized from './pages/Autenticacion/Unauthorized';
import Auth from './pages/Autenticacion/Auth';
import RegisterAuth from './pages/Autenticacion/RegisterAuth';

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/register' element={<RegisterAuth/>}/>
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/asignar" element={<VistaAsignar />} />
          <Route path="/" element={<PanelOperador />} />
          <Route path="/autobus" element={<AutobusView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
