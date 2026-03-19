import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import validator from 'validator';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';
import { rateLimit, getClientIP } from '$lib/server/rateLimit';

export const prerender = false;

const endpoint = `${PUBLIC_HOST_API}/items/inscriptions_colloques`;

// Options de cookie sécurisées
const secureCookieOptions = {
	path: '/',
	maxAge: 3600,
	httpOnly: true,
	secure: true,
	sameSite: 'strict' as const
};

// Schéma de validation final pour l'envoi à Directus
const finalValidationSchema = z.object({
	slug: z.string().max(200).optional(),
	firstname: z.string().max(100).optional(),
	lastname: z.string().max(100).optional(),
	phone: z.string().max(20).optional(),
	email: z.string().email().max(254).optional(),
	address: z.string().max(300).optional(),
	postalCode: z.string().max(10).optional(),
	city: z.string().max(100).optional(),
	connu: z.string().max(200).optional(),
	handicap: z.string().max(50).optional(),
	handicapAdapt: z.array(z.string().max(100)).optional(),
	profession: z.string().max(200).optional(),
	etablissement: z.string().max(200).optional(),
	service: z.string().max(200).optional(),
	objectif: z.string().max(2000).optional(),
	level: z.string().max(100).optional(),
	connaissance: z.string().max(2000).optional(),
	context: z.array(z.string().max(100)).optional(),
	cadre: z.array(z.string().max(100)).optional(),
	finance: z.string().max(100).optional(),
	financeur: z.string().max(200).optional(),
	opco: z.string().max(200).optional()
});

// affichage des données
export const load = async ({ params }) => {
	const endpoint = `${PUBLIC_HOST_API}/items/colloques/${params.slug}`;

	const response = await fetch(endpoint);
	const data = await response.json();
	const donnees = data.data;

	donnees.description = md.render(donnees.description);
	donnees.tarifs = md.render(donnees.tarifs);
	donnees.administratif = md.render(donnees.administratif);
	donnees.animateurs = md.render(donnees.animateurs);
	donnees.public = md.render(donnees.public);
	donnees.modalite = md.render(donnees.modalite);

	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	donnees.date_debut = formatDate(donnees.date_debut);
	donnees.date_fin = formatDate(donnees.date_fin);

	return {
		colloque: donnees,
		slug: params.slug
	};
};

//validation du formulaire
/** @type {import('./$types').Actions} */
export const actions = {
	step1: async ({ request, cookies }) => {
		// Rate limiting: 10 soumissions par IP toutes les 15 minutes
		const clientIP = getClientIP(request);
		const rateLimitResult = rateLimit(`inscription:${clientIP}`, {
			windowMs: 15 * 60 * 1000,
			maxRequests: 10
		});

		if (!rateLimitResult.success) {
			const minutes = Math.ceil(rateLimitResult.resetIn / 60000);
			return fail(429, {
				error: `Trop de soumissions. Veuillez réessayer dans ${minutes} minutes.`,
				rateLimited: true,
				step: 1
			});
		}

		let answer = {};
		try {
			const cookieData = cookies.get('form_data');
			if (cookieData) {
				answer = JSON.parse(cookieData);
			}
		} catch {
			answer = {};
		}

		const contactSchemaStep1 = z.object({
			firstname: z
				.string({ required_error: 'Le prénom ne peut pas être vide' })
				.nonempty({ message: 'Le prénom ne peut pas être vide' })
				.max(100, { message: 'Le prénom est trop long' })
				.trim(),
			lastname: z
				.string({ required_error: 'Le nom ne peut pas être vide' })
				.nonempty({ message: 'Le nom ne peut pas être vide' })
				.max(100, { message: 'Le nom est trop long' })
				.trim(),
			phone: z
				.string({ required_error: 'Le numéro de téléphone est obligatoire' })
				.min(10, { message: "Le numéro de téléphone n'est pas valide" })
				.max(20, { message: "Le numéro de téléphone n'est pas valide" })
				.refine(validator.isMobilePhone, "Le numéro de téléphone n'est pas valide"),
			email: z
				.string({ required_error: "L'adresse email ne peut pas être vide" })
				.nonempty({ message: "L'adresse email ne peut pas être vide" })
				.max(254)
				.trim()
				.email({ message: "L'adresse email doit être valide" }),
			address: z
				.string({ required_error: "L'adresse ne peut pas être vide" })
				.nonempty({ message: "L'adresse ne peut pas être vide" })
				.max(300)
				.trim(),
			postalCode: z
				.string({ required_error: 'Le code postal est obligatoire' })
				.nonempty({ message: 'Le code postal est obligatoire' })
				.max(10)
				.trim(),
			city: z
				.string({ required_error: 'La ville ne peut pas être vide' })
				.nonempty({ message: 'La ville ne peut pas être vide' })
				.max(100)
				.trim()
		});

		const formStep1 = Object.fromEntries(await request.formData());
		try {
			contactSchemaStep1.parse(formStep1);
			answer = Object.assign(answer, formStep1);
			cookies.set('form_data', JSON.stringify(answer), secureCookieOptions);

			const { firstname, lastname, phone, email, address, postalCode, city } = formStep1;
			return {
				firstname,
				lastname,
				phone,
				email,
				address,
				postalCode,
				city,
				answer,
				step: 2
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { firstname, lastname, phone, email, address, postalCode, city } = formStep1;
			return {
				firstname,
				lastname,
				phone,
				email,
				address,
				postalCode,
				city,
				answer,
				step: 1,
				errors
			};
		}
	},
	step2: async ({ request, cookies }) => {
		let answer = {};
		try {
			const cookieData = cookies.get('form_data');
			if (cookieData) {
				answer = JSON.parse(cookieData);
			}
		} catch {
			answer = {};
		}

		const contactSchemaStep2 = z.object({
			connu: z
				.string({ required_error: 'Veuillez sélectionner une réponse' })
				.nonempty({ message: 'Veuillez sélectionner une réponse' })
				.max(200)
				.trim(),
			handicap: z
				.string({ required_error: 'Veuillez sélectionner une réponse' })
				.nonempty({ message: 'Veuillez sélectionner une réponse' })
				.max(50)
				.trim(),
			profession: z
				.string({ required_error: 'Veuillez renseigner votre profession' })
				.nonempty({ message: 'Veuillez renseigner votre profession' })
				.max(200)
				.trim(),
			etablissement: z
				.string({ required_error: 'Veuillez renseigner votre etablissement' })
				.nonempty({ message: 'Veuillez renseigner votre etablissement' })
				.max(200)
				.trim(),
			service: z
				.string({ required_error: 'Veuillez renseigner votre service' })
				.nonempty({ message: 'Veuillez renseigner votre service' })
				.max(200)
				.trim()
		});

		const formData = await request.formData();
		const handicapAdapt = formData.getAll('handicapAdapt') as string[];

		const formStep2 = Object.fromEntries(formData);
		try {
			contactSchemaStep2.parse(formStep2);
			answer = Object.assign(answer, formStep2);
			(answer as any).handicapAdapt = handicapAdapt;
			cookies.set('form_data', JSON.stringify(answer), secureCookieOptions);

			const { connu, profession, etablissement, service } = formStep2;
			return {
				connu,
				profession,
				etablissement,
				service,
				answer,
				step: 3
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { connu, profession, etablissement, service } = formStep2;
			return {
				connu,
				profession,
				etablissement,
				service,
				answer,
				step: 2,
				errors
			};
		}
	},
	step3: async ({ request, cookies }) => {
		let answer = {};
		try {
			const cookieData = cookies.get('form_data');
			if (cookieData) {
				answer = JSON.parse(cookieData);
			}
		} catch {
			answer = {};
		}

		const contactSchemaStep3 = z.object({
			objectif: z
				.string({ required_error: 'Le message ne peut pas être vide' })
				.nonempty({ message: 'Le message ne peut pas être vide' })
				.min(10, { message: 'Le message doit contenir au moins 10 caractères' })
				.max(2000, { message: 'Le message est trop long' })
				.trim(),
			level: z.string({ required_error: 'Veuillez sélectionner une réponse' }).max(100),
			connaissance: z
				.string({ required_error: 'Le message ne peut pas être vide' })
				.nonempty({ message: 'Le message ne peut pas être vide' })
				.min(10, { message: 'Le message doit contenir au moins 10 caractères' })
				.max(2000, { message: 'Le message est trop long' })
				.trim()
		});

		const formStep3 = Object.fromEntries(await request.formData());
		try {
			contactSchemaStep3.parse(formStep3);
			answer = Object.assign(answer, formStep3);
			cookies.set('form_data', JSON.stringify(answer), secureCookieOptions);

			const { objectif, number, connaissance } = formStep3;
			return {
				objectif,
				number,
				connaissance,
				answer,
				step: 4
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { objectif, number, connaissance } = formStep3;
			return {
				objectif,
				number,
				connaissance,
				step: 3,
				answer,
				errors
			};
		}
	},
	step4: async ({ request, cookies }) => {
		let answer = {};
		try {
			const cookieData = cookies.get('form_data');
			if (cookieData) {
				answer = JSON.parse(cookieData);
			}
		} catch {
			answer = {};
		}

		const contactSchemaStep4 = z.object({
			context: z.string({ required_error: 'Veuillez sélectionner au moins une réponse' }),
			cadre: z.string({ required_error: 'Veuillez sélectionner au moins une réponse' })
		});

		const formData = await request.formData();
		const context = formData.getAll('context') as string[];
		const cadre = formData.getAll('cadre') as string[];

		const formStep4 = Object.fromEntries(formData);
		try {
			contactSchemaStep4.parse(formStep4);
			answer = Object.assign(answer, formStep4);
			(answer as any).context = context;
			(answer as any).cadre = cadre;
			cookies.set('form_data', JSON.stringify(answer), secureCookieOptions);

			const { objectif, number, connaissance } = formStep4;
			return {
				objectif,
				number,
				connaissance,
				answer,
				step: 5
			};
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			const { objectif, number, connaissance } = formStep4;
			return {
				objectif,
				number,
				connaissance,
				step: 4,
				answer,
				errors
			};
		}
	},
	step5: async ({ request, cookies }) => {
		let answer = {};
		try {
			const cookieData = cookies.get('form_data');
			if (cookieData) {
				answer = JSON.parse(cookieData);
			}
		} catch {
			answer = {};
		}

		const formData = await request.formData();
		const formStep5 = Object.fromEntries(formData);

		answer = Object.assign(answer, formStep5);

		try {
			// Validation finale des données avant envoi à Directus
			const validatedData = finalValidationSchema.parse(answer);

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

			cookies.delete('form_data', { path: '/' });

			return {
				step: 6
			};
		} catch (error) {
			return {
				etatSend: 'error',
				step: 5
			};
		}
	}
};
