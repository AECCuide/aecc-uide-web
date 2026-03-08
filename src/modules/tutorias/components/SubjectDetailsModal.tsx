'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { CardData } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/buttom';
import { Discord } from '@/components/ui/discord';

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
							className="w-full max-w-2xl bg-(--card) rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:flex-row"
						>
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
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/10 md:to-(--card)" />
								<div className="absolute bottom-4 left-4 md:hidden">
									<h3 className="text-2xl font-bold text-white shadow-sm">
										{subject.title}
									</h3>
								</div>
							</div>

							{/* Content Section (Right on desktop, Bottom on mobile) */}
							<div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between bg-(--card)">
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
										<div className="flex items-center gap-4 transition-colors">
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
										</div>

										<div className="flex items-center gap-4 transition-colors">
											<div className="p-2 bg-(--primary)/10 text-(--primary) rounded-lg">
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
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
									<a
										href="https://discord.gg/HYcaWtb6"
										target="_blank"
										rel="noopener noreferrer"
										className="w-full block"
									>
										<Button
											variant="default"
											className="w-full bg-[#5865F2] text-white hover:bg-[#4752C4] hover:text-white border-none"
											lefticon={<Discord className="w-5 h-5 flex-shrink-0" />}
										>
											Discord
										</Button>
									</a>

									<Button
										variant="default"
										className="w-full font-bold bg-(--primary) text-(--background) hover:opacity-90"
										rightIcon={<ArrowRight size={18} />}
									>
										Registrarme
									</Button>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
