/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'}/clientes`;

const obtenerConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  },
});

const crearCliente = async (cliente) => {
	const respuesta = await axios.post(URL, cliente, obtenerConfig());

	return respuesta.data;
};

const obtenerTodos = async () => {
	const respuesta = await axios.get(URL, obtenerConfig());

	return respuesta.data;
};

const obtenerClientePorId = async (id) => {
	const respuesta = await axios.get(`${URL}/${id}`, obtenerConfig());

	return respuesta.data;
};

const eliminarCliente = async (id) => {
	const respuesta = await axios.delete(`${URL}/${id}`, obtenerConfig());

	return respuesta.data;
};

export default {
	crearCliente,
	obtenerTodos,
	obtenerClientePorId,
	eliminarCliente,
};
