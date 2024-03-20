'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import AgregarUsuarioForm from "@/componentes/AgregarUsuarioForm";

interface Usuario {
  id: number;
  nombre: string;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const searchParams=useSearchParams();
  const pathname=usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);

  
  const handleSearch = (term: string) => {
    const params=new URLSearchParams(searchParams);
    if (term){
      params.set('query', term);
    }else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);

    filtrarUsuarios(params.get('query')?.toLowerCase());
  };

  const filtrarUsuarios=(filtro: string)=>{
    console.log(filtro)
    if(filtro==null){
      setUsuariosFiltrados(usuarios);
    }else{
      setUsuariosFiltrados(usuarios.filter(usuario => usuario.nombre.toLowerCase().includes(filtro)));
    }
  }

  const cargarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
        setUsuariosFiltrados(data);
      } else {
        console.error("Error leyendo usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error leyendo usuarios:", error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/usuarios/borrar/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Usuario eliminado exitosamente");
        cargarUsuarios();
      } else {
        console.error("Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleAgregarUsuario = async (nuevoUsuario: Omit<Usuario, 'id'>) => {
    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });
      if (response.ok) {
        console.log("Usuario agregado exitosamente");
        cargarUsuarios();
      } else {
        console.error("Error al agregar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };
  

  return (
    <div>
      <h2 className="mb-4">Lista de Usuarios</h2>
      <input
        onChange={(event)=> handleSearch(event.target.value)}
        type="text"
        defaultValue={searchParams.get('query')?.toString()}
      />
      <ul className="list-group">
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id} className="list-group-item">
            {usuario.nombre}
            <Link href={`/usuario?id=${usuario.id}`}>
              <button>Ver</button>
            </Link>
            <button onClick={() => deleteUser(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      { /*
        <Link href="/usuario/agregarUsuario">
          <button>Agregar Usuario</button>
        </Link>
      */ }
      
      <AgregarUsuarioForm onSubmit={handleAgregarUsuario} />
    </div>
  );
}
