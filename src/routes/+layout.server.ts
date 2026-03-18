import { PUBLIC_HOST_API } from '$env/static/public';
const seoEndpoint = `${PUBLIC_HOST_API}/items/page_seo`;
const legalsEndpoint = `${PUBLIC_HOST_API}/items/legals`;


export const load = async () => {
    // Récupérer les données SEO
    const seoResponse = await fetch(seoEndpoint);
    const seoData = await seoResponse.json();
    const donnees = seoData.data;

    // Récupérer les données légales
    const legalsResponse = await fetch(legalsEndpoint);
    const legalsData = await legalsResponse.json();
    const legals = legalsData.data;

    return {
        donnees: donnees,
        legals: legals
    };
};