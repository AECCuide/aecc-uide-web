'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FallingCardsAnimation from '@/components/cuarenta/animation/animacionCartas';

gsap.registerPlugin(ScrollTrigger);

export default function CuarentaPage() {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const infoBoxRef = useRef<HTMLDivElement>(null);
	const section2Ref = useRef<HTMLElement>(null);
	const section3Ref = useRef<HTMLElement>(null);

	useEffect(() => {
		// Animación del título principal
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{
					scale: 0.8,
					opacity: 0,
					rotationX: -90,
				},
				{
					scale: 1,
					opacity: 1,
					rotationX: 0,
					duration: 1.5,
					ease: 'back.out(1.7)',
					scrollTrigger: {
						trigger: titleRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			);
		}

		// Animación del subtítulo
		if (subtitleRef.current) {
			gsap.fromTo(
				subtitleRef.current,
				{
					y: 50,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 1,
					delay: 0.5,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: subtitleRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			);
		}

		// Animación del cuadro de información
		if (infoBoxRef.current) {
			const infoItems = infoBoxRef.current.querySelectorAll('.info-item');

			gsap.fromTo(
				infoBoxRef.current,
				{
					scale: 0.9,
					opacity: 0,
				},
				{
					scale: 1,
					opacity: 1,
					duration: 0.8,
					delay: 1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: infoBoxRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			);

			// Animar cada item de información
			infoItems.forEach((item, index) => {
				gsap.fromTo(
					item,
					{
						x: index % 2 === 0 ? -100 : 100,
						opacity: 0,
					},
					{
						x: 0,
						opacity: 1,
						duration: 0.8,
						delay: 1.3 + index * 0.2,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: infoBoxRef.current,
							start: 'top 80%',
							toggleActions: 'play none none reverse',
						},
					}
				);
			});
		}

		// Animación de la sección 2
		if (section2Ref.current) {
			gsap.fromTo(
				section2Ref.current,
				{
					y: 100,
					opacity: 0,
					rotation: -5,
				},
				{
					y: 0,
					opacity: 1,
					rotation: 0,
					duration: 1.2,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: section2Ref.current,
						start: 'top 70%',
						toggleActions: 'play none none reverse',
					},
				}
			);
		}

		// Animación de la sección 3
		if (section3Ref.current) {
			const letters = section3Ref.current.querySelectorAll('.letter');

			gsap.fromTo(
				letters,
				{
					y: 100,
					opacity: 0,
					rotationX: 90,
				},
				{
					y: 0,
					opacity: 1,
					rotationX: 0,
					duration: 0.8,
					stagger: 0.05,
					ease: 'back.out(1.7)',
					scrollTrigger: {
						trigger: section3Ref.current,
						start: 'top 70%',
						toggleActions: 'play none none reverse',
					},
				}
			);
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});
		};
	}, []);

	const splitText = (text: string) => {
		return text.split('').map((char, index) => (
			<span key={index} className="letter inline-block">
				{char === ' ' ? '\u00A0' : char}
			</span>
		));
	};

	return (
		<FallingCardsAnimation cardCount={120}>
			<div className="text-center text-gray-800 dark:text-white">
				{/* Sección 1 - Información del Torneo */}
				<section className="min-h-screen w-full flex flex-col items-center justify-center px-4 box-border overflow-hidden">
					<h1
						ref={titleRef}
						className="text-5xl md:text-8xl font-bold tracking-wider mb-8 text-gray-900 dark:text-white"
						style={{
							textShadow: '4px 4px 12px rgba(0,0,0,0.8)',
							fontFamily: 'serif',
							perspective: '1000px',
						}}
					>
						TORNEO
						<br />
						DE CUARENTA
					</h1>

					<p
						ref={subtitleRef}
						className="text-xl md:text-3xl uppercase tracking-widest border-t-2 border-b-2 border-gray-800 dark:border-white py-3 px-6 md:px-8 mb-12"
					>
						Ciencias de la Computación
					</p>

					<div
						ref={infoBoxRef}
						className="bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 border-2 border-black/10 dark:border-white/30 max-w-full overflow-hidden"
					>
						<div className="flex items-center justify-center gap-2 sm:gap-10">
							{/* Fecha */}
							<div className="px-2 sm:px-4 text-center">
								<div className="text-2xl sm:text-7xl font-bold mb-1">23</div>
								<div className="text-sm sm:text-xl uppercase tracking-wider">
									Noviembre
								</div>
							</div>

							{/* Separador */}
							<div className="h-8 sm:h-16 w-px bg-black/20 dark:bg-white/30"></div>

							{/* Hora */}
							<div className="px-2 sm:px-4 text-center">
								<div className="text-xl sm:text-3xl font-bold mb-1">
									9:00 AM
								</div>
								<div className="text-xs sm:text-lg uppercase tracking-wider">
									Coliseo
								</div>
							</div>

							{/* Separador */}
							<div className="h-8 sm:h-16 w-px bg-black/20 dark:bg-white/30"></div>

							{/* Precio */}
							<div className="px-2 sm:px-4 text-center">
								<div className="text-3xl sm:text-7xl font-bold mb-1">5$</div>
								<div className="text-xs sm:text-lg uppercase tracking-wider">
									Por Pareja
								</div>
							</div>
						</div>
					</div>

					<p className="mt-8 text-xl opacity-70 animate-bounce text-gray-700 dark:text-gray-300">
						Desplázate hacia abajo para ver más ✨
					</p>
				</section>

				{/* Sección 2 - Reglas del Juego
				<section
					ref={section2Ref}
					className="min-h-screen flex flex-col items-center justify-center px-4 box-border overflow-hidden"
				>
					<div className="w-full max-w-xl sm:max-w-3xl mx-auto bg-gray-200/70 dark:bg-linear-to-r dark:text-bl backdrop-blur-lg rounded-3xl p-4 sm:p-12 border-4 border-black/10 dark:border-white/20 shadow-2xl overflow-hidden">
						<h2 className="text-2xl sm:text-6xl font-bold mb-6 text-center sm:text-left leading-tight wrap-break-word">
							🃏 ¿Listo para Jugar?
						</h2>
						<div className="space-y-4 text-sm sm:text-2xl text-left">
							<p className="flex items-start gap-3 min-w-0">
								<span className="text-2xl sm:text-4xl shrink-0">♠</span>
								<span className="flex-1 whitespace-normal wrap-break-word">
									Forma tu equipo de 2 jugadores
								</span>
							</p>
							<p className="flex items-start gap-3 min-w-0">
								<span className="text-2xl sm:text-4xl shrink-0">♥</span>
								<span className="flex-1 whitespace-normal wrap-break-word">
									Demuestra tu estrategia y habilidad
								</span>
							</p>
							<p className="flex items-start gap-3 min-w-0">
								<span className="text-2xl sm:text-4xl shrink-0">♦</span>
								<span className="flex-1 whitespace-normal wrap-break-word">
									Compite por premios increíbles
								</span>
							</p>
							<p className="flex items-start gap-3 min-w-0">
								<span className="text-2xl sm:text-4xl shrink-0">♣</span>
								<span className="flex-1 whitespace-normal wrap-break-word">
									¡Diviértete al máximo!
								</span>
							</p>
						</div>
					</div>
				</section>
 */}
				{/* Sección 3 - Llamado a la Acción */}
				<section
					ref={section3Ref}
					className="min-h-screen flex flex-col items-center justify-center px-4"
				>
					<div className="space-y-12">
						<h2 className="text-4xl md:text-8xl font-bold mb-4">
							{splitText('¡TE ESPERAMOS!')}
						</h2>
						<div className="bg-yellow-400 rounded-full px-10 py-5 text-2xl md:text-4xl font-bold transform hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg dark:shadow-2xl">
							INSCRÍBETE AHORA
						</div>
						<p className="text-xl md:text-2xl opacity-80 dark:opacity-90">
							Cupos limitados - No te quedes fuera
						</p>
					</div>
				</section>

				{/* Sección Final */}
				<section className="min-h-screen flex flex-col items-center justify-center px-4">
					<h2 className="text-4xl md:text-7xl font-bold mb-8">
						🏆 Nos Vemos en el Torneo 🏆
					</h2>
					<p className="text-xl md:text-3xl max-w-2xl opacity-90">
						Organizado por estudiantes de Ciencias de la Computación con mucho
						❤️
					</p>
				</section>
			</div>
		</FallingCardsAnimation>
	);
}
