'use client';

import { AdaptiveDpr } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lluvia de cartas en 3D.
 *
 * Todas las cartas son UNA sola malla instanciada, asi que el GPU hace una
 * unica llamada de dibujo por frame independientemente de cuantas cartas haya.
 * El material es MeshBasicMaterial a proposito: no hay luces en la escena, asi
 * que no se paga el costo de iluminarla.
 */

interface CardSeed {
	x: number;
	y: number;
	z: number;
	fallSpeed: number;
	spinX: number;
	spinY: number;
	spinZ: number;
	phase: number;
	sway: number;
	scale: number;
}

/** Alto del campo: una carta que sale por abajo reaparece arriba. */
const FIELD_HALF_HEIGHT = 9;
const FIELD_WIDTH = 15;

// Proporcion de una carta española (60 x 90 mm).
const CARD_WIDTH = 0.42;
const CARD_HEIGHT = 0.63;

function createSeeds(count: number): CardSeed[] {
	const seeds: CardSeed[] = [];
	for (let i = 0; i < count; i++) {
		seeds.push({
			x: (Math.random() - 0.5) * FIELD_WIDTH,
			y: (Math.random() - 0.5) * FIELD_HALF_HEIGHT * 2,
			// Profundidad: las lejanas se ven mas chicas por la perspectiva.
			z: -8 + Math.random() * 9,
			fallSpeed: 0.5 + Math.random() * 1.1,
			spinX: (Math.random() - 0.5) * 0.7,
			spinY: (Math.random() - 0.5) * 0.9,
			spinZ: (Math.random() - 0.5) * 0.4,
			phase: Math.random() * Math.PI * 2,
			sway: 0.15 + Math.random() * 0.45,
			scale: 0.75 + Math.random() * 0.6,
		});
	}
	return seeds;
}

function Cards({ count, paused }: { count: number; paused: boolean }) {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const dummy = useMemo(() => new THREE.Object3D(), []);
	const seeds = useMemo(() => createSeeds(count), [count]);
	// Reloj propio: se congela cuando `paused`, en lugar de seguir corriendo.
	const timeRef = useRef(0);

	const writeMatrices = () => {
		const mesh = meshRef.current;
		if (!mesh) return;
		const time = timeRef.current;

		for (let i = 0; i < seeds.length; i++) {
			const seed = seeds[i];
			dummy.position.set(
				seed.x + Math.sin(time * 0.4 + seed.phase) * seed.sway,
				seed.y,
				seed.z
			);
			dummy.rotation.set(
				time * seed.spinX + seed.phase,
				time * seed.spinY,
				time * seed.spinZ
			);
			dummy.scale.setScalar(seed.scale);
			dummy.updateMatrix();
			mesh.setMatrixAt(i, dummy.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
	};

	// Primer acomodo antes de pintar: si la escena esta pausada (por
	// prefers-reduced-motion) igual se ven las cartas, quietas.
	useLayoutEffect(writeMatrices);

	useFrame((_, delta) => {
		if (paused) return;
		// Al volver de otra pestaña delta puede ser enorme; acotarlo evita
		// que las cartas salten media pantalla de golpe.
		const step = Math.min(delta, 0.05);
		timeRef.current += step;

		for (const seed of seeds) {
			seed.y -= seed.fallSpeed * step;
			if (seed.y < -FIELD_HALF_HEIGHT) {
				seed.y += FIELD_HALF_HEIGHT * 2;
			}
		}
		writeMatrices();
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
			<meshBasicMaterial
				color="#f3ead6"
				transparent
				opacity={0.4}
				side={THREE.DoubleSide}
				// Sin escritura de profundidad no hay parpadeo entre cartas
				// transparentes que se cruzan.
				depthWrite={false}
			/>
		</instancedMesh>
	);
}

export default function CardRainScene({
	count,
	paused,
}: {
	count: number;
	paused: boolean;
}) {
	return (
		<Canvas
			// Tope de densidad de pixeles: en pantallas retina el costo se
			// dispara sin que la escena se vea mejor.
			dpr={[1, 1.5]}
			// Pausada no gasta frames: dibuja una vez y se detiene.
			frameloop={paused ? 'demand' : 'always'}
			camera={{ position: [0, 0, 6], fov: 50 }}
			gl={{ antialias: false, powerPreference: 'low-power' }}
		>
			<AdaptiveDpr pixelated />
			<Cards count={count} paused={paused} />
		</Canvas>
	);
}
