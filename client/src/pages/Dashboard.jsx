import '@styles/dashboard.css';

import useAutorizaciones from '@hooks/useAutorizaciones';
import autorizacionesService from '@services/autorizacionesServices';
import clientesService from '@services/clientesService';
import { useEffect, useState } from 'react';

import Login from './Login';

const Dashboard = () => {
	const { admin } = useAutorizaciones();
	const [resumen, setResumen] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!admin) return;

		let activo = true;

		const cargarResumen = async () => {
			setResumen(null);
			setError('');

			try {
				const [clientes, usuarios] = await Promise.all([
					clientesService.obtenerTodos(),
					autorizacionesService.obtenerUsuarios(),
				]);

				if (!activo) return;

				setResumen({
					clientes: clientes.length,
					gerencia: usuarios.filter(
						(usuario) => usuario.sector === 'Gerencia',
					).length,
					soporte: usuarios.filter(
						(usuario) => usuario.sector === 'Soporte',
					).length,
				});
			} catch (errorSolicitud) {
				if (!activo) return;

				setError(
					errorSolicitud.response?.data?.mensaje ??
						'No se pudo cargar el resumen del dashboard.',
				);
			}
		};

		cargarResumen();

		return () => {
			activo = false;
		};
	}, [admin]);

	return (
		<div className="dashboard">
			<h1>Panel de Control de Clientes</h1>

			{!admin ? (
				<div className="dashboard-login">
					<h3>Bienvenido al sistema</h3>
					<p>Ingrese sus credenciales para acceder.</p>
					<Login />
				</div>
			) : (
				<>
					<div className="user-card">
						<h3>Usuario conectado</h3>

						<p>
							<strong>Usuario:</strong> {admin.nombre}
						</p>
						<p>
							<strong>Email:</strong> {admin.email}
						</p>
						<p>
							<strong>Sector:</strong> {admin.sector}
						</p>
					</div>
					{error ? (
						<p role="alert">{error}</p>
					) : resumen === null ? (
						<p role="status">Cargando resumen...</p>
					) : (
						<div className="dashboard-cards">
							<div className="dashboard-card">
								<h3>Clientes</h3>
								<p>{resumen.clientes}</p>
							</div>

							<div className="dashboard-card">
								<h3>Gerencia</h3>
								<p>{resumen.gerencia}</p>
							</div>

							<div className="dashboard-card">
								<h3>Soporte</h3>
								<p>{resumen.soporte}</p>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Dashboard;
