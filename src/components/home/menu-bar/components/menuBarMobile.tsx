import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export function MenuBarMobile() {
	return (
		<div className="sm:hidden flex justify-between items-center px-4 w-full">
			{/* <AlignJustify className="h-6 w-6" /> */}
			<div className="flex justify-between w-full items-center">
				{/* Nombre en la izquierda */}
				<div className="text-lg font-bold">
					<Link href="/">AECC</Link>
				</div>

				{/* Botón y color a la derecha */}
				<ThemeToggle />
			</div>
		</div>
	);
}
