'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BookMarked, ChevronDown, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/buttom';
import Card from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Discord } from '@/components/ui/discord';
import { ButtonCategory } from '@/shared/components/buttonCategory';
import { SearchBar } from '@/modules/comida/components/searchBar';
import ParticipantCard from '@/modules/cuarenta/components/ParticipantCard';
import SubmitButton from '@/modules/cuarenta/components/SubmitButton';
import { validateCuarentaForm } from '@/modules/cuarenta/hooks/validation';
import type { Participant } from '@/modules/cuarenta/types/registration';

type SwitchState = boolean;

const DocsPage = () => {
	const [activeSwitch, setActiveSwitch] = useState<SwitchState>(false);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCard, setSelectedCard] = useState<string | null>(null);
	const [teamNameDemo, setTeamNameDemo] = useState('Equipo Demo');
	const [carreraDemo, setCarreraDemo] = useState('Sistemas');
	const [paymentMethodDemo, setPaymentMethodDemo] = useState('Efectivo');
	const [activeDropdownDemo, setActiveDropdownDemo] = useState<
		'carrera' | 'payment' | null
	>(null);
	const [participantsDemo, setParticipantsDemo] = useState<
		[Participant, Participant]
	>([
		{ name: 'Jugador 1', course: '1ro A', phone: '0999999999' },
		{ name: 'Jugador 2', course: '1ro B', phone: '0988888888' },
	]);

	// Ejemplos de datos para cards
	const cardExamples = [
		{
			slug: 'card-1',
			title: 'Card de Ejemplo 1',
			description: 'Esta es una tarjeta reutilizable para mostrar contenido',
			badge: 'Ejemplo',
			provider: 'Demo',
			image:
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
			tags: ['React', 'UI', 'Components'],
		},
		{
			slug: 'card-2',
			title: 'Card de Ejemplo 2',
			description: 'Tarjeta con múltiples opciones de customización',
			badge: 'Demo',
			provider: 'Sistema',
			image:
				'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
			tags: ['Diseño', 'UI', 'Reutilizable'],
		},
		{
			slug: 'card-3',
			title: 'Card de Ejemplo 3',
			description: 'Tercera variante de card para diferentes casos de uso',
			badge: 'Template',
			provider: 'Componente',
			image:
				'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
			tags: ['Next.js', 'TypeScript', 'Componentes'],
		},
	];

	const formValidationDemo = validateCuarentaForm({
		teamName: teamNameDemo,
		participants: participantsDemo,
		turno: 'manana',
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						Componentes UI - Librería
					</h1>
					<p className="text-lg text-muted-foreground">
						Prueba todos los componentes reutilizables del proyecto
					</p>
				</div>

				{/* Grid de Secciones */}
				<div className="grid gap-8">
					{/* Sección: Buttons */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Botones
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<Button variant="default" size="sm">
								Default
							</Button>
							<Button variant="white" size="sm">
								White
							</Button>
							<Button variant="destructive" size="sm">
								Destructive
							</Button>
							<Button variant="link" size="sm">
								Link
							</Button>
							<Button
								variant="default"
								size="sm"
								lefticon={<Discord className="w-4 h-4" />}
							>
								Con Ícono
							</Button>
							<Button variant="default" size="icon">
								<Discord className="w-5 h-5" />
							</Button>
							<Button variant="heart" size="sm">
								❤️
							</Button>
							<Button variant="baricon" size="sm">
								Bar Icon
							</Button>
						</div>
					</section>

					{/* Sección: Badges */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Badges
						</h2>
						<div className="flex flex-wrap gap-4">
							<Badge variant="default">Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="destructive">Destructive</Badge>
							<Badge variant="outline">Outline</Badge>
							<Badge>React</Badge>
							<Badge>TypeScript</Badge>
							<Badge>Next.js</Badge>
							<Badge variant="secondary">UI Components</Badge>
						</div>
					</section>

					{/* Sección: Switch */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Switch
						</h2>
						<div className="flex flex-col gap-6">
							<div className="flex items-center gap-4">
								<Switch
									checked={activeSwitch}
									onCheckedChange={setActiveSwitch}
								/>
								<span className="text-muted-foreground">
									Estado: {activeSwitch ? 'Activado ✓' : 'Desactivado'}
								</span>
							</div>
							<div className="flex items-center gap-4">
								<Switch defaultChecked />
								<span className="text-muted-foreground">
									Switch por defecto activado
								</span>
							</div>
						</div>
					</section>

					{/* Sección: Search Bar */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Search Bar
						</h2>
						<div className="flex flex-col gap-4">
							<SearchBar
								placeholder="Busca algo..."
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onSearch={(value) => console.log('Buscando:', value)}
							/>
							{searchValue && (
								<p className="text-sm text-muted-foreground">
									Valor actual:{' '}
									<span className="font-mono font-semibold">{searchValue}</span>
								</p>
							)}
						</div>
					</section>

					{/* Sección: Cards */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Cards - Carrusel Horizontal
						</h2>
						<div className="overflow-x-auto pb-4">
							<Card
								cardData={cardExamples}
								onClick={(card) => {
									setSelectedCard(card.slug || '');
									console.log('Card seleccionada:', card);
								}}
							/>
						</div>
						{selectedCard && (
							<div className="mt-4 p-4 bg-background border border-border rounded-lg">
								<p className="text-sm text-muted-foreground">
									Card seleccionada:{' '}
									<span className="font-semibold text-foreground">
										{selectedCard}
									</span>
								</p>
							</div>
						)}
					</section>

					{/* Sección: Button Category */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Button Category
						</h2>
						<div className="flex flex-wrap gap-6">
							{[
								{
									name: 'Opción 1',
									imageUrl:
										'https://cdn-icons-png.flaticon.com/512/3143/3143615.png',
								},
								{
									name: 'Opción 2',
									imageUrl:
										'https://cdn-icons-png.flaticon.com/512/747/747376.png',
								},
								{
									name: 'Opción 3',
									imageUrl:
										'https://cdn-icons-png.flaticon.com/512/3597/3597080.png',
								},
								{
									name: 'Opción 4',
									imageUrl:
										'https://cdn-icons-png.flaticon.com/512/1995/1995467.png',
								},
							].map((category) => (
								<ButtonCategory
									key={category.name}
									name={category.name}
									imageUrl={category.imageUrl}
									onClick={() => console.log(`Click en ${category.name}`)}
								/>
							))}
						</div>
					</section>

					{/* Sección: Icons */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Iconos
						</h2>
						<div className="flex gap-6 items-center flex-wrap">
							<Discord className="w-12 h-12 text-primary" />
							<Discord className="w-16 h-16 text-secondary" />
							<Discord className="w-20 h-20 text-primary/60" />
							<span className="text-muted-foreground text-sm">
								Ícono Discord en diferentes tamaños
							</span>
						</div>
					</section>

					{/* Sección: Galería de Imágenes */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Galería de Imágenes
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
								'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
								'https://images.unsplash.com/photo-1495679274519-5e1dff10d3c5?w=500&h=300&fit=crop',
								'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
								'https://images.unsplash.com/photo-1516734712202-a552198e3e91?w=500&h=300&fit=crop',
								'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=500&h=300&fit=crop',
							].map((imgUrl, idx) => (
								<div
									key={imgUrl}
									className="aspect-video bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
								>
									<Image
										src={imgUrl}
										alt={`Imagen ${idx + 1}`}
										width={500}
										height={300}
										className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
									/>
								</div>
							))}
						</div>
					</section>

					{/* Sección: Formulario de Ejemplo */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Formulario Cuarenta (Componentes Reales)
						</h2>
						<p className="text-sm text-muted-foreground mb-5">
							Esta demo usa los mismos componentes y validación del módulo real
							de registro de Cuarenta.
						</p>

						<div className="space-y-4">
							<div className="px-6 py-8">
								<input
									type="text"
									value={teamNameDemo}
									onChange={(e) => {
										setTeamNameDemo(e.target.value);
									}}
									placeholder="Nombre del Equipo"
									className={`w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider placeholder-(--text-color-placeholder) focus:outline-none transition-colors ${
										teamNameDemo
											? 'text-(--text-color)'
											: 'text-(--text-color-placeholder)'
									}`}
								/>
								{formValidationDemo.errors?.teamName && (
									<p className="text-(--text-color-error) text-sm mt-2 px-1">
										{formValidationDemo.errors.teamName}
									</p>
								)}
							</div>

							<div className="grid gap-3 md:grid-cols-2">
								<div className="relative bg-input border border-border rounded-2xl px-4 py-3">
									<button
										type="button"
										onClick={() => {
											setActiveDropdownDemo((prev) =>
												prev === 'carrera' ? null : 'carrera'
											);
										}}
										className="w-full flex items-center justify-between text-sm"
									>
										<span className="flex items-center gap-2">
											<BookMarked className="w-4 h-4 text-muted-foreground" />
											{carreraDemo}
										</span>
										<ChevronDown className="w-4 h-4 text-muted-foreground" />
									</button>
									{activeDropdownDemo === 'carrera' && (
										<div className="absolute left-0 right-0 top-full mt-2 z-10 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
											{['Sistemas', 'Mecatrónica'].map((option) => (
												<button
													type="button"
													key={option}
													onClick={() => {
														setCarreraDemo(option);
														setActiveDropdownDemo(null);
													}}
													className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
												>
													{option}
												</button>
											))}
										</div>
									)}
								</div>

								<div className="relative bg-input border border-border rounded-2xl px-4 py-3">
									<button
										type="button"
										onClick={() => {
											setActiveDropdownDemo((prev) =>
												prev === 'payment' ? null : 'payment'
											);
										}}
										className="w-full flex items-center justify-between text-sm"
									>
										<span className="flex items-center gap-2">
											<CreditCard className="w-4 h-4 text-muted-foreground" />
											{paymentMethodDemo}
										</span>
										<ChevronDown className="w-4 h-4 text-muted-foreground" />
									</button>
									{activeDropdownDemo === 'payment' && (
										<div className="absolute left-0 right-0 top-full mt-2 z-10 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
											{['Efectivo', 'Transferencia'].map((option) => (
												<button
													type="button"
													key={option}
													onClick={() => {
														setPaymentMethodDemo(option);
														setActiveDropdownDemo(null);
													}}
													className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
												>
													{option}
												</button>
											))}
										</div>
									)}
								</div>
							</div>

							<ParticipantCard
								participant={participantsDemo[0]}
								index={0}
								isDropdownOpen={false}
								onDropdownToggle={() => {}}
								onFieldChange={(field, value) => {
									setParticipantsDemo((prev) => {
										const next: [Participant, Participant] = [
											{ ...prev[0] },
											{ ...prev[1] },
										];
										next[0][field] = value;
										return next;
									});
								}}
							/>
							<ParticipantCard
								participant={participantsDemo[1]}
								index={1}
								isDropdownOpen={false}
								onDropdownToggle={() => {}}
								onFieldChange={(field, value) => {
									setParticipantsDemo((prev) => {
										const next: [Participant, Participant] = [
											{ ...prev[0] },
											{ ...prev[1] },
										];
										next[1][field] = value;
										return next;
									});
								}}
							/>

							<div className="grid gap-3 md:grid-cols-2">
								<Button
									onClick={() => {
										console.log('Demo: ver grupos');
									}}
									className="w-full"
								>
									Ver grupos (Button)
								</Button>
								<SubmitButton
									validateForm={() => false}
									getRegistrationData={() => ({
										teamName: teamNameDemo,
										participants: {
											participant1: participantsDemo[0],
											participant2: participantsDemo[1],
										},
										carrera: carreraDemo,
										paymentMethod: paymentMethodDemo,
										turno: 'manana',
										timestamp: new Date().toISOString(),
									})}
								>
									Registrar equipo (SubmitButton)
								</SubmitButton>
							</div>
						</div>
					</section>

					{/* Sección: Colores y Tipografía */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Tipografía
						</h2>
						<div className="space-y-6">
							<div>
								<h1 className="text-4xl font-bold">Heading 1 - 4xl Bold</h1>
								<p className="text-muted-foreground text-sm mt-2">
									Uso: Títulos principales
								</p>
							</div>
							<div>
								<h2 className="text-3xl font-bold">Heading 2 - 3xl Bold</h2>
								<p className="text-muted-foreground text-sm mt-2">
									Uso: Subtítulos de sección
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-bold">Heading 3 - 2xl Bold</h3>
								<p className="text-muted-foreground text-sm mt-2">
									Uso: Encabezados de subsección
								</p>
							</div>
							<div>
								<p className="text-base">Texto base - regular</p>
								<p className="text-muted-foreground text-sm">
									Uso: Contenido principal
								</p>
							</div>
							<div>
								<p className="text-sm">Texto pequeño - small</p>
								<p className="text-muted-foreground text-xs">
									Uso: Descripciones, metadatos
								</p>
							</div>
						</div>
					</section>

					{/* Sección: Paleta de Colores */}
					<section className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							Paleta de Colores
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{[
								{ name: 'Primary', class: 'bg-primary', text: 'text-primary' },
								{
									name: 'Secondary',
									class: 'bg-secondary',
									text: 'text-secondary',
								},
								{
									name: 'Destructive',
									class: 'bg-destructive',
									text: 'text-destructive',
								},
								{
									name: 'Muted',
									class: 'bg-muted',
									text: 'text-muted-foreground',
								},
								{
									name: 'Card',
									class: 'bg-card border border-border',
									text: 'text-foreground',
								},
								{
									name: 'Input',
									class: 'bg-input border border-border',
									text: 'text-foreground',
								},
								{
									name: 'Background',
									class: 'bg-background border border-border',
									text: 'text-foreground',
								},
								{
									name: 'Foreground',
									class: 'bg-foreground',
									text: 'text-background',
								},
							].map((color) => (
								<div key={color.name} className="space-y-2">
									<div className={`w-full h-24 rounded-lg ${color.class}`} />
									<p className="font-semibold text-sm">{color.name}</p>
								</div>
							))}
						</div>
					</section>
				</div>

				{/* Footer */}
				<div className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
					<p>
						Documentación de Componentes • AECC UIDE •{' '}
						{new Date().getFullYear()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DocsPage;
