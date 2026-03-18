<script lang="ts">
    import ArticleSlider from '$lib/components/blocs/ArticleSlider.svelte';
    import SocialLinks from '$lib/components/SocialLinks.svelte';
    import { store } from '$lib/stores/Store';

    export let data;

    $store.nav = 'articles';
    $store.slug = '/articles';

    // Filter only published articles
    $: publishedArticles = data.articles.filter(article => article.status === 'published');
</script>

<svelte:head>
    <title>Articles - APRTF</title>
    <meta name="description" content="Découvrez nos articles sur la thérapie familiale et les approches systémiques" />
</svelte:head>

<section class="section">
    <div class="container is-max-widescreen">
        <div class="bloc">
            <h1 class="title is-1">Nos articles</h1>
            <p class="subtitle">Découvrez nos réflexions et actualités sur la thérapie familiale</p>
        </div>

        {#if publishedArticles.length > 0}
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
        {:else}
            <div class="has-text-centered">
                <p>Aucun article n'est actuellement disponible.</p>
            </div>
        {/if}
    </div>
</section>

<SocialLinks />

<style lang="scss">
    @import '../../styles/variables.scss';

    .section {
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .title {
        font-family: $family-title;
        font-size: $size-title-1;
        color: $primary-dark;
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            font-size: $size-title-1-desktop;
        }
    }

    .subtitle {
        color: $grey;
        margin-bottom: calc($gap*2);
        text-align: center;
    }

    .bloc {
        text-align: center;
        margin-bottom: calc($gap*2);
    }
</style>