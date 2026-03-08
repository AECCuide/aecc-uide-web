'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, MessageCircle, ArrowRight } from 'lucide-react';
import { CardData } from '@/components/ui/card';
import Image from 'next/image';

interface SubjectDetailsModalProps {
	subject: CardData | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function SubjectDetailsModal({
	subject,
	isOpen,
	onClose,
}: SubjectDetailsModalProps) {
	if (!subject) return null;

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
							className="w-full max-w-2xl bg-(--card) border border-(--border) rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:flex-row"
						>
							{/* Close Button */}
							<button
								type="button"
								onClick={onClose}
								className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md"
								aria-label="Cerrar modal"
							>
								<X size={20} />
							</button>

							{/* Image Section (Left on desktop, Top on mobile) */}
							<div className="w-full md:w-2/5 h-48 md:h-auto relative">
								{subject.image && (
									<Image
										src={subject.image as string}
										alt={subject.title || 'Materia'}
										fill
										className="object-cover"
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/10 md:to-(--card) border-r border-(--border)/30" />
								<div className="absolute bottom-4 left-4 md:hidden">
									<h3 className="text-2xl font-bold text-white shadow-sm">
										{subject.title}
									</h3>
								</div>
							</div>

							{/* Content Section (Right on desktop, Bottom on mobile) */}
							<div
								className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between"
								style={{ backgroundColor: 'var(--card)' }}
							>
								<div>
									<h3 className="hidden md:block text-3xl font-bold mb-2 text-(--foreground)">
										{subject.title}
									</h3>

									<div className="flex gap-2 mb-6">
										<span className="bg-(--primary)/10 text-(--primary) px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
											{subject.badge || 'Tutoría'}
										</span>
									</div>

									<p className="text-(--muted-foreground) mb-8 leading-relaxed">
										{subject.description}
									</p>

									{/* Info Items List */}
									<div className="space-y-4 mb-8">
										<motion.div
											whileHover={{ x: 5 }}
											className="flex items-center gap-4 p-3 rounded-xl bg-(--muted)/30 hover:bg-(--muted)/50 transition-colors"
										>
											<div className="p-2 bg-(--primary)/10 text-(--primary) rounded-lg">
												<User size={18} />
											</div>
											<div>
												<p className="text-xs text-(--text-color-secondary) uppercase tracking-wider font-semibold">
													Tutor
												</p>
												<p className="font-medium text-(--foreground)">
													Por asignar
												</p>
											</div>
										</motion.div>

										<motion.div
											whileHover={{ x: 5 }}
											className="flex items-center gap-4 p-3 rounded-xl bg-(--muted)/30 hover:bg-(--muted)/50 transition-colors"
										>
											<div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
												<Calendar size={18} />
											</div>
											<div>
												<p className="text-xs text-(--text-color-secondary) uppercase tracking-wider font-semibold">
													Días que da clases
												</p>
												<p className="font-medium text-(--foreground)">
													Martes y Jueves (Provisional)
												</p>
											</div>
										</motion.div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
									<motion.a
										href="https://discord.gg/HYcaWtb6"
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex items-center justify-center gap-2 py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium transition-colors"
									>
										<MessageCircle size={18} />
										<span>Unirme a Discord</span>
									</motion.a>

									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex items-center justify-center gap-2 py-3 px-4 bg-(--primary) hover:opacity-90 font-bold rounded-xl transition-all shadow-sm"
										style={{ color: 'var(--background)' }}
									>
										<span>Registrarme</span>
										<ArrowRight size={18} />
									</motion.button>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
