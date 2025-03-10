'use client';
import { useTheme } from 'next-themes';
import Logo from './icon/aeccIcon';

export default function Home() {

	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			<div className="mb-[120px]">
				<Logo
					width={380}
					height={380}
				/>
			</div>
		</div>
	);
}
