
'use client';
import { useTheme } from 'next-themes';
import Logo from './icon/aeccIcon';

export default function Home() {

	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex justify-center">
        <Logo className="w-50 h-50 sm:w-100 sm:h-100 md:w-100 md:h-100 lg:w-180 lg:h-180"/>
			</div>

      <div className="px-8 sm:px-8 md:px-40 ">
        <div className="mb-8">
          <p className="title-h1">Pasantias</p>
          <p>Holi.</p>
        </div>
      </div>

		</div>
  
	);
}
