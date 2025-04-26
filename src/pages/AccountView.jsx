// src/pages/AccountView.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener instalada la librería jwt-decode
import ModalEditarPerfil from '../components/ModalEditarPerfil'; // Asegúrate de importar el componente
import { Badge, styled } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const AccountView = () => {
  const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

  const [user, setUser] = useState({
    nombre: 'Usuario Desconocido',
    correo: 'correo@ejemplo.com',
    userRol: 'Rol no disponible',
    estadoUsuario: 'No disponible',
    lastLogin: 'No disponible',
    theme: 'light',
    userImage: '/placeholder.svg',
  });

  const [settings, setSettings] = useState({
    followEmails: true,
    replyEmails: true,
    mentionEmails: true,
    projectUpdates: true,
    monthlyUpdates: false,
    newsletter: false,
  });

  const [modalOpen, setModalOpen] = useState(false); 
  const [members, setMembers] = useState([]); 


  const fecha = (fechas) => {
    if (!fechas) return "Fecha no disponible";
  
    const fechaObj = new Date(fechas);
    if (isNaN(fechaObj.getTime())) return "Fecha inválida";
  
    return formatDistanceToNow(fechaObj, {
      addSuffix: true,
      locale: es,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          nombre: decoded.nombre || 'Nombre no disponible',
          correo: decoded.correo || 'Correo no disponible',
          userRol: decoded.userRol || 'Rol no disponible',
          estadoUsuario: decoded.estadoUsuario || 'No disponible',
          lastLogin: decoded.lastLogin || 'No disponible',
          theme: decoded.theme || 'light',
          userImage: decoded.userImage || '/placeholder.svg',
        });
        console.log('Datos del token:', decoded);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleOpenModal = () => setModalOpen(true); // Abrir el modal
  const handleCloseModal = () => setModalOpen(false); // Cerrar el modal


  console.log('User:', user);
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';
  const teamsMembers = async () => {
    try {
      const response = await fetch(`${API_LINK}/auth/users/team/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = response.status !== 204 ? await response.json() : null; 
  
      if (data) {
        console.log('Team members:', data);
        setMembers(data);
      } else {
        console.log('No team members found or no route assigned.');
      }
  
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  }
  
  useEffect(() => {
    if (userId) {
      teamsMembers();
    }
  }, [userId]);



  useEffect(() => {
    const saved = localStorage.getItem('platformSettings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('platformSettings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ checked = false, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full ${
        checked ? 'bg-cyan-400' : 'bg-gray-200'
      }`}>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const Avatar = ({ src = '/placeholder.svg', size = 'lg', online = true }) => {
    const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24', xl: 'w-28 h-28' };
    return (
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white`}>
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 md:p-8 transition-all duration-300 overflow-auto">
      <title>MI CUENTA | GESTOR</title>
      {/* Banner */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500" />
        <div className="px-4 pb-4 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-end -mt-19">
            <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={user.userImage} size="xl" />
          </StyledBadge>
              {/* <Avatar src={user.userImage} size="lg" /> */}
              <div className="ml-4 pb-4">
                <h1 className="text-3xl font-bold text-white">{user.nombre}</h1>
                <p className="text-black text-md ">{user.correo}</p>
              </div>
            </div>
            
          </div>
          <div className="flex justify-end  w-full">
          <button
              className="mt-4 px-6 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50"
              onClick={handleOpenModal}>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar Modal */}
      <ModalEditarPerfil
        open={modalOpen}
        onClose={handleCloseModal}
        user={user}
        setUser={setUser}
      />
      {/* Contenido principal */}
      <div className="px-4 py-4 flex flex-col md:flex-row gap-6 ">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/2 ">
        <div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-bold text-gray-700">Rol</h3>
      <p className="text-gray-600 break-words">{user.userRol}</p>
    </div>
    <div>
      <h3 className="font-bold text-gray-700">Último Inicio</h3>
      <p className="text-gray-600 break-words">{fecha(user.lastLogin)}</p>
    </div>
    <div>
      <h3 className="font-bold text-gray-700">Estado</h3>
      <p className="text-gray-600 break-words">{user.estadoUsuario}</p>
    </div>
    <div>
      <h3 className="font-bold text-gray-700">Correo</h3>
      <p className="text-gray-600 break-words">{user.correo}</p>
    </div>
  </div>
</div>

          <div className="mb-6 p-5 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-lg font-semibold mb-4 text-black">Mi Equipo</h2>
            <div className="space-y-4">
              {members && members.length > 0 ? (
                members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Avatar src={member.userImage} size="sm" online={false} />
                    <div>
                      <p className="font-medium text-sm text-black">{member.nombre}</p>
                      <p className="text-gray-600 text-xs">{member.userRol}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-medium text-md text-center text-gray-600">No tienes una ruta asignada</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="w-full md:w-1/2 ">
          <div className="bg-white rounded-lg shadow p-6 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Configuración de la Plataforma
            </h2>

            <div className="mb-6">
  <h3 className="text-sm font-semibold text-gray-700 mb-3">Aplicacion</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 flex-1 mr-4">
      Activar sonido de alertas
      </span>
      <Toggle
        checked={settings.followEmails}
        onChange={() => handleToggle('followEmails')}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 flex-1 mr-4">
      Volumen de notificación
      </span>
      <Toggle
        checked={settings.replyEmails}
        onChange={() => handleToggle('replyEmails')}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 flex-1 mr-4">
        Mostrar banner de alertas de emergencias
      </span>
      <Toggle
        checked={settings.mentionEmails}
        onChange={() => handleToggle('mentionEmails')}
      />
    </div>
  </div>
</div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Cuenta</h3>
              <div className="space-y-4">
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 flex-1 mr-4">
      Nuevos lanzamientos y proyectos
    </span>
    <Toggle
      checked={settings.projectUpdates}
      onChange={() => handleToggle('projectUpdates')}
    />
  </div>
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 flex-1 mr-4">
    Recibir alertas críticas por correo electrónico
    </span>
    <Toggle
      checked={settings.monthlyUpdates}
      onChange={() => handleToggle('monthlyUpdates')}
    />
  </div>
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-600 flex-1 mr-4">
      Suscribirme al boletín
    </span>
    <Toggle
      checked={settings.newsletter}
      onChange={() => handleToggle('newsletter')}
    />
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;

