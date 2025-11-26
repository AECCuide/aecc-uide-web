'use client';

import React from 'react';
import { Button } from '@/components/ui/buttom';
import { RegistrationData } from '../types/registration';
import {
	useCuarentaRegistration,
	SubmissionStatus,
} from '../hooks/useCuarentaRegistration';

interface SubmitButtonProps {
	validateForm: () => boolean;
	getRegistrationData: () => RegistrationData;
	children: React.ReactNode;
}

export default function SubmitButton({
	validateForm,
	getRegistrationData,
	children,
}: SubmitButtonProps) {
	const { status, isSubmitting, handleRegistration } = useCuarentaRegistration({
		validateForm,
		getRegistrationData,
	});

	const getButtonContent = (status: SubmissionStatus) => {
		switch (status) {
			case 'submitting':
				return 'Enviando...';
			case 'success':
				return '¡Registrado!';
			case 'error':
				return 'Inténtalo de nuevo';
			default:
				return children;
		}
	};

	return (
		<div className="pt-6 pb-8 relative">
			<Button
				onClick={handleRegistration}
				className="w-full py-4 rounded-2xl font-medium shadow-lg transform active:scale-95 duration-150 disabled:opacity-50 disabled:cursor-not-allowed ronded-lg"
				disabled={isSubmitting || status === 'success'}
			>
				{getButtonContent(status)}
			</Button>
		</div>
	);
}
