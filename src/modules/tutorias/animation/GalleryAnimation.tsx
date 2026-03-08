'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import styles from './gallery.module.css';

gsap.registerPlugin(ScrollTrigger, Flip);

const images = [
	'/img/tutorias/media__1772936128482.jpg',
	'/img/tutorias/media__1772936148540.png',
	'/img/tutorias/media__1772936168835.jpg',
	'/img/tutorias/media__1772936195667.png',
	'/img/tutorias/media__1772937084125.jpg',
	'/img/tutorias/media__1772937140137.jpg',
	'/img/tutorias/media__1772937155157.jpg',
	'/img/tutorias/media__1772933613572.png',
];

export default function GalleryAnimation({
	children,
}: {
	children: React.ReactNode;
}) {
	const galleryWrapRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	const ctx = useRef<gsap.Context | null>(null);

	useEffect(() => {
		if (!galleryRef.current || !galleryWrapRef.current) return;

		const createTween = () => {
			if (ctx.current) {
				ctx.current.revert();
			}

			const galleryElement = galleryRef.current;
			if (!galleryElement) return;

			const galleryItems = galleryElement.querySelectorAll(
				`.${styles.galleryItem}`
			);

			galleryElement.classList.remove(styles.galleryFinal);

			ctx.current = gsap.context(() => {
				// Temporarily add the final class to capture the final state
				galleryElement.classList.add(styles.galleryFinal);
				const flipState = Flip.getState(galleryItems);
				galleryElement.classList.remove(styles.galleryFinal);

				const flip = Flip.to(flipState, {
					simple: true,
					ease: 'expoScale(1, 5)',
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: galleryElement,
						start: 'center center',
						end: '+=100%',
						scrub: true,
						pin: galleryWrapRef.current,
					},
				});
				tl.add(flip);
				return () => gsap.set(galleryItems, { clearProps: 'all' });
			}, galleryWrapRef);
		};

		// Run initially
		// Wait a small amount for layout to paint correctly before snapping states
		const timeout = setTimeout(() => {
			createTween();
		}, 100);

		window.addEventListener('resize', createTween);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('resize', createTween);
			if (ctx.current) ctx.current.revert();
		};
	}, []);

	return (
		<div>
			<div className={styles.galleryWrap} ref={galleryWrapRef}>
				<div
					className={`${styles.gallery} ${styles.galleryBento}`}
					ref={galleryRef}
				>
					{images.map((src, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: order is static
							key={`gallery-item-${index}`}
							className={styles.galleryItem}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={src} alt={`Gallery item ${index}`} />
						</div>
					))}
				</div>
			</div>
			<div className={styles.section}>{children}</div>
		</div>
	);
}
