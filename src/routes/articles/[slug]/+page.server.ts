import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import MarkdownIt from 'markdown-it';
import { PUBLIC_HOST_API } from '$env/static/public';

let md = new MarkdownIt();

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { slug } = params;

    const response = await fetch(`${PUBLIC_HOST_API}/items/informations/${slug}`);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw error(404, 'Article non trouvé');
        }
        throw error(response.status, 'Erreur lors du chargement de l\'article');
    }
    
    const data = await response.json();
    
    // Check if article is published
    if (data.data?.status !== 'published') {
        throw error(404, 'Article non trouvé');
    }

    // Convert markdown to HTML on server side
    if (data.data.contenu) {
        data.data.contenu = md.render(data.data.contenu);
    }

    // Fetch related articles (3 latest articles excluding current one)
    const articlesResponse = await fetch(`${PUBLIC_HOST_API}/items/informations`);
    let relatedArticles = [];
    
    if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        relatedArticles = articlesData.data
					.filter(
						(article: { status: string; slug: string }) =>
							article.status === 'published' && article.slug !== slug
					)
					.sort(
						(
							a: { date_created: string | number | Date },
							b: { date_created: string | number | Date }
						) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
					)
					.slice(0, 3);
    }
    
    return {
        article: data.data,
        relatedArticles
    };
};