/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import '@styles/login.css';

import useAutorizaciones from '@hooks/useAutorizaciones';
import AutorizacionesService from '@services/autorizacionesServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [sector, setSector] = useState('');
	const [errores, setErrores] = useState({});
	const [errorServidor, setErrorServidor] = useState('');
	const { setAdmin } = useAutorizaciones();
	const navigate = useNavigate();
	const validar = () => {
		const nuevosErrores = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email) {
			nuevosErrores.email = 'El email es obligatorio';
		} else if (!emailRegex.test(email)) {
			nuevosErrores.email = 'Email inválido';
		}

		if (!password) {
			nuevosErrores.password = 'La contraseña es obligatoria';
		} else if (password.length < 8) {
			nuevosErrores.password = 'Mínimo 8 caracteres';
		} else if (!/[A-Z]/.test(password)) {
			nuevosErrores.password = 'Debe tener una mayúscula';
		} else if (!/[0-9]/.test(password)) {
			nuevosErrores.password = 'Debe tener un número';
		}

		if (!sector) {
			nuevosErrores.sector = 'Seleccione un sector';
		}

		setErrores(nuevosErrores);

		return Object.keys(nuevosErrores).length === 0;
	};
	const handleLoginSubmit = async (
		/** @type {{ preventDefault: () => void; }} */ event_,
	) => {
		event_.preventDefault();

		if (!validar()) {
			return;
		}

		setErrorServidor('');

		try {
			const { token, usuario } = await AutorizacionesService.login(
				email,
				password,
				sector,
			);

			localStorage.setItem('token', token);
			setAdmin(usuario);
			navigate('/');
		} catch (error) {
			setErrorServidor(
				error.response?.data?.mensaje ??
					'No se pudo iniciar sesión. Intente nuevamente.',
			);
		}
	};

	return (
		<div className="login-container">
			<h1 className="titulo-login">Iniciar Sesión</h1>
			<form onSubmit={handleLoginSubmit}>
				<label>
					<span>Email:</span>
					<input
						type="text"
						value={email}
						onChange={(event_) => setEmail(event_.target.value)}
					/>
					<p style={{ color: 'red', minHeight: '18px' }}>
						{errores.email || ' '}
					</p>
				</label>
				<label>
					<span>Contraseña:</span>
					<input
						type="password"
						value={password}
						onChange={(event_) => setPassword(event_.target.value)}
					/>
				</label>
				<p style={{ color: 'red', minHeight: '18px' }}>
					{errores.password || ' '}
				</p>
				<label>
					<span>Sector:</span>
					<select
						value={sector}
						onChange={(event_) => setSector(event_.target.value)}
					>
						<option value="">Seleccione un sector</option>
						<option value="Soporte">Soporte</option>
						<option value="Gerencia">Gerencia</option>
					</select>
				</label>
				<p style={{ color: 'red', minHeight: '18px' }}>
					{errores.sector || ' '}
				</p>
				<p style={{ color: 'red', minHeight: '18px' }}>
					{errorServidor || ' '}
				</p>
				<button type="submit">Ingresar</button>
			</form>
		</div>
	);
};

export default Login;
