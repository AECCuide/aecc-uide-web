// src/shared/components/buttonCategory.tsx
import * as React from 'react';
import { cn } from '@/utils/cn';

export const ButtonCategory = ({
	name,
	imageUrl,
	link,
}: {
	name: string;
	imageUrl: string;
	link: string;
}) => {
	return (
		<div
			onClick={() => (window.location.href = link)}
			className={cn(
				// shrink-0 es VITAL para que no se aplasten en el scroll
				'shrink-0 w-28 h-28 flex flex-col items-center justify-between p-4',
				'bg-card rounded-[24px] cursor-pointer transition-all active:scale-95 hover:scale-105',
				// Sombras Neumorphism más marcadas para que se note el volumen
				'shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)]',
				'dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.05)]'
			)}
		>
			<div className="flex-1 flex items-center justify-center w-full overflow-hidden">
				<img
					src={imageUrl}
					alt={name}
					className="max-w-full max-h-full object-contain pointer-events-none"
				/>
			</div>
			<span className="mt-2 text-[12px] font-bold text-foreground text-center leading-tight">
				{name}
			</span>
		</div>
	);
};
