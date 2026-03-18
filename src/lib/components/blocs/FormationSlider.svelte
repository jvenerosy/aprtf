<script lang="ts">
    export let slug: string;
    export let titre: string;
    export let description_short: string;
    export let statut: string;
    export let mea: string;

	import { PUBLIC_HOST_API } from '$env/static/public';

    let statutValue:string = statut === 'after' ? 'Inscriptions closes' : statut === 'during' ? 'Inscriptions ouvertes' : 'À venir';

    const link = slug === 'cycle-1-therapie-familiale' ? '/formations/cycle-1' : `/formations/modules/${slug}`;
</script>
<nav data-sveltekit-reload class="column is-4">
    <a href={link}>
        <div class="card is-fullheight">
            <div class="card-image">
                <figure class="image">
                    <img src="{`${PUBLIC_HOST_API}/assets/${mea}?width=400&height=300&format=webp`}" alt={titre}>
                </figure>
            </div>
            <div class="card-content">
                <p class="tag is-{statut}">{statutValue}</p>
                <h3 class="titre">{titre}</h3>
                <p class="description">{description_short}</p>
            </div>
        </div>
    </a>
</nav>

<style lang="scss">
    @import '../../../styles/variables.scss';

    .card {
        border-radius: $gap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.1);
        }
    }

    .card-content {
        position: relative;
    }

    .tag {
        position: absolute;
        top: -15px;
        font-size: $size-regular;
        font-family: $family-regular;
        font-weight: bold;
        color: $primary-dark;

        &.is-before {
            background: $tag-past;
        }
        &.is-during {
            background: $tag-present;
        }
        &.is-after {
            background: $tag-future;
        }
    }

    .titre {
        font-size: $size-large;
        font-weight: 600;
        margin-top: $gap;
    }

    .description {
        font-size: $size-regular;
        margin-top: $gap;
    }

    .is-fullheight {
        height: 100%;
    }
</style>
