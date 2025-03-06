import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import ProtectedRoute from './components/ProtectedRoute';
import PanelOperador from './pages/PanelOperador';
import Incidencias from './pages/Incidencias';


function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/operador" element={<PanelOperador />} />
          <Route path="/incidencias" element={<Incidencias />} />
          <Route 
          path="/" 
          element={
          <ProtectedRoute allowedRoles={['Pasajero', 'Operador', 'Administrador']}>
            <Home />
          </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
