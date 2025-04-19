import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PanelOperador from './pages/PanelOperador';
import PanelAdministrador from './pages/PanelAdministrador';
import Incidencias from './pages/Incidencias';
import VistaAsignar from './pages/VistaAsignar';
import VistaAsignarB from './pages/VistaAsignarB';
import AutobusView from './pages/AutobusView';
import Unauthorized from './pages/Autenticacion/Unauthorized';
import Auth from './pages/Autenticacion/Auth';
import RegisterAuth from './pages/Autenticacion/RegisterAuth';
import ChoferesView from './pages/ChoferesView';
import ModoViaje from './pages/ModoViaje';
import RegistroBuses from './pages/RegistroBuses';
import UserView from './pages/userView';
import GestorChoferes from './pages/GestorChoferes'
import GestorOperador from './pages/GestorOperador';
import GestorAdmin from './pages/GestorAdmin';
import Rutas from './pages/Rutas';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';
import Alertas from './pages/AlertasGestor';

function App() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRol = decodedToken.userRol;
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
              <ProtectedRoute allowedRoles={['Operador', 'Administrador']}>
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
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Usuarios">
                  <UserView />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/asignarB"
            element={
              <ProtectedRoute allowedRoles={['Operador', 'Administrador']}>
                <Layout title="Asignaciones">
                  <VistaAsignarB />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/conductoresAdmin"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Usuarios - Conductores">
                  <GestorChoferes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operadores"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Usuarios - Operadores">
                  <GestorOperador />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/administradores"
            element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Layout title="Usuarios - Administradores">
                  <GestorAdmin />
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
