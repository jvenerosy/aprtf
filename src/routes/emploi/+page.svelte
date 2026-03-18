<script lang="ts">
    import { store } from '$lib/stores/Store';
    import EmploiSlider from '$lib/components/blocs/EmploiSlider.svelte';

    export let data;
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
    @import '../../styles/variables.scss';

    .container {
        &.is-max-small {
            @media screen and (min-width: $b-desktop) {
                max-width: 60% !important;
            }
        }
    }

    .top {
        background: $grey-light;
        color: $primary;
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .title {
        font-family: $family-title;
        &.is-2 {
            font-size: $size-title-2;
            
            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-2-desktop;
            }
        }
    }
    
    .text {
        text-align: left;
        margin-bottom: $gap;
        font-size: $size-regular;

        &.visible {
            font-weight: bold;
            font-size: $size-large;
        }
    }

    .colloques {
        margin-top: calc($gap * 2);
    }

    .bloc {
        text-align: center;
        margin-bottom: calc($gap*2);
    }

</style>