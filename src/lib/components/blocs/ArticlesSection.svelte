<script lang="ts">
    import ArticleSlider from './ArticleSlider.svelte';
    import Button from '$lib/components/forms/Button.svelte';

    type Article = {
        slug: string;
        titre: string;
        chapo: string;
        image: string;
        date_created: string;
        status: string;
    };

    let { articles = [] }: { articles?: Article[] } = $props();

    const publishedArticles = $derived(
        articles.filter(article => article.status === 'published').slice(0, 3)
    );
</script>

{#if publishedArticles.length > 0}
<section class="section articles" aria-label="Section des derniers articles">
    <div class="container is-max-widescreen">
        <div class="bloc">
            <h2 class="title is-2">Nos derniers articles</h2>
            <p class="subtitle">Découvrez nos réflexions et actualités</p>
        </div>
        <div class="columns is-multiline is-centered">
            {#each publishedArticles as article}
                <ArticleSlider 
                    slug={article.slug}
                    titre={article.titre}
                    chapo={article.chapo}
                    image={article.image}
                    date_created={article.date_created}
                />
            {/each}
        </div>
        <div class="has-text-centered">
            <a href="/articles" title="Voir tous les articles">
                <Button text="Voir tous les articles" />
            </a>
        </div>
    </div>
</section>
{/if}

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .articles {
        padding-top: 60px;
        padding-bottom: 60px;
        background: $inverted;
    }

    .title {
        font-family: $family-title;
        font-size: $size-title-2;
        color: $primary-dark;
        margin-bottom: calc($gap/2);

        @media screen and (min-width: $b-desktop) {
            font-size: $size-title-2-desktop;
        }
    }

    .subtitle {
        color: $grey;
        margin-bottom: calc($gap*2);
    }

    .bloc {
        text-align: center;
        margin-bottom: calc($gap*2);
    }

    .has-text-centered {
        margin-top: calc($gap*2);
    }
</style>