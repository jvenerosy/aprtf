<script>
    import { store } from '$lib/stores/Store';
	import FormationNav from "$lib/components/FormationNav.svelte";
    import Button from '$lib/components/forms/Button.svelte';

    import { PUBLIC_HOST_API } from '$env/static/public';
    import {slugify} from '$lib/utils/slugify';

    export let data;
    const module = data.donnees;

    $store.nav = 'formations';
    $store.sousnav = 'cycle-1';
    $store.slug = '/formations/cycle-1';
</script>

<FormationNav />
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-2">Cycle 1 - Sur deux années : Training 1 et Training 2</h1>
                        <span class="subtitle">Description</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            {@html module.description}
                        </div>
                    </div>
                    <div class="row">
                        <a target="_blank" href="{PUBLIC_HOST_API}/assets/{module.inscription}/aprtf_{slugify($store.slug)}-inscription.pdf">
                            <Button text="Inscription" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="column infos">
                <div class="rows">
                    <div class="row">
                        <div class="box">
                            <div class="placement-tag">
                                <p class="tag violet">{module.groupe}</p>
                            </div>
                            <div class="description">
                                {@html module.informations_pratiques}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="columns placement is-centered">
                            <div class="column has-text-centered">
                                <a target="_blank" href="{PUBLIC_HOST_API}/assets/{module.programme}/aprtf_{slugify($store.slug)}-programme.pdf">
                                    <Button theme="is-inverted" text="Télécharger le programme" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section themes">
    <div class="container is-max-widescreen">
        <p class="title is-2">Thèmes abordés</p>
        <p class="subtitle">Durant les 2 années du cycle 1</p>
        <div class="tags">
            <div class="tag rose">Interactions symptôme-patient-famille</div>
            <div class="tag rose">Rituels, mythes et cycle de vie de la famille</div>
            <div class="tag rose">Les difficultés du couple</div>
            <div class="tag rose">Processus d’autonomisation</div>
            <div class="tag violet">Construire le cadre et l’alliance</div>
            <div class="tag violet">Processus collaboratif et de changement</div>
            <div class="tag violet">Outils du thérapeute</div>
            <div class="tag violet">Position et posture du thérapeute</div>
            <div class="tag violet">Equipe thérapeutique : thérapeute et superviseur</div>
        </div>
    </div>
</section>
<section class="section utile">
    <div class="container is-max-widescreen">
        <h2 class="title is-2">Informations utiles</h2>
        <div class="columns is-variable is-6">
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="/images/pictos/email.svg" alt="logo">
                        </picture>
                    </div>
                    <div class="row">
                        <p class="subtitle">Information et inscription administrative</p>
                        <div class="text">
                            {@html module.administrative}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="/images/pictos/contact.svg" alt="logo">
                        </picture>
                    </div>
                    <div class="row">
                        <p class="subtitle">Nom et coordonnées du/des animateurs</p>
                        <div class="text">
                            {@html module.referent}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="/images/pictos/public.svg" alt="logo">
                        </picture>
                    </div>
                    <div class="row">
                        <p class="subtitle">Public concerné</p>
                        <div class="text">
                            {@html module.public}
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="/images/pictos/modalite.svg" alt="logo">
                        </picture>
                    </div>
                    <div class="row">
                        <p class="subtitle">Modalité d'inscription</p>
                        <div class="text">
                            {@html module.modalite}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8 stage">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h2 class="title is-2">Stage clinique</h2>
                        <span class="subtitle">En 2ème année du cycle 1 soit training 2</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            <p>En 2ème année de training, il est proposé aux étudiants d’effectuer un stage clinique de 50 heures (1 demi-journée par semaine pendant 10 semaines) au sein d’une équipe de thérapie familiale conventionnée, où exercent des formateurs de l’Aprtf :</p>
                            <ul>
                                <li>L’unité de thérapie familiale d’Aubervilliers (EPS Ville-Evrard, 93)</li>
                                <li>L’unité de thérapie familiale de Bondy (EPS Ville-Evrard, 93)</li>
                                <li>L’unité de thérapie familiale d’Hauteville (CH Maison Blanche, Paris)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column infos">
                <div class="rows">
                    <div class="row">
                        <div class="box info">
                            <p class="title is-5">Information</p>
                            <p class="intro">Ce stage reste optionnel, mais vivement conseillé. Il propose une immersion dans une équipe de thérapie familiale et permet de suivre des situations cliniques en direct avec l’équipe de supervision.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section groupe">
    <div class="container is-max-widescreen">
        <p class="title is-2">Groupes programmés en 2026</p>
        <div class="columns">
            <div class="column">
                <div class="box is-fullheight">
                    <div class="rows">
                        <div class="row">
                            <div class="columns">
                                <div class="column is-narrow">
                                    <picture>
                                        <img src="/images/c1.svg" alt="">
                                    </picture>
                                </div>
                                <div class="column">
                                    <p class="annee">Année 1</p>
                                    <p class="training">Training 1</p>
                                </div>
                            </div>
                        </div>
                        <div class="row groupes">
                            <ul>
                                <li>Groupe lundi/mardi</li>
                                <li>Groupe mercredi/jeudi</li>
                                <li>Groupe vendredi/samedi</li>
                            </ul>
                        </div>
                        <div class="row">
                            <p class="details">Ouverture des inscriptions début septembre</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="box is-fullheight">
                    <div class="rows">
                        <div class="row">
                            <div class="columns">
                                <div class="column is-narrow">
                                    <picture>
                                        <img src="/images/c1.svg" alt="">
                                    </picture>
                                </div>
                                <div class="column">
                                    <p class="annee">Année 2</p>
                                    <p class="training">Training 2</p>
                                </div>
                            </div>
                        </div>
                        <div class="row groupes">
                            <ul>
                                <li>Groupe lundi/mardi</li>
                                <li>Groupe mercredi/jeudi</li>
                            </ul>
                        </div>
                        <div class="row">
                            <p class="details">Candidature simplifiée pour les stagiaires de 1ère année en 2025</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="box info is-fullheight">
                    <p class="title is-5">Information pour les 2 années</p>
                    <p class="intro">
                        Horaires du 1er jour<br>
                        13h00-20h00
                    </p>
                    <p class="intro">
                        Horaires du 2ème jour<br>
                        9h30-17h30
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @import '../../../styles/variables.scss';

    .description {
        margin-top: $gap;
    }

    :global(.description p) {
        margin-bottom: 20px;
    }

    :global(.description ul) {
        list-style-type: disc;
        margin-left: $gap;
    }

    :global(.text a) {
        color: $tertiary;
    }
    :global(.text a:hover) {
        color: $tertiary;
        text-decoration: underline;
    }

    .is-fullheight {
        height: 100%;
    }

    .infos {
        .placement {
            margin-top: calc($gap / 2);
            margin-top: -30px;
        }
        .placement-tag {
            display: flex;
            justify-content: center;
            margin-top: -40px;
        }
    }

    .stage {
        align-items: end;
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

    .subtitle {
        font-family: $family-regular;
        font-weight: 600;
    }
    .tags {
        text-align: center;
        display: flex;
        justify-content: center;
        @media screen and (min-width: $b-desktop) {
                justify-content: flex-start;
            }
    }

    .tag {
        border-radius: 19px;
        padding: calc($gap/2) $gap;
        display: inline-block;
        text-align: center;
        line-height: 24px;
        height: auto;
        font-weight: 600;
        font-size: $size-regular;

        &.rose {
            background: $tag-past-light;
        }
        &.violet {
            background: $tertiary-light;
        }
    }

    .utile {
        background: $tertiary-light;
    }

    .info {
        border-left: 9px solid $tertiary;
        margin-bottom: calc($gap*2);
        p.intro {
            font-style: italic;
            &:not(:last-child) {
                margin-bottom: $gap;
            }
        }
    }

    .groupe {
        background: $grey-lighter;
        .title {
            text-align: center;
        }

        .annee {
            font-size: $size-small;
            color: $grey;
        }
        .training {
            font-size: $size-small;
            font-weight: 600;
        }

        ul {
            margin: $gap 0 $gap $gap;
            list-style-type: "→";
            padding-bottom: $gap;
            border-bottom: 2px solid $grey-light;

            li {
                padding-left: calc($gap/2);
            }
        }

        .details {
            font-size: $size-regular;
            font-weight: 600;
        }
    }
</style>
