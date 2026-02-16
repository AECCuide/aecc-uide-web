import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://aecc.com';

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	// 🔹 Páginas estáticas principales
	const staticPages = [
		{
			url: BASE_URL,
			lastModified: now,
			changeFrequency: 'daily' as const,
			priority: 1,
			alternates: {
				languages: {
					es: `${BASE_URL}/es`,
					en: `${BASE_URL}/en`,
				},
			},
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: now,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		},
		{
			url: `${BASE_URL}/blog`,
			lastModified: now,
			changeFrequency: 'weekly' as const,
			priority: 0.7,
		},
	];

	// 🔹 Ejemplo dinámico (blog posts)
	const posts = [
		{ slug: 'post-1', updatedAt: now },
		{ slug: 'post-2', updatedAt: now },
	];

	const blogPages = posts.map((post) => ({
		url: `${BASE_URL}/blog/${post.slug}`,
		lastModified: post.updatedAt,
		changeFrequency: 'weekly' as const,
		priority: 0.6,
	}));

	return [...staticPages, ...blogPages];
}
