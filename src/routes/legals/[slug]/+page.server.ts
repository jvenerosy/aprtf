import { PUBLIC_HOST_API } from '$env/static/public';
import MarkdownIt from 'markdown-it';
import { error } from '@sveltejs/kit';

let md = new MarkdownIt();

export const load = async ({ params, depends }) => {
    const { slug } = params;
    
    // Ajouter une dépendance sur le slug pour forcer le rechargement
    depends(`legals:${slug}`);
    
    // Récupérer tous les documents légaux
    const response = await fetch(`${PUBLIC_HOST_API}/items/legals`);
    
    if (!response.ok) {
        throw error(500, 'Erreur lors de la récupération des données');
    }
    
    const data = await response.json();
    const legals = data.data;
    
    // Trouver le document correspondant au slug
    const document = legals.find((legal: any) => legal.slug === slug);
    
    if (!document) {
        throw error(404, 'Document non trouvé');
    }
    
    // Convertir le contenu markdown en HTML
    document.contenu = md.render(document.contenu);
    
    return {
        donnees: document
    };
};