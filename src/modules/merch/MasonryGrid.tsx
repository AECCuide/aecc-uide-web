'use client';
// src/modules/merch/MasonryGrid.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Product,
	ProductCardProps,
	MasonryGalleryProps,
} from '@/types/product';

const TrueMasonryGallery: React.FC<MasonryGalleryProps> = ({
	products,
	title = 'New Arrivals',
	columns: initialColumns = 3,
}) => {
	const [columns, setColumns] = useState<number>(initialColumns);

	// Responsive column adjustment
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1022) {
				setColumns(1);
			} else if (window.innerWidth < 1024) {
				setColumns(2);
			} else {
				setColumns(initialColumns);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [initialColumns]);

	// Distribute products into columns
	const getColumnProducts = (): Product[][] => {
		const columnProducts: Product[][] = Array.from(
			{ length: columns },
			() => []
		);

		products.forEach((product, index) => {
			columnProducts[index % columns].push(product);
		});

		return columnProducts;
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="title-h1 mb-6">{title}</h2>
			<div className="flex flex-row space-x-4">
				{getColumnProducts().map((columnProducts, columnIndex) => (
					<div key={columnIndex} className="flex-1 space-y-4">
						{columnProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	// Genera un alto dinámico para la imagen para respetar el efecto Masonry
	const getRandomHeight = (): string => {
		const heights = ['h-64', 'h-72', 'h-80', 'h-96'];
		return heights[Math.floor(Math.random() * heights.length)];
	};

	const imageHeight = getRandomHeight();

	return (
		<div className="group relative overflow-hidden bg-card rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
			<Link href={`/products/${product.slug}`}>
				{/* Imagen con altura dinámica para respetar Masonry Grid */}
				<div className={`relative w-full ${imageHeight}`}>
					<img
						src={product.image}
						alt={product.name}
						className="object-cover w-full h-full transition-all duration-300 group-hover:brightness-75"
					/>

					{/* Badge de descuento */}
					{product.onSale && (
						<div className="absolute top-2 right-2 bg-destructive text-primary-foreground px-2 py-1 text-xs font-bold rounded-md">
							SALE
						</div>
					)}

					{/* Detalles del producto - Oculto por defecto, visible en hover */}
					<div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<h3 className="text-primary-foreground font-medium text-lg">
							{product.name}
						</h3>
						<p className="text-primary-foreground text-sm">{product.brand}</p>
						<div className="flex justify-between items-center mt-2">
							<div>
								{product.onSale && product.salePrice ? (
									<div className="flex items-center gap-2">
										<p className="text-primary-foreground font-bold">
											{product.salePrice}
										</p>
										<p className="text-muted-foreground text-sm line-through">
											{product.price}
										</p>
									</div>
								) : (
									<p className="text-primary-foreground font-bold">
										{product.price}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default TrueMasonryGallery;
