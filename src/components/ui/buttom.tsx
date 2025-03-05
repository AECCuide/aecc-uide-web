import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
	'inline-flex items-center justify-center text-white font-semibold whitespace-nowrap rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground rounded-[28px] hover:bg-green-500 hover:text-white',
	{
		variants: {
			variant: {
				default: 'bg-primary hover:bg-primary-hover active:bg-primary-active',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-primary bg-background hover:border-green-500 hover:bg-trasparent text-primary hover:text-primary-hover active:border-primary-active active:text-primary-active hover:text-green-500',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				white:
					'bg-white text-primary-foreground hover:bg-white/90 text-primary-black',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				baricon: 'bg-transparent hover:bg-transparent',
				link: 'text-primary underline-offset-4 hover:underline hover:text-green-500 hover:bg-transparent',
				heart:
					'text-black hover:text-black bg-transparent hover:bg-transparent active:bg-white active:text-black',
			},
			size: {
				default: 'h-12 px-8 py-4',
				sm: 'h-10 rounded-md px-2 py-2',
				lg: 'h-14 rounded-md px-8',
				iconCard: '', // Nueva variante sin estilos de tamaño predeterminados
				icon: 'h-12 w-12',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	lefticon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, loading = false, ...props }, ref) => {
		if (loading) {
			return (
				<button
					className={cn(
						buttonVariants({ variant, size, className }),
						'disabled: bg-[#CC9200] disabled:text-white'
					)}
					ref={ref}
					disabled
					{...props}
				>
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
						<defs>
							<radialGradient
								id="paint0_angular_4184_5231"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(12.5 12) scale(10)"
							>
								<stop offset="0.9999" stopColor="rgb(255,255,255,0.2)" />
								<stop offset="1" stopColor="white" stopOpacity="0.01" />
							</radialGradient>
							<radialGradient
								id="paint1_angular_4184_5231"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(12.5 12) rotate(-90) scale(10)"
							>
								<stop offset="0.9999" stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0.01" />
							</radialGradient>
						</defs>
					</svg>
				</button>
			);
		}
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{props.lefticon && <span className="mr-2">{props.lefticon}</span>}
				{props.children}
				{props.rightIcon && <span className="ml-2">{props.rightIcon}</span>}
			</button>
		);
	}
);

Button.displayName = 'Button';

export { Button, buttonVariants };
