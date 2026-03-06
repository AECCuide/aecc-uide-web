// src/shared/components/buttonCategory.tsx
import Image from 'next/image';
import { cn } from '@/utils/cn';

export const ButtonCategory = ({
	name,
	imageUrl,
	link,
	onClick,
	isActive,
}: {
	name: string;
	imageUrl: string;
	link?: string;
	onClick?: () => void;
	isActive?: boolean;
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		} else if (link) {
			window.location.href = link;
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				// shrink-0 es VITAL para que no se aplasten en el scroll
				'shrink-0 w-28 h-28 flex flex-col items-center justify-between p-4',
				'bg-card rounded-[24px] cursor-pointer transition-all active:scale-95 hover:scale-105',
				'border-none outline-none focus-visible:ring-2 focus-visible:ring-primary',
				// Sombras Neumorphism más marcadas para que se note el volumen
				'shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)]',
				'dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.05)]',
				isActive && 'border-2 border-primary ring-2 ring-primary/20'
			)}
		>
			<div className="flex-1 flex items-center justify-center w-full overflow-hidden relative">
				<Image
					src={imageUrl}
					alt={name}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-contain pointer-events-none p-2"
				/>
			</div>
			<span
				className={cn(
					'mt-2 text-[12px] font-bold text-center leading-tight',
					isActive ? 'text-primary' : 'text-foreground'
				)}
			>
				{name}
			</span>
		</button>
	);
};
