<script>
    import Button from '$lib/components/forms/Button.svelte';
    import { store } from '$lib/stores/Store';

    $store.nav = 'home';
    $store.slug = '/colloques';
</script>

<section class="section top">
    <div class="container is-max-widescreen">
        <div class="columns">
            <div class="column is-5 has-text-centered">
                <picture>
                    <img src="images/pro-illustration.svg" srcset="images/pro-illustration.svg 262w" sizes="362px" alt="" />
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Vous êtes un(e) professionnel(le)</h1>
                <p class="subtitle">Formations et événements</p>
                <p class="parag">Tous nos programmes visent au développement des compétences thérapeutiques des professionnels de santé, médico-sociaux et sociaux, ainsi que leur application et leur exercice en équipe au sein de leurs institutions.</p>
            </div>
        </div>
    </div>
</section>
<section class="section bottom">
    <div class="container">
        <h2 class="title is-2 has-text-centered">Intéressé(e) par une formation, un événement ou découvrir l’Aprtf ?</h2>
        <div class="columns pepites is-variable is-fullhd">
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="images/pictos/school.svg" alt="" />
                        </picture>
                    </div>
                    <div class="row">
                        <p class="name">Information et inscriptions aux formations</p>
                        <p class="parag">Découvrez nos parcours structurés de sensibilisation, formation et supervision en pratique systémique et en thérapie familiale, ainsi qu’en thérapie multifamiliale</p>
                    </div>
                    <div class="row is-narrow links">
                        <a href="/formations">
                            <Button text="S'inscrire" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="images/pictos/ampoule.svg" alt="" />
                        </picture>
                    </div>
                    <div class="row">
                        <p class="name">En savoir plus sur l’Aprtf et ses membres</p>
                        <p class="parag">Rencontrez l’équipe des fondateurs et des formateurs titulaires ou associés, et les valeurs portées par l’association depuis sa création en 1981</p>
                    </div>
                    <div class="row is-narrow links">
                        <a href="/association">
                            <Button text="Découvrir" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="images/pictos/calendar.svg" alt="" />
                        </picture>
                    </div>
                    <div class="row">
                        <p class="name">Dates et informations des modules courts et colloques</p>
                        <p class="parag">Nos journées cliniques thématiques sont pluriannuelles et sous forme de modules courts (1-2 jours). L’Aprtf organise également des colloques régulièrement</p>
                    </div>
                    <div class="row is-narrow links">
                        <a href="/modules-courts">
                            <Button text="Consulter" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    .section {
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }

    .top {
        background: $tertiary-light;
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .title {
        margin-bottom: calc($gap*2);

        &.is-1 {
            text-align: center;

            @media screen and (min-width: $b-desktop) {
                text-align: left;
            }
        }
    }

    .name {
        font-size: $size-large;
        font-weight: 600;
        margin-bottom: $gap;
    }

    .links {
        margin-top: 20px;
    }
</style>
