// src/pages/AccountView.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener instalada la librería jwt-decode
import ModalEditarPerfil from '../components/ModalEditarPerfil'; // Asegúrate de importar el componente

const AccountView = () => {
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

  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal


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
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleOpenModal = () => setModalOpen(true); // Abrir el modal
  const handleCloseModal = () => setModalOpen(false); // Cerrar el modal


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

  const Avatar = ({ src = '/placeholder.svg', size = 'lg', online = true }) => {
    const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' };
    return (
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white`}>
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        {online && (
          <div className="absolute bottom-0 right-0">
            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
        )}
      </div>
    );
  };

  const teamMembers = [
    { name: 'Dianna Smiley', role: 'Diseñadora UI/UX', avatar: '/placeholder.svg' },
    { name: 'Anne Brewer', role: 'Diseñadora UX Senior', avatar: '/placeholder.svg' },
    { name: 'Richard Christmas', role: 'Ingeniero Front-End', avatar: '/placeholder.svg' },
    {
      name: 'Nicholas Binder',
      role: 'Gerente de Marketing de Contenido',
      avatar: '/placeholder.svg',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 transition-all duration-300 overflow-auto">
      {/* Banner */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500" />
        <div className="px-8 pb-4 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-end -mt-15">
              <Avatar src={user.userImage} size="lg" />
              <div className="ml-4 pb-4">
                <h1 className="text-xl font-bold text-gray-800">{user.nombre}</h1>
                <p className="text-gray-600 text-sm ">{user.correo}</p>
              </div>
            </div>
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
      <div className="px-8 py-4 flex flex-col md:flex-row gap-6 ">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/2 ">
          <div className="bg-white rounded-lg shadow p-6 mb-6 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-700">Rol</h3>
                <p className="text-gray-600">{user.userRol}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Último Inicio</h3>
                <p className="text-gray-600">{user.lastLogin}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Estado</h3>
                <p className="text-gray-600">{user.estadoUsuario}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Correo</h3>
                <p className="text-gray-600">{user.correo}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 p-5 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-lg font-semibold mb-4 text-black">Mi Equipo</h2>
            <div className="space-y-4">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Avatar src={member.avatar} size="sm" online={false} />
                  <div>
                    <p className="font-medium text-sm text-black">{member.name}</p>
                    <p className="text-gray-600 text-xs">{member.role}</p>
                  </div>
                </div>
              ))}
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
              <h3 className="text-sm font-semibold text-gray-700 mb-3">CUENTA</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Envíame un correo cuando alguien me siga
                  </span>
                  <Toggle
                    checked={settings.followEmails}
                    onChange={() => handleToggle('followEmails')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Envíame un correo cuando alguien responda a mi publicación
                  </span>
                  <Toggle
                    checked={settings.replyEmails}
                    onChange={() => handleToggle('replyEmails')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Envíame un correo cuando alguien me mencione
                  </span>
                  <Toggle
                    checked={settings.mentionEmails}
                    onChange={() => handleToggle('mentionEmails')}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">APLICACIÓN</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nuevos lanzamientos y proyectos</span>
                  <Toggle
                    checked={settings.projectUpdates}
                    onChange={() => handleToggle('projectUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Actualizaciones mensuales de productos
                  </span>
                  <Toggle
                    checked={settings.monthlyUpdates}
                    onChange={() => handleToggle('monthlyUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Suscribirme al boletín</span>
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
