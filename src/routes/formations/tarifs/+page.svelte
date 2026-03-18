<script>
    import { store } from '$lib/stores/Store';
    import FormationNav from "$lib/components/FormationNav.svelte";
    import Button from '$lib/components/forms/Button.svelte';
    import { PUBLIC_HOST_API } from '$env/static/public';
    import { slugify } from '$lib/utils/slugify';

    let { data } = $props();
    const modules = data.donnees;

    $store.nav = 'formations';
    $store.sousnav = 'tarifs';
    $store.slug = '/formations/tarifs';

    $effect(() => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.addEventListener('click', () => {
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('is-active');
                });
                item.classList.add('is-active');
            });
        });
    });
</script>

<FormationNav />
<section class="section tarifs">
    <div class="container is-max-widescreen">
        <p class="title is-2">Tarifs des formations applicables en 2025 / 2026 </p>
        <div class="table">
            <div class="infos">
                <p class="chapo">Information</p>
                <p>Le contrat ou la convention doivent avoir été signés au moins 15 jours avant le démarrage de la formation.</p>
            </div>
            <div class="box">
                {#each modules as item}
                    {#if item.tarifs_individuel}
                        <div class="line">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{ item.titre }</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Financement individuel</td>
                                        <td>{ item.tarifs_individuel } € {#if item.tarifs_annuel}/an{/if}</td>
                                    </tr>
                                    <tr>
                                        <td>Financement via la Formation Permanente</td>
                                        <td>{ item.tarifs_formation_permanente } € {#if item.tarifs_annuel}/an{/if}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    {/if}
                {/each}
                <p class="mentions">L'APRTF n'est pas assujettie à la TVA.</p>
                <a target="_blank" href="{PUBLIC_HOST_API}/assets/1ad9f26e-370e-465a-85de-8e8777e6a192/aprtf_catalogue-des-tarifs.pdf">
                    <Button text="Télécharger le catalogue des tarifs" />
                </a>
            </div>
        </div>
    </div>
</section>
<section class="section financement">
    <div class="container is-desktop-max">
        <p class="title is-2">Gestion du financement</p>
        <p class="subtitle">Les critères de prise en charge par certains organismes</p>
        <div class="accordions">
            <div class="accordion-item is-active">
                <div class="accordion-name box">Compte CPF <span>↓</span></div>
                <div class="accordion-description">
                    <p>
                        Il n'est pas possible de mobiliser son compte CPF pour financer les formations dispensées à l'APRTF, car les formations menant au métier de thérapeute familial ou de couple ne sont pas sanctionnées par un diplôme ou un certificat.
                    </p>
                </div>
            </div>
            <div class="accordion-item">
                <div class="accordion-name box">FIF PL – Fonds Interprofessionnels de Formation des Professionnels Libéraux <span>↓</span></div>
                <div class="accordion-description">
                    <p>Procédure de prise en charge :</p>
                    <p>Des critères de prise en charge sont déterminés annuellement par les Représentants Professionnels de chaque profession.</p>
                    <p>Ces Représentants Professionnels définissent pour la (les) profession(s) qu'ils représentent une liste de thèmes de<br />formation susceptibles de faire l'objet d'une prise en charge par le FIF PL ainsi que des modalités financières de prise<br />en charge.</p>
                    <p>Ces critères de prise en charge, disponibles sur le site du FIF PL, sont applicables du 1er janvier au 31 décembre de<br />chaque année et peuvent, au regard des priorités du FIF PL et de chaque profession, être modifiés d'une année à l'autre.</p>
                    <p>Demande de prise en charge :<br />Toute demande préalable de prise en charge doit impérativement être saisie en ligne, au plus tard, dans les 10 jours<br />calendaires suivant le 1er jour de formation.</p>
                    <p>Passé ce délai de 10 jours calendaires, la demande de prise en charge sera refusée.<br />Le professionnel libéral saisit personnellement sa demande de prise en charge en ligne</p>
                </div>
            </div>
            <div class="accordion-item">
                <div class="accordion-name box">FAF PM – Fonds d'assurance Formation de la Profession médicale <span>↓</span></div>
                <div class="accordion-description">
                    <p>Procédure de prise en charge :<br /><strong>La demande de prise en charge est déposée directement au FAF PM par un médecin libéral</strong>, en vue d'obtenir le remboursement des frais de fonctionnement de l'action de formation qu'il a suivie et qui a été réalisée (priorités et critères à consulter sur le site)</p>
                    <p>Le montant des frais pris en charge par le FAF PM au titre d'une prise en charge individuelle d'une action de formation ne peut excéder, par médecin libéral, un montant fixé chaque année par le Conseil de gestion du FAF PM  (ex : Suite à des décisions du Conseil de Gestion: à partir du 1er février 2024, les formations individuelles qui parviendront au FAF PM <strong>seront prises en charge à hauteur de 250 € par an maximum</strong>)</p>
                </div>
            </div>
            <div class="accordion-item">
                <div class="accordion-name box">OPCO-SANTE <span>↓</span></div>
                <div class="accordion-description">
                    <p>Pour toutes questions sur l'orientation, la formation et ses conditions de financement :<br />09.75.18.76.91. et <a href="https://opco-sante.fr">opco-sante.fr</a></p>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .title {
        font-family: $family-title;

        &.is-2 {
            font-size: $size-title-2;

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-2-desktop;
            }
        }
    }

    .tarifs {
        text-align: center;
    }

    .table {

        @media screen and (min-width: $b-desktop) {
            display: flex;
        }

        .line {
            border-bottom: 2px solid $grey-light;
            padding: $gap;
        }

        table {
            width: 100%;
        }

        td, th {
            border: none;
            padding: calc($gap/4);
        }

        th:first-child, td:first-child {
            width: 70%;
            text-align: left;
            @media screen and (min-width: $b-desktop) {
                width: 80%;
            }
        }

        .mentions {
            margin: $gap 0;
            font-size: $size-small;
            text-align: left;
        }
    }

    .infos {
        display: flex;
        border-radius: $gap $gap 0 0;
        margin: 0 $gap;
        background: $tertiary;
        padding: $gap;
        color: $inverted;
        flex-direction: column;;
        justify-content: center;
        align-items: center;

        @media screen and (min-width: $b-desktop) {
            border-radius: $gap 0 0 $gap;
            width: 30%;
            margin: 30px auto;
        }

        .chapo {
            font-size: $size-large;
            font-weight: 600;
            margin-bottom: calc($gap);

            @media screen and (min-width: $b-desktop) {
                margin-bottom: calc($gap*2);
            }
        }
    }

    .box {
        @media screen and (min-width: $b-desktop) {
            width: 70%;
        }
    }


    .financement {
        background: $grey-lighter;

        .title, .subtitle {
            text-align: center;
        }

        .container {
            max-width: 700px;
        }
    }

    .accordions {
        margin-top: calc($gap*3);

        .accordion-item {
            &:hover, &.is-active {
                .accordion-name {
                    outline: 1px solid $tertiary;
                    cursor: pointer;
                }
            }
            &.is-active {
                .accordion-name {
                    span {
                        transform: rotate(180deg);
                    }
                }
                .accordion-description {
                    height: auto;
                    visibility: visible;
                }
            }
        }

        .accordion-name {
            display: flex;
            width: 100%;
            font-weight: bold;
            margin-bottom: $gap;
            align-items: center;

            span {
                transition: all .3s ease;
                margin-left: auto;
            }
        }

        .accordion-description {
            padding: 0 $gap $gap;
            height: 0;
            visibility: hidden;

            p {
                margin-bottom: $gap;
            }
        }
    }
</style>
