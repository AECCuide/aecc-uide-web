'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function V0ParticleAnimation() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [svgMask, setSvgMask] = useState<ImageData | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(true);

	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		points: THREE.Points;
		geometry: THREE.BufferGeometry;
		particleCount: number;
		rotationX: number;
		rotationY: number;
		isDragging: boolean;
		previousMouseX: number;
		previousMouseY: number;
	} | null>(null);

	const svgMaskRef = useRef<ImageData | null>(null);

	// Detectar si es móvil
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	// Detectar el modo de color (dark/light)
	useEffect(() => {
		const checkDarkMode = () => {
			const isDark = document.documentElement.classList.contains('dark');
			setIsDarkMode(isDark);
		};

		// Verificar inicialmente
		checkDarkMode();

		// Observar cambios en la clase del html
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	// Crear las letras AECC directamente
	useEffect(() => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = 800;
		canvas.height = 400;

		// Fondo negro
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Dibujar texto "AECC"
		ctx.fillStyle = 'white';
		ctx.font = 'bold 120px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('AECC', canvas.width / 2, canvas.height / 2);

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		setSvgMask(imageData);
		svgMaskRef.current = imageData;
	}, []);

	useEffect(() => {
		svgMaskRef.current = svgMask;
	}, [svgMask]);

	// Actualizar colores cuando cambia el modo
	useEffect(() => {
		if (!sceneRef.current) return;

		const { geometry, particleCount } = sceneRef.current;
		const colorAttribute = geometry.getAttribute(
			'color'
		) as THREE.BufferAttribute;

		// Color según el modo: negro para light mode, blanco para dark mode
		const r = isDarkMode ? 1 : 0;
		const g = isDarkMode ? 1 : 0;
		const b = isDarkMode ? 1 : 0;

		for (let i = 0; i < particleCount; i++) {
			colorAttribute.setXYZ(i, r, g, b);
		}

		colorAttribute.needsUpdate = true;
	}, [isDarkMode]);

	useEffect(() => {
		if (!canvasRef.current || !containerRef.current || !svgMask) {
			return;
		}

		const container = containerRef.current;
		const canvas = canvasRef.current;

		// Función dist que usa el mask de texto
		const dist = (px: number, py: number): number => {
			if (!svgMaskRef.current) return 1;

			const imgX = Math.floor(((px + 2) / 4) * svgMaskRef.current.width);
			const imgY = Math.floor(((1 - py) / 2) * svgMaskRef.current.height);

			if (
				imgX < 0 ||
				imgX >= svgMaskRef.current.width ||
				imgY < 0 ||
				imgY >= svgMaskRef.current.height
			) {
				return 1;
			}

			const index = (imgY * svgMaskRef.current.width + imgX) * 4;
			const r = svgMaskRef.current.data[index];
			const g = svgMaskRef.current.data[index + 1];
			const b = svgMaskRef.current.data[index + 2];
			const a = svgMaskRef.current.data[index + 3];

			const isBlack = r < 20 && g < 20 && b < 20;
			const hasAlpha = a > 10;

			return hasAlpha && !isBlack ? -0.1 : 1;
		};

		const handleResize = () => {
			if (sceneRef.current) {
				const { camera, renderer } = sceneRef.current;
				const newWidth = container.clientWidth;
				const newHeight = container.clientHeight;

				camera.aspect = newWidth / newHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(newWidth, newHeight);
			}
		};

		window.addEventListener('resize', handleResize);

		const initialWidth = container.clientWidth;
		const initialHeight = container.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			initialWidth / initialHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: !isMobile,
			alpha: true,
			powerPreference: isMobile ? 'low-power' : 'high-performance',
		});

		renderer.setPixelRatio(
			isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio
		);
		renderer.setSize(initialWidth, initialHeight);

		// Generate particles
		const numParticles = isMobile ? 2000 : 15000;
		const thickness = 0.2;
		const positions = new Float32Array(numParticles * 3);
		const colors = new Float32Array(numParticles * 3);
		let i = 0;
		const maxAttempts = isMobile ? 1000000 : 2000000;
		let attempts = 0;

		while (i < numParticles && attempts < maxAttempts) {
			attempts++;
			const x = Math.random() * 4 - 2;
			const y = Math.random() * 2 - 1;
			const z = Math.random() * thickness - thickness / 2;

			if (dist(x, y) <= 0) {
				positions[i * 3] = x;
				positions[i * 3 + 1] = y;
				positions[i * 3 + 2] = z;

				// Color inicial según el modo
				const colorValue = isDarkMode ? 1 : 0;
				colors[i * 3] = colorValue;
				colors[i * 3 + 1] = colorValue;
				colors[i * 3 + 2] = colorValue;
				i++;
			}
		}

		if (i === 0) {
			console.error('No se generaron partículas');
			return;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: isMobile ? 0.012 : 0.008,
			sizeAttenuation: true,
			vertexColors: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		camera.position.set(0, 0, isMobile ? 4.2 : 1.5);

		sceneRef.current = {
			scene,
			camera,
			renderer,
			points,
			geometry,
			particleCount: i,
			rotationX: 0,
			rotationY: 0,
			isDragging: false,
			previousMouseX: 0,
			previousMouseY: 0,
		};

		// Animation loop para rotación
		let animationId: number;
		let lastTime = 0;
		const targetFPS = isMobile ? 30 : 60;
		const frameInterval = 1000 / targetFPS;

		const animate = (timestamp: number) => {
			if (!sceneRef.current) return;

			// Control de FPS en móvil
			if (isMobile) {
				const elapsed = timestamp - lastTime;
				if (elapsed < frameInterval) {
					animationId = requestAnimationFrame(animate);
					return;
				}
				lastTime = timestamp - (elapsed % frameInterval);
			}

			const { points, rotationX, rotationY, renderer, scene, camera } =
				sceneRef.current;

			// Actualizar rotaciones suavemente
			points.rotation.y += (rotationY - points.rotation.y) * 0.1;
			points.rotation.x += (rotationX - points.rotation.x) * 0.1;

			renderer.render(scene, camera);
			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationId);
			geometry.dispose();
			window.removeEventListener('resize', handleResize);
			material.dispose();
			renderer.dispose();
		};
	}, [svgMask, isMobile, isDarkMode]);

	// Mouse drag handlers
	const handleMouseDown = (event: React.MouseEvent) => {
		if (!sceneRef.current) return;
		sceneRef.current.isDragging = true;
		sceneRef.current.previousMouseX = event.clientX;
		sceneRef.current.previousMouseY = event.clientY;
	};

	const handleMouseMoveDrag = (event: React.MouseEvent) => {
		if (!sceneRef.current?.isDragging) return;
		const deltaX = event.clientX - sceneRef.current.previousMouseX;
		const deltaY = event.clientY - sceneRef.current.previousMouseY;
		sceneRef.current.rotationY -= deltaX * 0.005;
		sceneRef.current.rotationX -= deltaY * 0.005;
		sceneRef.current.previousMouseX = event.clientX;
		sceneRef.current.previousMouseY = event.clientY;
	};

	const handleMouseUp = () => {
		if (sceneRef.current) {
			sceneRef.current.isDragging = false;
		}
	};

	// Touch handlers
	const handleTouchStart = (event: React.TouchEvent) => {
		if (!sceneRef.current) return;
		sceneRef.current.isDragging = true;
		sceneRef.current.previousMouseX = event.touches[0].clientX;
		sceneRef.current.previousMouseY = event.touches[0].clientY;
	};

	const handleTouchMove = (event: React.TouchEvent) => {
		if (!sceneRef.current?.isDragging) return;
		const deltaX = event.touches[0].clientX - sceneRef.current.previousMouseX;
		const deltaY = event.touches[0].clientY - sceneRef.current.previousMouseY;
		sceneRef.current.rotationY -= deltaX * 0.005;
		sceneRef.current.rotationX -= deltaY * 0.005;
		sceneRef.current.previousMouseX = event.touches[0].clientX;
		sceneRef.current.previousMouseY = event.touches[0].clientY;
	};

	const handleTouchEnd = () => {
		if (sceneRef.current) {
			sceneRef.current.isDragging = false;
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative flex items-center justify-center min-h-screen w-full h-screen"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMoveDrag}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<canvas
				ref={canvasRef}
				className="block"
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
