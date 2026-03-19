import type { EntryGenerator } from './$types';
import { PUBLIC_HOST_API } from '$env/static/public';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();

export const entries: EntryGenerator = async () => {
    const response = await fetch(`${PUBLIC_HOST_API}/items/emplois?fields=slug`);
    const data = await response.json();
    return data.data.map((item: { slug: string }) => ({ slug: item.slug }));
};

export const load = async ({params}) => {
    const endpoint = `${PUBLIC_HOST_API}/items/emplois/${params.slug}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const donnees = data.data;
    
    donnees.lieu = md.render(donnees.lieu);
    donnees.description = md.render(donnees.description);
    
    function formatDate(date: Date) {
        return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    donnees.dateUpdated = formatDate(donnees.date_updated);
    
    return {
        donnees: donnees,
        slug: params.slug
    };
};

        