// pages/index.tsx
import { NextPage } from 'next';
import TrueMasonryGallery from '@/modules/merch/MasonryGrid';

interface Product {
	id: number;
	name: string;
	brand: string;
	price: string;
	image: string;
	slug: string;
	rating?: number;
	reviews?: number;
}

const Home: NextPage = () => {
	// Mock product data - replace with your actual data
	const products: Product[] = [
		{
			id: 1,
			name: 'Sapphire Vintage-Inspired Ring',
			brand: 'Luxurious Heirloom Jewels',
			price: 'From $20.00',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'sapphire-ring',
			rating: 4.85,
			reviews: 3,
		},
		{
			id: 2,
			name: 'Portable Bluetooth Speaker',
			brand: 'SoundWave',
			price: '$79.99',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'portable-speaker',
		},
		{
			id: 3,
			name: 'Minimalist Pendant Light',
			brand: 'ModernLux',
			price: '$45.00',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'pendant-light',
		},
		{
			id: 4,
			name: 'Classic Sunglasses',
			brand: 'ShadeStyle',
			price: '$59.99',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'classic-sunglasses',
		},
		{
			id: 5,
			name: 'Decorative Marble Plate',
			brand: 'ArtHome',
			price: '$32.50',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'marble-plate',
		},
		{
			id: 6,
			name: 'Modern Ceramic Vase',
			brand: 'ElegantDecor',
			price: '$28.99',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbxBhFmu275tTkdc4ndx4qOUWGvjroP69Rg&s',
			slug: 'ceramic-vase',
		},
	];

	return (
		<main className="mt-8">
			<TrueMasonryGallery products={products} />
		</main>
	);
};

export default Home;
