import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';
import { rateLimit, getClientIP } from '$lib/server/rateLimit';

export const prerender = false;

const endpoint = `${PUBLIC_HOST_API}/items/contact`;

const contactSchema = z.object({
	firstname: z
		.string()
		.nonempty({ message: 'Le prénom ne peut pas être vide' })
		.max(100, { message: 'Le prénom est trop long' })
		.trim(),
	lastname: z
		.string()
		.nonempty({ message: 'Le nom ne peut pas être vide' })
		.max(100, { message: 'Le nom est trop long' })
		.trim(),
	raison: z
		.string({ required_error: 'La raison est obligatoire' })
		.max(200, { message: 'La raison est trop longue' }),
	email: z
		.string()
		.nonempty({ message: "L'adresse email ne peut pas être vide" })
		.max(254, { message: "L'email est trop long" })
		.trim()
		.email({ message: "L'adresse email doit être valide" }),
	message: z
		.string()
		.nonempty({ message: 'Le message ne peut pas être vide' })
		.min(10, { message: 'Le message doit contenir au moins 10 caractères' })
		.max(5000, { message: 'Le message est trop long (5000 caractères max)' })
		.trim()
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// Rate limiting: 5 soumissions par IP toutes les 15 minutes
		const clientIP = getClientIP(request);
		const rateLimitResult = rateLimit(`contact:${clientIP}`, {
			windowMs: 15 * 60 * 1000,
			maxRequests: 5
		});

		if (!rateLimitResult.success) {
			const minutes = Math.ceil(rateLimitResult.resetIn / 60000);
			return fail(429, {
				error: `Trop de soumissions. Veuillez réessayer dans ${minutes} minutes.`,
				rateLimited: true
			});
		}

		const formData = Object.fromEntries(await request.formData());
		try {
			const result = contactSchema.parse(formData);
			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${DIRECTUS_TOKEN}`
					},
					body: JSON.stringify(result)
				});

				if (!response.ok) {
					throw new Error(`Erreur HTTP: ${response.status}`);
				}
			} catch (error) {
				return {
					etatSend: 'error'
				};
			}
			return {
				success: true
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { firstname, lastname, raison, email, message } = formData;
			return {
				firstname,
				lastname,
				raison,
				email,
				message,
				errors
			};
		}
	}
};
