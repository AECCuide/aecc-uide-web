// Importamos React y los tipos necesarios para manejar referencias con `forwardRef`
import * as React from 'react';

// Importamos `cva` y `VariantProps` desde `class-variance-authority`
import { cva, type VariantProps } from 'class-variance-authority'; // `cva` ayuda a definir variantes de estilos de forma organizada
import { cn } from '@/utils/cn'; // Importamos `cn`, que es una función para concatenar clases de Tailwind (posiblemente definida en `/utils/cn`)

// Definimos las variantes del botón usando `cva`
const buttonVariants = cva(
	// Clases base del botón (se aplican siempre)
	'rounded-lg',
	{
		// Definimos diferentes variantes de `variant`
		variants: {
			variant: {
				default: 'bg-primary hover:bg-primary-hover active:bg-primary-active',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				white:
					'bg-white text-primary-foreground hover:bg-white/90 text-primary-black',
				baricon: 'bg-transparent hover:bg-transparent',
				link: 'text-primary underline-offset-4 hover:underline hover:text-green-500 hover:bg-transparent',
				heart:
					'text-black hover:text-black bg-transparent hover:bg-transparent active:bg-white active:text-black',
			},
			// Definimos diferentes tamaños para el botón
			size: {
				default: 'h-12 px-8 py-4', // Tamaño normal
				sm: 'h-10 rounded-md px-2 py-2', // Tamaño pequeño
				// Tamaño mediano
				lg: 'h-14 rounded-md px-8', // Tamaño grande
				// Tamaños Televisores
				iconCard: '', // Variante especial sin estilos de tamaño predeterminado
				icon: 'h-12 w-12', // Tamaño especial para botones de iconos
			},
		},
		// Valores predeterminados si el usuario no especifica variante ni tamaño
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

// Definimos la interfaz `ButtonProps`, que extiende las propiedades de un botón HTML estándar
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	lefticon?: React.ReactNode; // Prop opcional para un icono a la izquierda
	rightIcon?: React.ReactNode; // Prop opcional para un icono a la derecha
	loading?: boolean; // Prop opcional para indicar si el botón está en estado de "cargando"
}

// Creamos el componente `Button` usando `forwardRef` para permitir referencias externas
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, loading = false, ...props }, ref) => {
		// Si el botón está en estado de "cargando", renderizamos una versión deshabilitada con un spinner
		if (loading) {
			return (
				<button
					className={cn(
						buttonVariants({ variant, size, className }),
						'disabled:bg-[#CC9200] disabled:text-white'
					)}
					ref={ref}
					disabled
					{...props}
				>
					{/* SVG animado que representa el "spinner" de carga */}
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						className="animate-spin mr-2"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12ZM6 12C6 15.5898 8.91015 18.5 12.5 18.5C16.0898 18.5 19 15.5898 19 12C19 8.41015 16.0898 5.5 12.5 5.5C8.91015 5.5 6 8.41015 6 12Z"
							fill="url(#paint0_angular_4184_5231)"
						/>
						<path
							d="M12.5 2C13.8132 2 15.1136 2.25866 16.3268 2.76121C17.5401 3.26375 18.6425 4.00035 19.5711 4.92893C20.4997 5.85752 21.2362 6.95991 21.7388 8.17317C22.2413 9.38642 22.5 10.6868 22.5 12L19 12C19 11.1464 18.8319 10.3012 18.5052 9.51256C18.1786 8.72394 17.6998 8.00739 17.0962 7.40381C16.4926 6.80023 15.7761 6.32144 14.9874 5.99478C14.1988 5.66813 13.3536 5.5 12.5 5.5L12.5 2Z"
							fill="url(#paint1_angular_4184_5231)"
						/>
					</svg>
				</button>
			);
		}

		// Renderizamos el botón normal si no está en estado de carga
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{/* Si se pasa un icono a la izquierda, lo renderizamos */}
				{props.lefticon && <span className="mr-2">{props.lefticon}</span>}
				{props.children} {/* Contenido del botón */}
				{/* Si se pasa un icono a la derecha, lo renderizamos */}
				{props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
			</button>
		);
	}
);

// Definimos un `displayName` para ayudar en la depuración
Button.displayName = 'Button';

// Exportamos el componente y las variantes para su uso en otros archivos
export { Button, buttonVariants };
