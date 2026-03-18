import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();
import { z } from 'zod';
import validator from 'validator';
import { PUBLIC_HOST_API } from '$env/static/public';
import { DIRECTUS_EMAIL, DIRECTUS_PASSWORD } from '$env/static/private';

const endpoint = `${PUBLIC_HOST_API}/items/inscriptions_colloques`;
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
        return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
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
    step1: async ({request, cookies}) => {
        let answer = JSON.parse(cookies.get('form_data') || '{}');
        const contactSchemaStep1 = z.object({
            firstname: z
                .string({ required_error: 'Le prénom ne peut pas être vide' })
                .nonempty({ message: 'Le prénom ne peut pas être vide' })
                .trim(),
            lastname: z
                .string({ required_error: 'Le nom ne peut pas être vide' })
                .nonempty({ message: 'Le nom ne peut pas être vide' })
                .trim(),
            phone: z
                .string({ required_error: 'Le numéro de téléphone est obligatoire' })
                .min(10, {message: 'Le numéro de téléphone n\'est pas valide'})
                .refine(validator.isMobilePhone, 'Le numéro de téléphone n\'est pas valide'),
            email: z
                .string({ required_error: 'L\'adresse email ne peut pas être vide' })
                .nonempty({ message: 'L\'adresse email ne peut pas être vide' })
                .trim()
                .email({ message: 'L\'adresse email doit être valide' }),
            address: z
                .string({ required_error: 'L\'adresse ne peut pas être vide' })
                .nonempty({ message: 'L\'adresse ne peut pas être vide' })
                .trim(),
            postalCode: z
                .string({ required_error: 'Le code postal est obligatoire' })
                .nonempty({ message: 'Le code postal est obligatoire' })
                .trim(),
            city: z
                .string({ required_error: 'La ville ne peut pas être vide' })
                .nonempty({ message: 'La ville ne peut pas être vide' })
                .trim(),
        });
        
        const formStep1 = Object.fromEntries(await request.formData());
        try {
            const result = contactSchemaStep1.parse(formStep1);
            answer = Object.assign(answer, formStep1);
            cookies.set('form_data', JSON.stringify(answer), { path: '/', maxAge: 3600 });
            console.log(answer);

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
            console.log(errors);
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
    step2: async ({request, cookies}) => {
        let answer = JSON.parse(cookies.get('form_data') || '{}');
        const contactSchemaStep2 = z.object({
            connu: z
                .string({ required_error: 'Veuillez sélectionner une réponse' })
                .nonempty({ message: 'Veuillez sélectionner une réponse' })
                .trim(),
            handicap: z
                .string({ required_error: 'Veuillez sélectionner une réponse' })
                .nonempty({ message: 'Veuillez sélectionner une réponse' })
                .trim(),
            profession: z
                .string({ required_error: 'Veuillez renseigner votre profession' })
                .nonempty({ message: 'Veuillez renseigner votre profession' })
                .trim(),
            etablissement: z
                .string({ required_error: 'Veuillez renseigner votre etablissement' })
                .nonempty({ message: 'Veuillez renseigner votre etablissement' })
                .trim(),
            service: z
                .string({ required_error: 'Veuillez renseigner votre service' })
                .nonempty({ message: 'Veuillez renseigner votre service' })
                .trim(),
        });
        
        const formData = await request.formData();
        const handicapAdapt = formData.getAll('handicapAdapt');
        
        const formStep2 = Object.fromEntries(formData);
        try {
            const result = contactSchemaStep2.parse(formStep2);
            answer = Object.assign(answer, formStep2);
            answer.handicapAdapt = handicapAdapt;
            cookies.set('form_data', JSON.stringify(answer), { path: '/', maxAge: 3600 });
            console.log(answer);

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
            console.log(errors);
            console.log(formStep2);
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
    step3: async ({request, cookies}) => {
        let answer = JSON.parse(cookies.get('form_data') || '{}');
        const contactSchemaStep3 = z.object({
            objectif: z
                .string({ required_error: 'Le message ne peut pas être vide' })
                .nonempty({ message: 'Le message ne peut pas être vide' })
                .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
                .trim(),
            level: z
                .string({ required_error: 'Veuillez sélectionner une réponse' }),
            connaissance: z
                .string({ required_error: 'Le message ne peut pas être vide' })
                .nonempty({ message: 'Le message ne peut pas être vide' })
                .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
                .trim()
            
        });
        
        const formStep3 = Object.fromEntries(await request.formData());
        try {
            const result = contactSchemaStep3.parse(formStep3);
            answer = Object.assign(answer, formStep3);
            cookies.set('form_data', JSON.stringify(answer), { path: '/', maxAge: 3600 });
            console.log(answer);

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
            console.log(errors);
            console.log(formStep3);
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
    step4: async ({request, cookies}) => {
        let answer = JSON.parse(cookies.get('form_data') || '{}');
        const contactSchemaStep4 = z.object({
            context: z
                .string({ required_error: 'Veuillez sélectionner au moins une réponse' }),
            cadre: z
                .string({ required_error: 'Veuillez sélectionner au moins une réponse' }),
            
        });

        const formData = await request.formData();
        const context = formData.getAll('context');
        const cadre = formData.getAll('cadre');
        
        const formStep4 = Object.fromEntries(formData);
        try {
            const result = contactSchemaStep4.parse(formStep4);
            answer = Object.assign(answer, formStep4);
            answer.context = context;
            answer.cadre = cadre;
            cookies.set('form_data', JSON.stringify(answer), { path: '/', maxAge: 3600 });
            console.log(answer);
            
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
            console.log(context);
            console.log(errors);
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
    step5: async ({request, cookies}) => {
        let answer = JSON.parse(cookies.get('form_data') || '{}');
        const formData = await request.formData();
        const formStep5 = Object.fromEntries(formData);
        
        answer = Object.assign(answer, formStep5);
        console.log(JSON.stringify(answer));
        try {
            // Obtenir le token d'authentification
            const token = await getDirectusToken();
            
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(answer),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            cookies.delete('form_data', { path: '/' });
            
        } catch (error) {
            console.error('Erreur lors de la création de l\'inscription :', error);
            return {
                etatSend: "error"
            }
        }
        return {
            step: 6
        }
    }
};