// src/modules/comida/components/category.tsx
import { ButtonCategory } from '@/shared/components/buttonCategory';
import { cn } from '@/utils/cn';

interface CategoryItem {
	name: string;
	imageUrl: string;
	link: string;
}

export const CategoryMenu = ({
	items,
	activeCategory,
	onSelectCategory,
}: {
	items: CategoryItem[];
	activeCategory?: string;
	onSelectCategory?: (name: string) => void;
}) => {
	return (
		<div className="w-full">
			<div
				className={cn(
					'flex flex-nowrap items-center justify-start md:justify-center',
					'overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
					'gap-4 px-6 md:px-16 lg:px-20 py-6',
					'scroll-smooth'
				)}
			>
				{items.map((item) => (
					<ButtonCategory
						key={item.name}
						name={item.name}
						imageUrl={item.imageUrl}
						link={item.link}
						isActive={activeCategory === item.name}
						onClick={() => onSelectCategory?.(item.name)}
					/>
				))}
			</div>
		</div>
	);
};
