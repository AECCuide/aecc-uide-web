// ParticipantCard.tsx
'use client';

import React from 'react';
import { Users, Phone, ChevronDown, School } from 'lucide-react';

// --- Constants ---
const COURSES = [
	'1ro BGU A',
	'1ro BGU B',
	'2do BGU A',
	'2do BGU B',
	'3ro BGU A',
	'3ro BGU B',
];

// --- Types ---
export interface Participant {
	name: string;
	course: string;
	phone: string;
}

interface ParticipantCardProps {
	participant: Participant;
	index: number;
	isDropdownOpen: boolean;
	onFieldChange: (field: keyof Participant, value: string) => void;
	onDropdownToggle: () => void;
}

// --- Reusable Sub-components ---
const FormField = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-zinc-800/40 rounded-2xl px-5 py-5">{children}</div>
);

const Dropdown = ({
	options,
	value,
	placeholder,
	isOpen,
	onToggle,
	onSelect,
}: {
	options: readonly string[];
	value: string;
	placeholder: string;
	isOpen: boolean;
	onToggle: () => void;
	onSelect: (value: string) => void;
}) => (
	<div className="relative w-full">
		<button
			onClick={onToggle}
			className="w-full text-left bg-transparent text-base focus:outline-none flex items-center justify-between"
		>
			<span
				className={`truncate ${value ? 'text-stone-100' : 'text-stone-400'}`}
			>
				{value || placeholder}
			</span>
			<ChevronDown className="w-5 h-5 shrink-0 text-stone-400" />
		</button>
		{isOpen && (
			<div className="absolute left-0 right-0 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
				{options.map((option) => (
					<button
						key={option}
						onClick={() => {
							onSelect(option);
						}}
						className="w-full px-4 py-3 text-left text-stone-100 text-base hover:text-stone-400 transition-colors"
					>
						{option}
					</button>
				))}
			</div>
		)}
	</div>
);

const InputField = ({
	icon: Icon,
	value,
	onChange,
	placeholder,
	type = 'text',
}: {
	icon: React.ElementType;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	type?: string;
}) => (
	<div className="flex items-center gap-3">
		<Icon className="w-6 h-6 text-stone-400 shrink-0" />
		<input
			type={type}
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
			placeholder={placeholder}
			className="w-full bg-transparent text-stone-100 text-base focus:outline-none placeholder-stone-500"
		/>
	</div>
);

// --- Main Component ---
export default function ParticipantCard({
	participant,
	index,
	isDropdownOpen,
	onFieldChange,
	onDropdownToggle,
}: ParticipantCardProps) {
	return (
		<FormField>
			<div className="space-y-5 ">
				<div className="flex items-center gap-4 ">
					<div className="flex items-center gap-3 w-full">
						<InputField
							icon={Users}
							value={participant.name}
							onChange={(value) => {
								onFieldChange('name', value);
							}}
							placeholder={`Nombre de la pareja ${(index + 1).toString()}`}
						/>
					</div>
					<div className="flex items-center gap-3 w-full">
						<InputField
							icon={Phone}
							value={participant.phone}
							onChange={(value) => {
								onFieldChange('phone', value);
							}}
							placeholder="Celular"
							type="tel"
						/>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<School className="w-6 h-6 text-stone-400 shrink-0" />
					<Dropdown
						options={COURSES}
						value={participant.course}
						placeholder={`Curso de la pareja ${(index + 1).toString()}`}
						isOpen={isDropdownOpen}
						onToggle={onDropdownToggle}
						onSelect={(value) => {
							onFieldChange('course', value);
							onDropdownToggle();
						}}
					/>
				</div>
			</div>
		</FormField>
	);
}
