<script lang="ts">
    import Button from '$lib/components/forms/Button.svelte';
    import { store } from '$lib/stores/Store';

	import { PUBLIC_HOST_API } from '$env/static/public';
    
    export let data;
    const emploi = data.donnees;
    
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
    @import '../../../styles/variables.scss';
    
    :global(.description p) {
        margin-bottom: 20px;
    }
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
        font-family: $family-title;
        margin-bottom: 50px;
        
        &.is-1 {
            font-size: $size-title-1;
            text-align: center;
            
            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-1-desktop;
                text-align: left;
            }
        }
    }

    :global(.text a) {
        color: $tertiary;
    }
    :global(.text a:hover) {
        color: $tertiary;
        text-decoration: underline;
    }
</style>