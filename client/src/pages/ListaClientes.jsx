/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-handler-names */
// @ts-nocheck
import '@styles/listaclientes.css';

import FormCliente from '@components/FormCliente';
import ModalConfirmacion from '@components/ModalConfirmacion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import clientesService from '../services/clientesService';

const ListaClientes = () => {
	const [clientes, setClientes] = useState([]);
	const [busqueda, setBusqueda] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorEliminacion, setErrorEliminacion] = useState('');
	const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
	const [modalAbierto, setModalAbierto] = useState(false);

	useEffect(() => {
		clientesService
			.obtenerTodos()
			.then((data) => {
				setClientes(data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	}, []);

	const agregarNuevoCliente = (nuevoCliente) => {
		setClientes((clientesActuales) => [nuevoCliente, ...clientesActuales]);
	};

	const abrirModalEliminar = (cliente) => {
		setClienteSeleccionado(cliente);
		setModalAbierto(true);
	};

	const cerrarModalEliminar = () => {
		setClienteSeleccionado(null);
		setModalAbierto(false);
	};

	const eliminarClienteConfirmado = async () => {
		if (!clienteSeleccionado) return;

		try {
			await clientesService.eliminarCliente(clienteSeleccionado.id);
			setClientes((previous) =>
				previous.filter((item) => item.id !== clienteSeleccionado.id),
			);
			setErrorEliminacion('');
			cerrarModalEliminar();
		} catch (error_) {
			setErrorEliminacion(
				error_.response?.data?.mensaje ||
					'No se pudo eliminar el cliente.',
			);
		}
	};

	const terminoBusqueda = busqueda.toLowerCase();
	const clientesFiltrados = clientes.filter((cliente) => {
		const apellido = cliente.name?.lastname ?? '';
		const ciudad = cliente.address?.city ?? '';

		return (
			apellido.toLowerCase().includes(terminoBusqueda) ||
			ciudad.toLowerCase().includes(terminoBusqueda)
		);
	});

	if (loading) {
		return <h2>Cargando clientes...</h2>;
	}

	if (error) {
		return <h2>Error al cargar los clientes.</h2>;
	}

	return (
		<div className="clientes-container">
			<h1>Clientes</h1>
			<FormCliente onClienteCreado={agregarNuevoCliente} />
			{errorEliminacion && <p role="alert">{errorEliminacion}</p>}

			<div className="contenedor-buscador">
				<h2 className="titulo-buscador">Buscar Clientes</h2>

				<input
					className="buscador"
					placeholder="Buscar por apellido o ciudad"
					type="text"
					value={busqueda}
					onChange={(e) => setBusqueda(e.target.value)}
				/>

				<p className="cantidad-clientes">
					Clientes encontrados: {clientesFiltrados.length}
				</p>
			</div>
			<div className="tabla-responsive">
				<table className="tabla-clientes">
					<thead>
						<tr>							
							<th>Nombre</th>
							<th>Email</th>
							<th>Teléfono</th>
							<th>Ciudad</th>
							<th>Acciones</th>
						</tr>
					</thead>

					<tbody>
						{clientesFiltrados.map((cliente) => (
							<tr key={cliente.id}>	

								<td>
									{cliente.name.firstname}{' '}
									{cliente.name.lastname}
								</td>

								<td>{cliente.email}</td>

								<td>{cliente.phone}</td>

								<td>{cliente.address.city}</td>

								<td className="acciones-cliente">
									<Link
										className="btn-ficha"
										to={`/clientes/${cliente.id}`}
									>
										Ver Ficha Completa
									</Link>

									<button
										className="btn-eliminar"
										type="button"
										onClick={() =>
											abrirModalEliminar(cliente)
										}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ModalConfirmacion
				estaAbierto={modalAbierto}
				handleCancel={cerrarModalEliminar}
				handleConfirm={eliminarClienteConfirmado}
				titulo="Confirmar eliminación"
				mensaje={
					clienteSeleccionado
						? `¿Está seguro de que desea eliminar al cliente ${clienteSeleccionado.name.firstname} ${clienteSeleccionado.name.lastname}?`
						: ''
				}
			/>
		</div>
	);
};

export default ListaClientes;
