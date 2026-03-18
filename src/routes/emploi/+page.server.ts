import { PUBLIC_HOST_API } from '$env/static/public';
const endpoint = `${PUBLIC_HOST_API}/items/emplois?filter[status]=published&fields=slug,date_updated,titre,lieu&sort=-date_created`;


export const load = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const donnees = data.data;

    return {
        emplois: donnees
    };
};