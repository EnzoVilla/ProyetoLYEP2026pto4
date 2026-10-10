/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useState } from 'react';

export const AutorizacionesContext = createContext();

/**
 * A provider component that manages the authentication state of the application.
 * It provides the current admin user, a function to set the admin user, and a function to log out.
 * @param {{children: import('react').ReactNode}} param
 * @returns
 */
const AutorizacionesProvider = ({ children }) => {
	const [admin, setAdmin] = useState(() => {
		const adminGuardado = localStorage.getItem('admin');
		const token = localStorage.getItem('token');

		if (adminGuardado && token) {
			return JSON.parse(adminGuardado);
		}

		localStorage.removeItem('admin');

		return null;
	});

	useEffect(() => {
		if (admin) {
			localStorage.setItem('admin', JSON.stringify(admin));
		} else {
			localStorage.removeItem('admin');
		}
	}, [admin]);

	const cerrarSesion = () => {
		setAdmin(null);
		localStorage.removeItem('token');
	};

	return (
		<AutorizacionesContext.Provider
			value={{ admin, setAdmin, cerrarSesion }}
		>
			{children}
		</AutorizacionesContext.Provider>
	);
};

export default AutorizacionesProvider;
