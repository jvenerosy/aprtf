import { directus } from '$lib/directus.js';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import MarkdownIt from 'markdown-it';

export const prerender = false;

let md = new MarkdownIt();

export async function load({ url }) {
    const slug = url.searchParams.get('slug');
    const isPreview = url.searchParams.has('preview');
    const authToken = url.searchParams.get('auth_token');
    
    if (!slug) {
        throw error(400, 'Slug manquant');
    }

    try {
        // Si preview mode avec token, on authentifie
        if (isPreview && authToken) {
            directus.setToken(authToken);
        }

        // Récupérer l'article par slug
        const articles = await directus.request(
            readItems('informations', {
                filter: { slug: { _eq: slug } },
                limit: 1
            })
        );

        if (!articles || articles.length === 0) {
            throw error(404, 'Article non trouvé');
        }

        const article = articles[0];

        // Convert markdown to HTML
        if (article.contenu) {
            article.contenu = md.render(article.contenu);
        }

        // Fetch related articles si pas en preview
        let relatedArticles = [];
        if (!isPreview) {
            const relatedData = await directus.request(
                readItems('informations', {
                    filter: { 
                        status: { _eq: 'published' },
                        slug: { _neq: slug }
                    },
                    sort: ['-date_created'],
                    limit: 3
                })
            );
            relatedArticles = relatedData || [];
        }
        
        return {
            article,
            relatedArticles,
            isPreview
        };
        
    } catch (err) {
        console.error('Erreur lors du chargement:', err);
        throw error(500, 'Erreur lors du chargement de l\'article');
    }
}