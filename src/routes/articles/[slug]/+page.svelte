<script lang="ts">
    import { store } from '$lib/stores/Store';
    import { PUBLIC_HOST_API } from '$env/static/public';
    import ArticleSlider from '$lib/components/blocs/ArticleSlider.svelte';
    import SocialLinks from '$lib/components/SocialLinks.svelte';

    let { data } = $props();

    $store.nav = 'articles';
    $store.slug = `/articles/${data.article.slug}`;

    // Format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
</script>

<svelte:head>
    <title>{data.article.titre} - APRTF</title>
    <meta name="description" content={data.article.chapo || data.article.titre} />
    
    <!-- Open Graph -->
    <meta property="og:title" content="{data.article.titre} - APRTF" />
    <meta property="og:description" content={data.article.chapo || data.article.titre} />
    <meta property="og:type" content="article" />
    {#if data.article.image}
        <meta property="og:image" content="{PUBLIC_HOST_API}/assets/{data.article.image}?width=1200&height=630&format=webp" />
    {/if}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{data.article.titre} - APRTF" />
    <meta name="twitter:description" content={data.article.chapo || data.article.titre} />
    {#if data.article.image}
        <meta name="twitter:image" content="{PUBLIC_HOST_API}/assets/{data.article.image}?width=1200&height=630&format=webp" />
    {/if}
</svelte:head>

<article class="article">
    <div class="section hero">
        <div class="container is-max-widescreen">
            <div class="columns is-vcentered">
                <div class="column is-7">
                    <div class="article-meta">
                        <nav class="article-breadcrumb">
                            <a href="/" class="breadcrumb-link">Accueil</a>
                            <span class="breadcrumb-separator">></span>
                            <a href="/articles" class="breadcrumb-link">Articles</a>
                            <span class="breadcrumb-separator">></span>
                            <span class="breadcrumb-current">{data.article.titre}</span>
                        </nav>
                        <time class="date" datetime={data.article.date_created}>
                            {formatDate(data.article.date_created)}
                        </time>
                    </div>
                    <h1 class="title is-1">{data.article.titre}</h1>
                    {#if data.article.chapo}
                        <p class="subtitle is-4">{data.article.chapo}</p>
                    {/if}
                </div>
                {#if data.article.image}
                    <div class="column is-5">
                        <figure class="image">
                            <img 
                                src="{PUBLIC_HOST_API}/assets/{data.article.image}?width=600&height=400&format=webp" 
                                alt={data.article.titre}
                                loading="eager"
                            >
                        </figure>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    
    <div class="section content-section">
        <div class="container is-max-widescreen">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div class="article-content">
                        {@html data.article.contenu}
                    </div>
                    
                    <div class="article-footer">
                        <div class="back-link">
                            <a href="/articles" class="button is-outlined">← Retour aux articles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

{#if data.relatedArticles && data.relatedArticles.length > 0}
<section class="section related-articles">
    <div class="container is-max-widescreen">
        <div class="has-text-centered">
            <h2 class="title is-2">Voir aussi</h2>
            <p class="subtitle">Découvrez nos derniers articles</p>
        </div>
        <div class="columns is-multiline is-centered">
            {#each data.relatedArticles as article}
                <ArticleSlider 
                    slug={article.slug}
                    titre={article.titre}
                    chapo={article.chapo}
                    image={article.image}
                    date_created={article.date_created}
                />
            {/each}
        </div>
    </div>
</section>
{/if}

<SocialLinks />

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .article {
        min-height: 100vh;
    }

    .hero {
        background: linear-gradient(135deg, $tertiary 0%, $tertiary-light 100%);
        color: $inverted;

        .title, .subtitle {
            color: $inverted;
        }

        .title {
            font-family: $family-title;
            font-size: $size-title-1;
            margin-bottom: calc($gap);
            line-height: 1.2;

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-1-desktop;
            }
        }

        .subtitle {
            font-size: $size-large;
            line-height: 1.4;
            font-weight: normal;
        }

        .image img {
            border-radius: $gap;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
    }

    .article-meta {
        margin-bottom: calc($gap * 1.5);
        display: flex;
        flex-direction: column;
        gap: calc($gap/2);

        .article-breadcrumb {
            font-size: $size-small;
            color: rgba(255, 255, 255, 0.7);

            .breadcrumb-link {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;

                &:hover {
                    color: $inverted;
                    text-decoration: underline;
                }
            }

            .breadcrumb-separator {
                margin: 0 calc($gap/4);
            }

            .breadcrumb-current {
                color: rgba(255, 255, 255, 0.6);
            }
        }

        .date {
            font-size: $size-small;
            color: rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
        }
    }

    .content-section {
        background: $inverted;
    }

    .article-content {
        font-size: $size-regular;
        line-height: 1.7;
        color: $grey;

        :global(h1),
        :global(h2), 
        :global(h3), 
        :global(h4), 
        :global(h5), 
        :global(h6) {
            font-family: $family-title;
            color: $primary-dark;
            margin-top: calc($gap * 2);
            margin-bottom: calc($gap);
            line-height: 1.3;
        }

        :global(h1) { font-size: $size-title-2; }
        :global(h2) { font-size: $size-title-3; }
        :global(h3) { font-size: $size-large; }

        :global(p) {
            margin-bottom: calc($gap);
        }

        :global(ul),
        :global(ol) {
            margin: calc($gap) 0;
            padding-left: calc($gap * 1.5);
        }

        :global(li) {
            margin-bottom: calc($gap/2);
        }

        :global(blockquote) {
            background: $grey-lighter;
            border-left: 4px solid $primary;
            padding: calc($gap) calc($gap * 1.5);
            margin: calc($gap * 1.5) 0;
            font-style: italic;
            color: $primary-dark;
        }

        :global(strong) {
            color: $primary-dark;
            font-weight: 600;
        }

        :global(a) {
            color: $primary;
            text-decoration: underline;

            &:hover {
                color: $primary-dark;
            }
        }

        :global(img) {
            max-width: 100%;
            height: auto;
            border-radius: calc($gap/2);
            margin: calc($gap * 1.5) 0;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        :global(code) {
            background: $grey-light;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        :global(pre) {
            background: $grey-light;
            padding: calc($gap);
            border-radius: calc($gap/2);
            overflow-x: auto;
            margin: calc($gap) 0;

            :global(code) {
                background: none;
                padding: 0;
            }
        }
    }

    .article-footer {
        margin-top: calc($gap * 3);
        padding-top: calc($gap * 2);
        border-top: 1px solid $grey-lighter;

        .back-link {
            text-align: center;

            .button {
                border-color: $primary;
                color: $primary;

                &:hover {
                    background: $primary;
                    color: $inverted;
                }
            }
        }
    }

    .related-articles {
        background: $grey-lighter;

        .title {
            font-family: $family-title;
            color: $primary-dark;
            margin-bottom: calc($gap/2);
        }

        .subtitle {
            color: $grey;
            margin-bottom: calc($gap * 2);
        }
    }
</style>