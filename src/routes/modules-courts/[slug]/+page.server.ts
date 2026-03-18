import { PUBLIC_HOST_API } from '$env/static/public';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();

export const load = async ({params}) => {
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
    const statut = donnees.statut === 'past' ? 'Terminé' : donnees.statut === 'present' ? 'Inscriptions ouvertes' : 'A venir';
    
    return {
        donnees: donnees,
        slug: params.slug,
        statut: statut,
        lien_inscription: donnees.lien_inscription
    };
};

        