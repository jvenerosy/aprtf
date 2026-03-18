import { z } from 'zod';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_EMAIL, DIRECTUS_PASSWORD } from '$env/static/private';

const endpoint = `${PUBLIC_HOST_API}/items/contact`;
const authEndpoint = `${PUBLIC_HOST_API}/auth/login`;

// Fonction pour obtenir un token d'accès Directus
async function getDirectusToken() {
    try {
        const response = await fetch(authEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: DIRECTUS_EMAIL,
                password: DIRECTUS_PASSWORD,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur d'authentification: ${response.status}`);
        }

        const data = await response.json();
        return data.data.access_token;
    } catch (error) {
        console.error('Erreur lors de l\'authentification Directus:', error);
        throw error;
    }
}

const contactSchema = z.object({
	firstname: z
		.string()
        .nonempty({ message: 'Le prénom ne peut pas être vide' })
		.trim(),
	lastname: z
		.string()
        .nonempty({ message: 'Le nom ne peut pas être vide' })
		.trim(),
	raison: z
		.string({ required_error: 'La raison est obligatoire' }),
	email: z
		.string()
        .nonempty({ message: 'L\'adresse email ne peut pas être vide' })
		.trim()
		.email({ message: 'L\'adresse email doit être valide' }),
	message: z
		.string()
        .nonempty({ message: 'Le message ne peut pas être vide' })
		.min(10, { message: 'Le message doit contenir au moins 10 caractères' })
		.trim()
});

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const formData = Object.fromEntries(await request.formData());
		try {
			const result = contactSchema.parse(formData);
			try {
				// Obtenir le token d'authentification
				const token = await getDirectusToken();
				
				const response = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
					body: JSON.stringify(result),
				});

				if (!response.ok) {
					throw new Error(`Erreur HTTP: ${response.status}`);
				}
				
			} catch (error) {
				console.error('Erreur lors de la création du contact :', error);
				return {
					etatSend: "error"
				}
			}
            return {
                success: true,
            }
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
            console.log(errors);
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