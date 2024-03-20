'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Usuario {
  id: number;
  nombre: string;
}

export default function Usuario () {
  const id = useSearchParams();
  console.log(id.get("id"));
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/usuarios/'+id.get("id"))
      .then(response => response.json())
      .then(data => setUsuario(data))
      .catch(error => console.error('Error leyendo usuario:', error));
    }, []);
  
  return (
    <div>
      <h2 className="mb-4">Detalles del Usuario</h2>
      {usuario ? (
        <div>
          <p>ID: {usuario.id}</p>
          <p>Nombre: {usuario.nombre}</p>
          <Link href="/agregarUsuario">
            <button>Editar Usuario</button>
          </Link>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
      <Link href="/">
        <button>Volver</button>
      </Link>
    </div>
  );
}
