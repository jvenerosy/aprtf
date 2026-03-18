import { PUBLIC_HOST_API } from '$env/static/public';

interface Member {
    name: string;
    lastname: string;
    photo: string;
    description: string;
    date: string;
    type: string;
}

const endpoint = `${PUBLIC_HOST_API}/items/membres?fields=name,lastname,photo,description,date,type&sort=lastname`;

export const load = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const donnees = data.data;

    return {
        donnees: donnees
    };
};
