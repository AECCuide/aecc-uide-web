import * as Sentry from '@sentry/nextjs';

interface GlobalWithProcess {
	process?: {
		env?: {
			NEXT_RUNTIME?: string;
		};
	};
}

export async function register() {
	if (
		(globalThis as GlobalWithProcess).process?.env?.NEXT_RUNTIME === 'nodejs'
	) {
		await import('../sentry.server.config');
	}

	if ((globalThis as GlobalWithProcess).process?.env?.NEXT_RUNTIME === 'edge') {
		await import('../sentry.edge.config');
	}
}

export const onRequestError = Sentry.captureRequestError;
