'use client';
import { useTheme } from 'next-themes';
import Logo from './icon/aeccIcon.tsx';

export default function Home() {
	const { theme } = useTheme(); // Obtiene el tema actual

	const fillColor = theme === 'dark' ? '#ffffff' : '#000000';
	const glasses = theme === 'dark' ? '#000000' : '#000000';
	const glassesReflectionColor = theme === 'dark' ? '#ffffff' : '#ffffff';

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			<div className="mb-[120px]">
				<Logo
					width={400}
					height={400}
					fillColor={fillColor}
					glassesColor={glasses}
					glassesReflectionColor={glassesReflectionColor}
				/>
			</div>
		</div>
	);
}
