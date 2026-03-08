'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CardData } from '@/components/ui/card';
import Image from 'next/image';

interface ComidaDetailsModalProps {
	comida: CardData | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function ComidaDetailsModal({
	comida,
	isOpen,
	onClose,
}: ComidaDetailsModalProps) {
	if (!comida) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
					/>

					{/* Modal Container */}
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							className="w-full max-w-2xl bg-(--card) rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:flex-row"
						>
							{/* Image Section (Left on desktop, Top on mobile) */}
							<div className="w-full md:w-2/5 h-48 md:h-auto relative">
								{comida.image && (
									<Image
										src={comida.image as string}
										alt={comida.title || 'Comida'}
										fill
										className="object-cover"
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/10 md:to-(--card)" />
								<div className="absolute bottom-4 left-4 md:hidden">
									<h3 className="text-2xl font-bold text-white shadow-sm">
										{comida.title}
									</h3>
								</div>
							</div>

							{/* Content Section (Right on desktop, Bottom on mobile) */}
							<div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col bg-(--card)">
								<div>
									<h3 className="hidden md:block text-3xl font-bold mb-2 text-(--foreground)">
										{comida.title}
									</h3>

									{comida.badge && (
										<div className="flex gap-2 mb-4">
											<span className="bg-(--primary)/10 text-(--primary) px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
												{comida.badge}
											</span>
										</div>
									)}

									{comida.provider && (
										<div className="text-(--muted-foreground) text-sm font-medium mb-4">
											{comida.provider}
										</div>
									)}

									<p className="text-(--muted-foreground) mb-6 leading-relaxed">
										{comida.description}
									</p>

									{comida.tags && comida.tags.length > 0 && (
										<div className="flex gap-2 mb-4 flex-wrap">
											{comida.tags.map((tag, index) => (
												<span
													// biome-ignore lint/suspicious/noArrayIndexKey: tags array order is static and can contain duplicate strings
													key={`${tag}-${index}`}
													className="bg-(--color-accent) text-(--color-accent-foreground) px-3 py-1 rounded-full text-xs font-medium"
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
