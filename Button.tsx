import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<button
			className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
			{...props}
		>
			{children}
		</button>
	);
};
