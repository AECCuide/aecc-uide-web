'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	User,
} from 'firebase/auth';
import Image from 'next/image';
import { Button } from '@/components/ui/buttom'; // Mantenemos tu ruta exacta

export default function LoginPage() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para el spinner del botón
	const [error, setError] = useState('');

	useEffect(() => {
		if (!auth) {
			setLoading(false);
			return;
		}
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const handleGoogleLogin = async () => {
		if (!auth) {
			setError('La configuración de Firebase está incompleta.');
			return;
		}
		setError('');
		setIsLoggingIn(true);
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
		} catch (err) {
			console.error(err);
			setError('Error al intentar iniciar sesión con Google.');
		} finally {
			setIsLoggingIn(false);
		}
	};

	const handleLogout = async () => {
		if (!auth) return;
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Cargando...
			</div>
		);
	}

	if (user) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
				<div className="bg-card text-card-foreground p-8 rounded-lg shadow-md flex flex-col items-center gap-4">
					{user.photoURL ? (
						<Image
							src={user.photoURL}
							alt="Foto de perfil"
							width={96}
							height={96}
							className="w-24 h-24 rounded-full border-4 border-primary shadow-sm"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
							Sin foto
						</div>
					)}

					<h1 className="title-h1 text-center">
						¡Hola, {user.displayName || 'Usuario'}!
					</h1>
					<p className="text-text-color-secondary">{user.email}</p>
				</div>
				{/* Botón de cerrar sesión usando tu variante "destructive" */}
				<Button variant="destructive" onClick={handleLogout} className="mt-4">
					Cerrar Sesión
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			{error && <p className="text-text-color-error mb-4">{error}</p>}

			{/* Botón de Google usando tu variante "default" y la prop lefticon */}
			<Button
				variant="default"
				onClick={handleGoogleLogin}
				loading={isLoggingIn}
				lefticon={
					<svg
						className="w-5 h-5 bg-white rounded-full p-0.5"
						viewBox="0 0 48 48"
					>
						<path
							fill="#EA4335"
							d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
						/>
						<path
							fill="#4285F4"
							d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
						/>
						<path
							fill="#FBBC05"
							d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
						/>
						<path
							fill="#34A853"
							d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
						/>
						<path fill="none" d="M0 0h48v48H0z" />
					</svg>
				}
			>
				Continuar con Google
			</Button>
		</div>
	);
}
