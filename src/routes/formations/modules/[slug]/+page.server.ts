import { PUBLIC_HOST_API } from '$env/static/public';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt();

const endpoint = `${PUBLIC_HOST_API}/items/formations?sort=slug`;


export const load = async ({params}) => {
    const module = `${PUBLIC_HOST_API}/items/formations/${params.slug}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const donnees = data.data;

    const module_response = await fetch(module);
    const module_data = await module_response.json();
    const module_donnees = module_data.data;

    module_donnees.description = module_donnees.description ? md.render(module_donnees.description) : null;
    module_donnees.informations_pratiques = module_donnees.informations_pratiques ? md.render(module_donnees.informations_pratiques) : null;
    module_donnees.administrative = module_donnees.administrative ? md.render(module_donnees.administrative) : null;
    module_donnees.referent = module_donnees.referent ? md.render(module_donnees.referent) : null;
    module_donnees.public = module_donnees.public  ? md.render(module_donnees.public) : null;
    module_donnees.modalite = module_donnees.modalite ? md.render(module_donnees.modalite) : null;

    return {
        donnees: donnees,
        module: module_donnees,
    };
};