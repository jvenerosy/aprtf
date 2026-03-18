<script>
    import { store } from '$lib/stores/Store';
    import FormationNav from "$lib/components/FormationNav.svelte";
    import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';

    export let data;
    let modules = data.donnees;

    // Trier les modules par le champ 'order'
    modules = modules.sort((a, b) => a.order - b.order);

    $store.nav = 'formations';
    $store.sousnav = 'description';
    $store.slug = '/formations';
</script>


<FormationNav />
<section class="section description">
    <div class="container is-max-widescreen">
        <div class="columns">
            <div class="column is-7">
                <p class="title is-2">Descriptions du parcours des deux cycles</p>
                <p class="chapo">La Formation à l’Aprtf vise à développer l’approche familiale systémique au sein de la pratique psychiatrique et de ses champs connexes : Médecine générale, Psychologie clinique, Travail socio-éducatif ou socio-judiciaire.</p>
                <p>Elle apporte des ressources et des compétences pour la pratique de la thérapie familiale, mais aussi des entretiens familiaux systémiques.</p>
                <p>Elle nécessite une motivation et une implication personnelle importante de l’étudiant ainsi qu’un engagement dans la pratique des entretiens familiaux dès le premier cycle de formation, dont la dénomination (Training) souligne la nature d’entraînement à la pratique.</p>
                <p>Elle se déroule selon deux cycles sur quatre ans au minimum, selon les standards de l’European Family Therapy Association (E.F.T.A.).</p>
            </div>
            <div class="column">
                <picture>
                    <img src="images/cycles.png" alt="" />
                </picture>
            </div>
        </div>
    </div>
</section>
<section class="section bilan">
    <div class="container is-max-widescreen">
        <h2 class="title is-2">Bilan des formations 2024</h2>
        <p class="subtitle">125 des participants sur 207 ont répondu (60,4%) à un questionnaire de satisfaction</p>
        <div class="columns">
            <div class="column">
                <p class="numbers">98,4%</p>
                <p class="subnumbers">Taux de satisfaction</p>
            </div>
            <div class="column">
                <p class="numbers">99,2%</p>
                <p class="subnumbers">Taux mise en application au travail</p>
            </div>
            <div class="column">
                <p class="numbers">97,6%</p>
                <p class="subnumbers">Taux de recommandation</p>
            </div>
            <div class="column">
                <p class="numbers">1%</p>
                <p class="subnumbers">Taux d'abandon</p>
            </div>
        </div>
        <p class="subtitle">Retrouvez <a class="link" target="_blank" href="https://bo.aprtfformations.fr/assets/3fc50be0-0763-452c-bbc8-d08153c29d3a.pdf/rapport-evaluation-2024.pdf">ici notre rapport d'évaluation 2024</a> avec le détail de chaque action de formation</p>
    </div>
</section>
<section class="section list">
    <div class="container is-max-widescreen">
        <div class="rows">
            <div class="row">
                <h2 class="title is-2">Les formations proposées</h2>
                <p class="subtitle">Cycle 1, cycle 2 et cycle TMF</p>
                <div class="container is-max-widescreen colloques">
                    <div class="columns is-multiline">
                        {#each modules as item}
                        {#if item.type === 'cycle-1' || item.type === 'cycle-2' || item.type === 'cycle-tmf' }
                            <FormationSlider {...item} />
                        {/if}
                        {/each}
                    </div>
                </div>
            </div>
            <div class="row">
                <p class="subtitle">Hors cycle</p>
                <div class="container is-max-widescreen colloques">
                    <div class="columns is-multiline">
                        {#each modules as item}
                        {#if item.type === 'hors-cycle'}
                            <FormationSlider {...item} />
                        {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @import '../../styles/variables.scss';

    .title {
        font-family: $family-title;

        &.is-2 {
            font-size: $size-title-2;

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-2-desktop;
            }
        }
    }

    .link {
        text-decoration: underline;
    }

    .chapo {
        font-size: $size-large;
        font-weight: 600;
    }

    .description {
        p {
            margin: $gap auto;
        }

        img {
            width: 100%;
        }
    }

    .bilan {
        text-align: center;
        background: $grey-lighter;

        .columns {
            margin-top: calc($gap*2);
        }

        .numbers {
            font-size: 52px;
            font-weight: bold;
            color: $tertiary;
        }

        .subnumbers {
            font-weight: 600;
        }
    }

    .list {
        .row {
            margin-bottom: calc($gap*2);
        }
    }
</style>
