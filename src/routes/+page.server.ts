import type { PageServerLoad } from './$types';
import { PUBLIC_HOST_API } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch(`${PUBLIC_HOST_API}/items/informations`);
    
    if (!response.ok) {
        return {
            articles: []
        };
    }
    
    const data = await response.json();
    
    return {
        articles: data.data || []
    };
};