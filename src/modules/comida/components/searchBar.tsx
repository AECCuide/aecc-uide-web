// src/shared/components/SearchBar.tsx
import * as React from 'react';
import { cn } from '@/utils/cn';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onSearch?: (value: string) => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
	({ className, onSearch, ...props }, ref) => {
		return (
			<div className={cn('relative w-full max-w-2xl group', className)}>
				{/* Ícono de Lupa SVG */}
				<div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-sidebar-primary transition-colors">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
				</div>

				<input
					ref={ref}
					type="text"
					className={cn(
						'w-full h-12 pl-12 pr-4 rounded-full bg-card border border-transparent',
						'text-[16px] text-foreground placeholder:text-muted-foreground/60',
						// Sombra estilo Google Search
						'shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
						'hover:shadow-[0_1px_8px_0_rgba(32,33,36,0.35)]',
						'focus:bg-background focus:shadow-[0_1px_8px_0_rgba(32,33,36,0.35)]',
						'outline-none transition-all duration-200'
					)}
					placeholder="Buscar..."
					onChange={(e) => onSearch?.(e.target.value)}
					{...props}
				/>
			</div>
		);
	}
);

SearchBar.displayName = 'SearchBar';
