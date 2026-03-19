<script lang="ts">
    import { store } from '$lib/stores/Store';
    import EmploiSlider from '$lib/components/blocs/EmploiSlider.svelte';

    let { data } = $props();
    const emplois = data.emplois;

    $store.nav = 'emploi';
    $store.slug = '/emploi';
</script>

<section class="section top">
    <div class="container is-max-widescreen">
        <div class="columns is-vcentered">
            <div class="column is-5 has-text-centered">
                <picture>
                    <img src="images/emploi.svg" srcset="images/emploi.svg 202w" sizes="90px" alt="" />      
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Offres d'emplois</h1>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container is-max-small">
        <div class="bloc">
            <h2 class="title is-2">Les offres d'emplois de nos partenaires</h2>
        </div>
    </div>
    <div class="container is-max-widescreen colloques">
        <div class="columns is-centered is-multiline">
            {#if emplois.length > 0}
                {#each emplois as item}
                    <EmploiSlider {...item} />
                {/each}
                {:else}
                    <p class="text visible">Il n'y a actuellement aucune offre d'emploi disponible sur le site, n'hésitez pas à revenir régulièrement.</p>
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    .top {
        background: $grey-light;
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .text.visible {
        font-weight: bold;
        font-size: $size-large;
    }

    .colloques {
        margin-top: calc($gap * 2);
    }

    .bloc {
        text-align: center;
        margin-bottom: calc($gap*2);
    }
</style>