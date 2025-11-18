'use client';

import React, { useEffect, useRef } from 'react';
import { Users, Phone, ChevronDown, School } from 'lucide-react';

// --- Constants ---
const COURSES = [
	'1ro A',
	'1ro B',
	'1ro C',
	'2do A',
	'2do B',
	'3ro A',
	'3ro B',
	'4to A',
	'4to B',
	'5to A',
];

// Estilos globales centralizados
const StylesTextForms = {
	icon: 'w-6 h-6 shrink-0 text-stone-400',
	text: 'text-stone-100',
	textSecondary: 'text-stone-400',
	placeholder: 'placeholder-stone-400',
	textSize: 'text-base',
	input: 'w-full bg-transparent focus:outline-none',
	container: 'flex items-center gap-3',
} as const;

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

interface DropdownProps {
	options: readonly string[];
	value: string;
	placeholder: string;
	isOpen: boolean;
	onToggle: () => void;
	onSelect: (value: string) => void;
}

const Dropdown = ({
	options,
	value,
	placeholder,
	isOpen,
	onToggle,
	onSelect,
}: DropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	return (
		<div className="relative w-full" ref={dropdownRef}>
			<button
				onClick={onToggle}
				className={`w-full text-left bg-transparent ${StylesTextForms.textSize} focus:outline-none flex items-center justify-between`}
			>
				<span
					className={`truncate ${value ? StylesTextForms.text : StylesTextForms.textSecondary}`}
				>
					{value || placeholder}
				</span>
				<ChevronDown
					className={`w-5 h-5 shrink-0 ${StylesTextForms.textSecondary}`}
				/>
			</button>
			{isOpen && (
				<div className="absolute left-0 right-0 top-full mt-2 bg-zinc-800 rounded shadow-lg overflow-hidden z-10 max-h-48 overflow-y-auto">
					{options.map((option) => (
						<button
							key={option}
							onClick={() => {
								onSelect(option);
							}}
							className={`w-full px-4 py-3 text-left ${StylesTextForms.text} ${StylesTextForms.textSize} hover:${StylesTextForms.textSecondary} transition-colors`}
						>
							{option}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

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
	<div className={StylesTextForms.container}>
		<Icon className={StylesTextForms.icon} />
		<input
			type={type}
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
			placeholder={placeholder}
			className={`${StylesTextForms.input} ${StylesTextForms.text} ${StylesTextForms.textSize} ${StylesTextForms.placeholder}`}
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
	const pairNumber = index + 1;

	return (
		<FormField>
			<div className="space-y-5">
				<div className="flex items-center gap-4">
					<InputField
						icon={Users}
						value={participant.name}
						onChange={(value) => {
							onFieldChange('name', value);
						}}
						placeholder={`Nombre de la pareja ${String(pairNumber)}`}
					/>
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
				<div className={StylesTextForms.container}>
					<School className={StylesTextForms.icon} />
					<Dropdown
						options={COURSES}
						value={participant.course}
						placeholder={`Curso de la pareja ${String(pairNumber)}`}
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
