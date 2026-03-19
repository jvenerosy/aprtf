import { z } from 'zod';
import validator from 'validator';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_TOKEN } from '$env/static/private';

export const prerender = false;

const endpoint = `${PUBLIC_HOST_API}/items/inscription_therapie`;

//validation du formulaire
/** @type {import('./$types').Actions} */
export const actions = {
    step1: async ({request, cookies}) => {
        try {
            // Initialiser la session
            cookies.set('therapie_form_data', JSON.stringify({}), {
                path: '/',
                maxAge: 60 * 60 * 24 // 24 heures
            });
            return {
                step: 2
            };
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de la session:', error);
            return {
                step: 1,
                error: 'Erreur lors de l\'initialisation'
            };
        }
    },
    step2: async ({request, cookies}) => {
        const contactSchema = z.object({
            orientation: z
                .string({ required_error: 'Veuillez selectionner une réponse' })
                .nonempty({ message: 'Veuillez selectionner une réponse' })
                .trim(),
            orienteby: z
                .string({ required_error: 'Le nom ne peut pas être vide' })
                .nonempty({ message: 'Le nom ne peut pas être vide' })
                .trim(),
            demande: z
                .string({ required_error: 'Veuillez selectionner une réponse' })
                .nonempty({ message: 'Le nom ne peut pas être vide' })
        });
        
        const form = Object.fromEntries(await request.formData());
        
        // Récupérer les données de session
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
            const result = contactSchema.parse(form);
            // Mettre à jour les données de session
            sessionData = Object.assign(sessionData, form);
            cookies.set('therapie_form_data', JSON.stringify(sessionData), {
                path: '/',
                maxAge: 60 * 60 * 24
            });

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
    step3: async ({request, cookies}) => {
        const contactSchema = z.object({
            family: z
                .string({ required_error: 'Veuillez ajouter au moins une réponse' })
                .nonempty({ message: 'Veuillez ajouter au moins une réponse' })
                .trim(),
        });
        
        const form = Object.fromEntries(await request.formData());
        
        // Récupérer les données de session
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
            const result = contactSchema.parse(form);
            // Mettre à jour les données de session
            sessionData = Object.assign(sessionData, form);
            cookies.set('therapie_form_data', JSON.stringify(sessionData), {
                path: '/',
                maxAge: 60 * 60 * 24
            });

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
    step4: async ({request, cookies}) => {
        const contactSchema = z.object({
            problem: z
                .string({ required_error: 'Veuillez saisir une réponse' })
                .nonempty({ message: 'Veuillez saisir une réponse' })
                .trim(),
            firstname: z
                .string({ required_error: 'Le prénom ne peut pas être vide' })
                .nonempty({ message: 'Le prénom ne peut pas être vide' })
                .trim(),
            lastname: z
                .string({ required_error: 'Le nom ne peut pas être vide' })
                .nonempty({ message: 'Le nom ne peut pas être vide' })
                .trim(),
            place: z
                .string({ required_error: 'Veuillez saisir une réponse' })
                .nonempty({ message: 'Veuillez saisir une réponse' })
                .trim(),
            email: z
                .string({ required_error: 'L\'email ne peut pas être vide' })
                .nonempty({ message: 'L\'email ne peut pas être vide' })
                .trim()
                .email({ message: 'L\'adresse email doit être valide' }),
            phone: z
                .string({ required_error: 'Le numéro de téléphone ne peut pas être vide' })
                .nonempty({ message: 'Le numéro de téléphone ne peut pas être vide' })
                .refine(validator.isMobilePhone, 'Le numéro de téléphone n\'est pas valide'),
        });
        
        const form = Object.fromEntries(await request.formData());
        
        // Récupérer les données de session
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
            const result = contactSchema.parse(form);
            // Mettre à jour les données de session avec les dernières données
            sessionData = Object.assign(sessionData, form);

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${DIRECTUS_TOKEN}`,
                    },
                    body: JSON.stringify(sessionData),
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                // Nettoyer la session
                cookies.delete('therapie_form_data', { path: '/' });
                
            } catch (error) {
                console.error('Erreur lors de la création de l\'inscription :', error);
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
                    etatSend: "error",
                    errors: {
                        general: ['Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.']
                    }
                }
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