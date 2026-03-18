import { PUBLIC_HOST_API } from '$env/static/public';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();
const endpoint = `${PUBLIC_HOST_API}/items/formations/cycle-1-therapie-familiale?sort=titre`;


export const load = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const donnees = data.data;

    donnees.description = md.render(donnees.description);
    donnees.informations_pratiques = md.render(donnees.informations_pratiques);
    donnees.administrative = md.render(donnees.administrative);
    donnees.referent = md.render(donnees.referent);
    donnees.public = md.render(donnees.public);
    donnees.modalite = md.render(donnees.modalite);

    const statut = donnees.statut === 'past' ? 'Terminé' : donnees.statut === 'during' ? 'Inscriptions ouvertes' : 'A venir';

    return {
        donnees: donnees,
        status: statut
    };
};
