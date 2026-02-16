// src/modules/comida/components/category.tsx
import { ButtonCategory } from '@/shared/components/buttonCategory';
import { cn } from '@/utils/cn';

interface CategoryItem {
	name: string;
	imageUrl: string;
	link: string;
}

export const CategoryMenu = ({ items }: { items: CategoryItem[] }) => {
	return (
		<div className="w-full">
			<div
				className={cn(
					'flex flex-nowrap items-center justify-start md:justify-center',
					'overflow-x-auto no-scrollbar',
					'gap-4 px-6 md:px-16 lg:px-20 py-6',
					'scroll-smooth'
				)}
			>
				{items.map((item, index) => (
					<ButtonCategory
						key={index}
						name={item.name}
						imageUrl={item.imageUrl}
						link={item.link}
					/>
				))}
			</div>
		</div>
	);
};
