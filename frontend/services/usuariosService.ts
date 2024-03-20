import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Cambia la URL por la URL de tu API de NestJS

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

export const addUser = async (id: number, nombre:string) => {
  try {
    const response = await axiosInstance.post('/usuarios', { id, nombre });
    return response.data;
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return null;
  }
};

export const deleteUser = async (id:number) => {
  try {
    const response = await axiosInstance.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return null;
  }
};
