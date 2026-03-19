<script lang="ts">
    import { store } from '$lib/stores/Store';
    import ColloqueSlider from '$lib/components/blocs/ColloqueSlider.svelte';

    let { data } = $props();
    const colloques = data.donnees;

    $store.nav = 'colloque';
    $store.slug = '/modules-courts';
</script>

<section class="section top">
    <div class="container is-max-widescreen">
        <div class="columns is-vcentered">
            <div class="column is-5 has-text-centered">
                <picture>
                    <img src="images/journee-illustration.svg" srcset="images/journee-illustration.svg 202w" sizes="202px" alt="" />
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Dates et informations des journées cliniques et colloques</h1>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container is-max-small">
        <div class="bloc">
            <h2 class="title is-2">Les colloques et modules courts de l’Aprtf</h2>
            <p class="subtitle">La transmission fait partie intégrante de l’ADN de l’APRTF.</p>
            <p class="text">Ainsi, depuis toujours, l’APRTF met un point d’honneur à organiser plusieurs fois par an des colloques, journées cliniques ou ateliers de travail et de réflexion.<br>Des thérapeutes de renommée mondiale tels que Salvador Minuchin, Gérard Salem, Boris Cyrulnik, Maurice Corcos, Mony Elkaïm, pour en citer quelques uns, nous ont fait l’immense honneur d’y présenter leurs travaux.</p>
            <p class="text">Plus récemment, Eia Asen, Stefano Cirillo, Joel Bergman, Ivan Eisler, Maurizio Andolfi, entre autres, ont contribué avec talent à la réussite de nos évènements cliniques.</p>
            <p class="text">Depuis 2022, l’APRTF propose des modules courts (1 à 2 jours de formation) sous la forme de journées cliniques thématiques. Ces journées, animées par les formateurs et des intervenants extérieurs, abordent les thèmes de l’adolescence, de l’interculturalité, de la fratrie, du couple, des modalités d’évaluation collaborative des interactions, etc...</p>
            <p class="text">Voici les prochains rendez-vous que nous vous proposons, nous vous invitons à vous inscrire au plus vite. Merci de prendre en compte les prérequis indispensables pour vous permettre d’accéder à ces journées.</p>
        </div>
    </div>
    <div class="container is-max-widescreen colloques">
        <div class="columns is-multiline is-centered">
            {#each colloques as item}
                <ColloqueSlider {...item} />
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    .top {
        background: $tertiary-light;
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .colloques {
        margin-top: calc($gap * 2);
    }

    .bloc {
        text-align: center;
        margin-bottom: calc($gap*2);
    }
</style>
