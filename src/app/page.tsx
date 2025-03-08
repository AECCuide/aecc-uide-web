'use client';

import { Button } from '@/components/ui/buttom';

export default function Page() {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			<div className="mb-[120px]"></div>
			<Button
				variant="default"
				size="default"
				onClick={() => console.log('Click')}
			>
				Default
			</Button>
		</div>
	);
}
