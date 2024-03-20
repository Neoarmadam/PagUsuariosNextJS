'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AgregarUsuario: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  
  const handleSubmit = async () => {

    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        setMensaje('Usuario agregado correctamente');
        
      } else {
        setMensaje('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      setMensaje('Error al agregar usuario');
    }
  };

  return (
    <div>
      <h2>Agregar Usuario</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit">Agregar Usuario</button>
      </form>
      <Link href="/">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default AgregarUsuario;
