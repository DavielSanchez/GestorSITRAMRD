import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ModalEditarPerfil = ({ open, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre,
    correo: user.correo,
    nuevaContrasena: '',
    confirmContrasena: '',
    imagenPerfil: '',
  });

  // Estado para almacenar los datos del JWT
  const [jwtData, setJwtData] = useState(null);

  // Decodificar el JWT cuando el componente se monte
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtenemos el token desde el localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodificamos el token
        setJwtData(decoded); // Guardamos los datos del token en el estado
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Llamar a onSubmit con los datos del formulario
    onSubmit(formData);
    onClose(); // Cerrar el modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo Electrónico"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nueva Contraseña"
          name="nuevaContrasena"
          type="password"
          value={formData.nuevaContrasena}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Contraseña"
          name="confirmContrasena"
          type="password"
          value={formData.confirmContrasena}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Imagen de Perfil (URL)"
          name="imagenPerfil"
          value={formData.imagenPerfil}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarPerfil;
