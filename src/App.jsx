import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PanelOperador from './pages/PanelOperador';
import PanelAdministrador from './pages/PanelAdministrador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar';
import AutobusView from './pages/Conductores/AutobusView';
import Unauthorized from './pages/Autenticacion/Unauthorized';
import Auth from './pages/Autenticacion/Auth';
import RegisterAuth from './pages/Autenticacion/RegisterAuth';
import ChoferesView from './pages/Conductores/ChoferesView';
import ModoViaje from './pages/Conductores/ModoViaje';
import RegistroBuses from './pages/RegistroBuses';
import Rutas from './pages/Rutas';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';
import Alertas from './pages/AlertasGestor';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
// import Alertas from './pages/AlertasGestor';

function App() {
  const token = localStorage.getItem('token');
let userRol = null;
let userId = null;

if (token) {
  try {
    const decodedToken = jwtDecode(token);
    userRol = decodedToken.userRol;
    userId = decodedToken.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    // Podrías redirigir al login o limpiar el token
    localStorage.removeItem('token');
  }
}

  const dispatch = useDispatch();

  useEffect(() => {
    Socket.emit("join-alert-room", { userId });

    socket.on("alerta-recibida", (alerta) => {
      dispatch(addAlert(alerta));
      dispatch(updateAlertCount(1));
    });

    socket.on("contador-alertas-no-leidas", (count) => {
      dispatch(updateAlertCount(count)); 
    });
    return () => {
      socket.off("alerta-recibida");
      socket.off("contador-alertas-no-leidas");
    };
  }, [dispatch]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<RegisterAuth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['Conductor', 'Operador', 'Administrador']}>
                {userRol === 'Conductor' ? (
                  <Layout title="Panel de conductor">
                    <ChoferesView />
                  </Layout>
                ) : userRol === 'Operador' ? (
                  <Layout title="Panel de operador">
                    <PanelOperador />
                  </Layout>
                ) : userRol === 'Adminstrador' ? (
                  <Layout title="Panel de Administrador">
                    <PanelAdministrador />
                  </Layout>
                ) : null}
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidencias"
            element={

              <ProtectedRoute allowedRoles={['Operador', 'Administrador']}>
                <Layout title="Incidencias">
                  <Incidencias />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alertas"
            element={
              <ProtectedRoute allowedRoles={['Operador', 'Administrador']}>
                <Layout title="Alertas">
                  <Alertas />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/asignar"
            element={
              <ProtectedRoute allowedRoles={['Operador']}>
                <Layout title="Asignaciones">
                  <VistaAsignar />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/autobus"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="AutoBuses">
                  <RegistroBuses />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rutas"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Rutas">
                  <Rutas />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidenciasAdmin"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Incidencias">
                  <Incidencias />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/choferes" element={<ChoferesView />} />

          <Route
            path="/modo-viaje"
            element={
              <ProtectedRoute allowedRoles={['Conductor']}>
                <Layout title="Modo viaje">
                  <ModoViaje />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
