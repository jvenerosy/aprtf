import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import validator from 'validator';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';
import { rateLimit, getClientIP } from '$lib/server/rateLimit';

export const prerender = false;

const endpoint = `${PUBLIC_HOST_API}/items/inscription_therapie`;

// Options de cookie sécurisées
const secureCookieOptions = {
	path: '/',
	maxAge: 60 * 60 * 24, // 24 heures
	httpOnly: true,
	secure: true,
	sameSite: 'strict' as const
};

// Schéma de validation final pour l'envoi
const finalValidationSchema = z.object({
	orientation: z.string().max(200).optional(),
	orienteby: z.string().max(200).optional(),
	demande: z.string().max(500).optional(),
	therapeute: z.string().max(200).optional(),
	family: z.string().max(1000).optional(),
	stranger: z.string().max(500).optional(),
	problem: z.string().max(2000).optional(),
	firstname: z.string().max(100).optional(),
	lastname: z.string().max(100).optional(),
	place: z.string().max(200).optional(),
	email: z.string().email().max(254).optional(),
	phone: z.string().max(20).optional(),
	address: z.string().max(300).optional(),
	postalcode: z.string().max(10).optional(),
	city: z.string().max(100).optional()
});

/** @type {import('./$types').Actions} */
export const actions = {
	step1: async ({ request, cookies }) => {
		// Rate limiting
		const clientIP = getClientIP(request);
		const rateLimitResult = rateLimit(`therapie:${clientIP}`, {
			windowMs: 15 * 60 * 1000,
			maxRequests: 10
		});

		if (!rateLimitResult.success) {
			const minutes = Math.ceil(rateLimitResult.resetIn / 60000);
			return fail(429, {
				error: `Trop de soumissions. Veuillez réessayer dans ${minutes} minutes.`,
				rateLimited: true
			});
		}

		try {
			cookies.set('therapie_form_data', JSON.stringify({}), secureCookieOptions);
			return {
				step: 2
			};
		} catch (error) {
			return {
				step: 1,
				error: "Erreur lors de l'initialisation"
			};
		}
	},
	step2: async ({ request, cookies }) => {
		const contactSchema = z.object({
			orientation: z
				.string({ required_error: 'Veuillez selectionner une réponse' })
				.nonempty({ message: 'Veuillez selectionner une réponse' })
				.max(200)
				.trim(),
			orienteby: z
				.string({ required_error: 'Le nom ne peut pas être vide' })
				.nonempty({ message: 'Le nom ne peut pas être vide' })
				.max(200)
				.trim(),
			demande: z
				.string({ required_error: 'Veuillez selectionner une réponse' })
				.nonempty({ message: 'Le nom ne peut pas être vide' })
				.max(500)
		});

		const form = Object.fromEntries(await request.formData());

		let sessionData = {};
		try {
			const sessionCookie = cookies.get('therapie_form_data');
			if (sessionCookie) {
				sessionData = JSON.parse(sessionCookie);
			}
		} catch (e) {
			sessionData = {};
		}

		try {
			contactSchema.parse(form);
			sessionData = Object.assign(sessionData, form);
			cookies.set('therapie_form_data', JSON.stringify(sessionData), secureCookieOptions);

			const { orientation, orienteby, demande, therapeute } = form;
			return {
				orientation,
				orienteby,
				demande,
				therapeute,
				answer: sessionData,
				step: 3
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { orientation, orienteby, demande, therapeute } = form;
			return {
				orientation,
				orienteby,
				demande,
				therapeute,
				answer: sessionData,
				step: 2,
				errors
			};
		}
	},
	step3: async ({ request, cookies }) => {
		const contactSchema = z.object({
			family: z
				.string({ required_error: 'Veuillez ajouter au moins une réponse' })
				.nonempty({ message: 'Veuillez ajouter au moins une réponse' })
				.max(1000)
				.trim()
		});

		const form = Object.fromEntries(await request.formData());

		let sessionData = {};
		try {
			const sessionCookie = cookies.get('therapie_form_data');
			if (sessionCookie) {
				sessionData = JSON.parse(sessionCookie);
			}
		} catch (e) {
			sessionData = {};
		}

		try {
			contactSchema.parse(form);
			sessionData = Object.assign(sessionData, form);
			cookies.set('therapie_form_data', JSON.stringify(sessionData), secureCookieOptions);

			const { family, stranger } = form;
			return {
				family,
				stranger,
				answer: sessionData,
				step: 4
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { family, stranger } = form;
			return {
				family,
				stranger,
				answer: sessionData,
				step: 3,
				errors
			};
		}
	},
	step4: async ({ request, cookies }) => {
		const contactSchema = z.object({
			problem: z
				.string({ required_error: 'Veuillez saisir une réponse' })
				.nonempty({ message: 'Veuillez saisir une réponse' })
				.max(2000)
				.trim(),
			firstname: z
				.string({ required_error: 'Le prénom ne peut pas être vide' })
				.nonempty({ message: 'Le prénom ne peut pas être vide' })
				.max(100)
				.trim(),
			lastname: z
				.string({ required_error: 'Le nom ne peut pas être vide' })
				.nonempty({ message: 'Le nom ne peut pas être vide' })
				.max(100)
				.trim(),
			place: z
				.string({ required_error: 'Veuillez saisir une réponse' })
				.nonempty({ message: 'Veuillez saisir une réponse' })
				.max(200)
				.trim(),
			email: z
				.string({ required_error: "L'email ne peut pas être vide" })
				.nonempty({ message: "L'email ne peut pas être vide" })
				.max(254)
				.trim()
				.email({ message: "L'adresse email doit être valide" }),
			phone: z
				.string({ required_error: 'Le numéro de téléphone ne peut pas être vide' })
				.nonempty({ message: 'Le numéro de téléphone ne peut pas être vide' })
				.max(20)
				.refine(validator.isMobilePhone, "Le numéro de téléphone n'est pas valide")
		});

		const form = Object.fromEntries(await request.formData());

		let sessionData = {};
		try {
			const sessionCookie = cookies.get('therapie_form_data');
			if (sessionCookie) {
				sessionData = JSON.parse(sessionCookie);
			}
		} catch (e) {
			sessionData = {};
		}

		try {
			contactSchema.parse(form);
			sessionData = Object.assign(sessionData, form);

			// Validation finale des données avant envoi
			const validatedData = finalValidationSchema.parse(sessionData);

			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${DIRECTUS_TOKEN}`
					},
					body: JSON.stringify(validatedData)
				});

				if (!response.ok) {
					throw new Error(`Erreur HTTP: ${response.status}`);
				}

				cookies.delete('therapie_form_data', { path: '/' });
			} catch (error) {
				const { problem, firstname, lastname, place, email, phone, address, postalcode, city } =
					form;
				return {
					problem,
					firstname,
					lastname,
					place,
					email,
					phone,
					address,
					postalcode,
					city,
					answer: sessionData,
					step: 4,
					etatSend: 'error',
					errors: {
						general: [
							"Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
						]
					}
				};
			}

			return {
				step: 5
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { problem, firstname, lastname, place, email, phone, address, postalcode, city } = form;
			return {
				problem,
				firstname,
				lastname,
				place,
				email,
				phone,
				address,
				postalcode,
				city,
				answer: sessionData,
				step: 4,
				errors
			};
		}
	}
};
