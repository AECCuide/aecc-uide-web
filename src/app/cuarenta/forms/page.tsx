'use client';

import { useState } from 'react';
import { Users, Phone, CreditCard, ChevronDown, School } from 'lucide-react';

export default function TeamRegistration() {
	const [teamName, setTeamName] = useState('');
	const [participant1Name, setParticipant1Name] = useState('');
	const [participant1Course, setParticipant1Course] = useState('');
	const [participant2Name, setParticipant2Name] = useState('');
	const [participant2Course, setParticipant2Course] = useState('');
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('Efectivo');
	const [showCourse1Dropdown, setShowCourse1Dropdown] = useState(false);
	const [showCourse2Dropdown, setShowCourse2Dropdown] = useState(false);
	const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

	const courses = [
		'1ro BGU A',
		'1ro BGU B',
		'2do BGU A',
		'2do BGU B',
		'3ro BGU A',
		'3ro BGU B',
	];

	const paymentMethods = ['Efectivo', 'Transferencia'];

	return (
		<div className="min-h-screen bg-linear-to-b from-zinc-900 via-neutral-900 to-stone-900 p-0">
			<div className="max-w-2xl mx-auto">
				{/* Team Name Input */}
				<div className="px-6 py-8">
					<input
						type="text"
						value={teamName}
						onChange={(e) => {
							setTeamName(e.target.value);
						}}
						placeholder="Nombre del Equipo"
						className="w-full bg-transparent border-none text-3xl md:text-4xl font-bold tracking-wider text-stone-400 placeholder-stone-600 focus:outline-none"
					/>
				</div>

				{/* Main Content */}
				<div className="px-6 py-6 space-y-6">
					{/* Participants Section */}
					<div>
						<h3 className="text-stone-500 text-sm font-medium mb-3 px-1">
							Participantes
						</h3>

						<div className="space-y-2">
							{/* Participant 1 */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-4">
								<div className="flex items-center gap-3 mb-3">
									<Users className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
									<input
										type="text"
										value={participant1Name}
										onChange={(e) => {
											setParticipant1Name(e.target.value);
										}}
										placeholder="Nombre de la pareja 1"
										className="w-full bg-transparent text-stone-400 text-base focus:outline-none placeholder-stone-500"
									/>
									<Phone className="w-10 h-10 text-stone-500" />
									<input
										type="tel"
										value={phone1}
										onChange={(e) => {
											setPhone1(e.target.value);
										}}
										placeholder="Teléfono"
										className="w-full bg-transparent text-stone-400 text-base focus:outline-none placeholder-stone-500"
									/>
								</div>
								<div className="flex items-center gap-3 mb-3">
									<School className="w-5 h-5 text-stone-500" />
									<div className="relative">
										<button
											onClick={() => {
												setShowCourse1Dropdown(!showCourse1Dropdown);
											}}
											className="w-full text-left bg-transparent text-stone-500 text-base focus:outline-none flex items-center justify-between"
										>
											<span>
												{participant1Course || 'Curso de la pareja 1'}
											</span>
											<ChevronDown className="w-4 h-4" />
										</button>
										{showCourse1Dropdown && (
											<div className="absolute left-0 right-0 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
												{courses.map((course) => (
													<button
														key={course}
														onClick={() => {
															setParticipant1Course(course);
															setShowCourse1Dropdown(false);
														}}
														className="w-full px-4 py-2.5 text-left text-stone-300 text-base hover:bg-zinc-700 transition-colors"
													>
														{course}
													</button>
												))}
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Participant 2 */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-4">
								<div className="flex items-center gap-3 mb-3">
									<Users className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
									<input
										type="text"
										value={participant2Name}
										onChange={(e) => {
											setParticipant2Name(e.target.value);
										}}
										placeholder="Nombre de la pareja 2"
										className="w-full bg-transparent text-stone-400 text-base focus:outline-none placeholder-stone-500"
									/>
									<Phone className="w-10 h-10 text-stone-500" />
									<input
										type="tel"
										value={phone2}
										onChange={(e) => {
											setPhone2(e.target.value);
										}}
										placeholder="Teléfono"
										className="w-full bg-transparent text-stone-400 text-base focus:outline-none placeholder-stone-500"
									/>
								</div>

								<div className="flex items-center gap-3 mb-3">
									<School className="w-5 h-5 text-stone-500" />
									<div className="relative">
										<button
											onClick={() => {
												setShowCourse2Dropdown(!showCourse2Dropdown);
											}}
											className="w-full text-left bg-transparent text-stone-500 text-base focus:outline-none flex items-center justify-between"
										>
											<span>
												{participant2Course || 'Curso de la pareja 2'}
											</span>
											<ChevronDown className="w-4 h-4" />
										</button>
										{showCourse2Dropdown && (
											<div className="absolute left-0 right-0 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
												{courses.map((course) => (
													<button
														key={course}
														onClick={() => {
															setParticipant2Course(course);
															setShowCourse2Dropdown(false);
														}}
														className="w-full px-4 py-2.5 text-left text-stone-300 text-base hover:bg-zinc-700 transition-colors"
													>
														{course}
													</button>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Registration Info Section */}
					<div>
						<h3 className="text-stone-500 text-sm font-medium mb-3 px-1">
							Información del registro
						</h3>

						<div className="space-y-2">
							{/* Payment Method */}
							<div className="bg-zinc-800/40 rounded-2xl px-4 py-3.5 hover:bg-zinc-800/60 transition-colors relative">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<CreditCard className="w-5 h-5 text-stone-500" />
										<span className="text-stone-400 text-base">
											Método de pago
										</span>
									</div>
									<button
										onClick={() => {
											setShowPaymentDropdown(!showPaymentDropdown);
										}}
										className="flex items-center gap-2 text-stone-500 text-base"
									>
										<span>{paymentMethod}</span>
										<ChevronDown className="w-4 h-4" />
									</button>
								</div>
								{showPaymentDropdown && (
									<div className="absolute right-4 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 min-w-[140px]">
										{paymentMethods.map((method) => (
											<button
												key={method}
												onClick={() => {
													setPaymentMethod(method);
													setShowPaymentDropdown(false);
												}}
												className="w-full px-4 py-2.5 text-left text-stone-300 text-base hover:bg-zinc-700 transition-colors"
											>
												{method}
											</button>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="pt-6 pb-8">
						<button
							onClick={() => {
								const registrationData = {
									teamName,
									participants: {
										participant1: {
											name: participant1Name,
											course: participant1Course,
											phone: phone1,
										},
										participant2: {
											name: participant2Name,
											course: participant2Course,
											phone: phone2,
										},
									},
									paymentMethod,
								};
								console.log('Registration Data:', registrationData);
								alert(
									'Registro completado! Revisa la consola para ver los datos.'
								);
							}}
							className="w-full py-4 bg-white text-stone-900 rounded-2xl font-medium hover:bg-stone-100 transition-colors shadow-lg"
						>
							Registrar equipo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
