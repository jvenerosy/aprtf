import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// Content Security Policy
	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' https://acceslibre.beta.gouv.fr https://analytics.jvnr.fr https://cdn.brevo.com",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' https://fonts.gstatic.com",
			"img-src 'self' data: https: blob:",
			"frame-src 'self' https://www.google.com https://acceslibre.beta.gouv.fr",
			"connect-src 'self' https://api.aprtf.jvnr.fr https://aprtf.jvnr.fr https://analytics.jvnr.fr https://cdn.brevo.com",
			"object-src 'none'",
			"base-uri 'self'"
		].join('; ')
	);

	// HSTS - only in production
	if (event.url.protocol === 'https:') {
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	}

	return response;
};
