import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'}/usuarios`;

const login = async (email, password, sector) => {
	const respuesta = await axios.post(`${URL}/login`, {
		email,
		password,
		sector,
	});

	return respuesta.data;
};

export default {
	login,
};
