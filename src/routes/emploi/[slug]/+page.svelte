<script lang="ts">
    import Button from '$lib/components/forms/Button.svelte';
    import { store } from '$lib/stores/Store';
    import { PUBLIC_HOST_API } from '$env/static/public';

    let { data } = $props();
    const emploi = $derived(data.donnees);

    $store.nav = 'emploi';
</script>

<svelte:head>
<title>{emploi.titre}</title>
<meta name="robots" content="index follow" />
</svelte:head>

<section class="section">
    <div class="container is-max-desktop">
        <div class="rows">
            <div class="row">
                <a href="/emploi" class="link">← Retour aux offres d'emploi</a>
            </div>
            <div class="row">
                <h1 class="title is-1">{emploi.titre}</h1>
            </div>
            <div class="row">
                <div class="description">
                    {@html emploi.description}
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    :global(.description a) {
        color: $tertiary;
    }

    a {
        color: $tertiary;
    }

    .link {
        margin-bottom: 30px;
        display: block;
    }

    .title {
        margin-bottom: 50px;
    }

    .title.is-1 {
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }
</style>