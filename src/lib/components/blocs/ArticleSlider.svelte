<script lang="ts">
    import { PUBLIC_HOST_API } from '$env/static/public';

    let { slug, titre, chapo, image, date_created }: {
        slug: string;
        titre: string;
        chapo: string;
        image: string;
        date_created: string;
    } = $props();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
</script>

<div class="column is-4">
    <a href="/articles/{slug}">
        <div class="card is-fullheight">
            <div class="card-image">
                <figure class="image">
                    <img src="{`${PUBLIC_HOST_API}/assets/${image}?width=400&height=300&format=webp`}" alt={titre} width="400" height="300" loading="lazy">
                </figure>
            </div>
            <div class="card-content">
                <h3 class="titre">{titre}</h3>
                <p class="description">{chapo}</p>
            </div>
        </div>
    </a>
</div>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .card {
        border-radius: $gap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.1);
            transform: translateY(-5px);
        }
    }

    .card-content {
        position: relative;
        padding: $gap;
    }

    .titre {
        font-size: $size-large;
        font-weight: 600;
        margin-bottom: calc($gap/2);
        color: $primary-dark;
        line-height: 1.3;
    }

    .description {
        font-size: $size-regular;
        color: $grey;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .is-fullheight {
        height: 100%;
    }

    a {
        display: block;
        height: 100%;
        text-decoration: none;
        color: inherit;
    }
</style>