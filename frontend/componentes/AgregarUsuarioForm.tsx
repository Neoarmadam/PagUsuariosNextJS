import React, { useState } from 'react';

interface UsuarioFormProps {
  onSubmit: (usuario: Usuario) => void;
}

interface Usuario {
  id?: number;
  nombre: string;
}

const AgregarUsuarioForm: React.FC<UsuarioFormProps> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ nombre });
    setNombre('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Agregar Usuario</button>
      </div>
    </form>
  );
};

export default AgregarUsuarioForm;