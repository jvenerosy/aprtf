<script lang="ts">
    import { store } from '$lib/stores/Store';
    import SocialLinks from '$lib/components/SocialLinks.svelte';

    $store.nav = 'contact';
    $store.slug = '/contact';


</script>

<svelte:head>
    <script src="https://acceslibre.beta.gouv.fr/static/js/widget.js" type="text/javascript"></script>
</svelte:head>

<section class="section top">
    <div class="container is-max-widescreen">
        <div class="columns">
            <div class="column is-5 has-text-centered">
                <picture>
                    <img src="images/pro-illustration.svg" srcset="images/contact-illustration.svg 250w" sizes="250px" alt="" />
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Besoin d’informations complémentaires ?</h1>
                <p class="parag">Vous souhaitez vous rendre à l’Aprtf ou nous contacter ? On vous donne toutes ces informations ici.</p>
            </div>
        </div>
    </div>
</section>
<section class="section bottom">
    <div class="container is-max-desktop">
        <div class="rows">
            <div class="row">
                <div class="columns">
                    <div class="column">
                        <h2 class="title is-2">Nous contacter</h2>
                        <address>
                            <p>Pour toutes demandes de renseignements, vous pouvez nous joindre par mail : <a href="mailto:contact@aprtfformations.fr">contact@aprtfformations.fr</a></p>
                            <p class="ref">Adresse</p>
                            <p>16 rue de l’Evangile – 75018 Paris</p>
                            <p class="ref">Téléphone</p>
                            <p><a href="tel:+33143381698">01 43 38 16 98</a></p>
                        </address>
                    </div>
                    <div class="column">
                        <iframe title="Localisation de l'APRTF" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.206113230414!2d2.3599578765283344!3d48.89240897133683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66ffcceb3a2e3%3A0xa4efe7e4ef97fc55!2sAprtf!5e0!3m2!1sfr!2sit!4v1682666495810!5m2!1sfr!2sit" width="100%" height="100%" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column">
                        <h2 class="title is-2">Informations pratiques</h2>
                        <picture>
                            <img src="images/contact-illustration-2.svg" srcset="images/contact-illustration-2.svg 250w" sizes="250px" alt="" />
                        </picture>
                    </div>
                    <div class="column">
                        <div class="explication">
                            <p class="ref">Restauration</p>
                            <p>
                                Les repas ne sont pas compris dans le tarif de formation.<br>
                                Il est possible de se loger et de se restaurer à proximité ou de déjeuner dans les locaux (cuisine équipée d’un micro-onde, réfrigérateur, vaisselle).<br>
                                Le café et le thé sont accessibles gratuitement.
                            </p>
                            <p class="ref">Pendant les sessions, penser à prendre</p>
                            <p>
                                Papier, stylo et éventuellement votre ordinateur portable.<br>
                                L’espace est équipé d’un accès Wifi, d’ordinateurs portables, de téléviseurs, d’un rétro-projecteur et de Paperboards.
                            </p>
                            <p class="ref">Les locaux de l’APRTF sont accessibles</p>
                            <p>
                                Par le Métro : Marx Dormoy ou La Chapelle.<br>
                                Par les Bus 35 &  60 (arrêt Place de Torcy ou Place Hébert).
                            </p>
                            <p>
                                Accès routier : Par la Porte de la Chapelle<br>
                                Les formations sont assurées en présentiel.
                            </p>
                            <div class="access">
                                <div id="widget-a11y-container" data-pk="06f342d1-3c2c-40c3-8c0d-658ad5515419" data-baseurl="https://acceslibre.beta.gouv.fr"></div> <a class="link" href="#" aria-haspopup="dialog" data-erp-pk="06f342d1-3c2c-40c3-8c0d-658ad5515419" aria-controls="dialog">Les locaux de l'APRTF sont accessibles aux personnes à mobilité réduite (PMR) par le 24 rue Marc Seguin, Paris 18e</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<SocialLinks />



<style lang="scss">
    @import '../../styles/variables.scss';

    .section {
        text-align: center;

        &.bottom {
            background: #F9F9FB;
        }

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }

    .top {
        background: $grey-light;
        padding-top: 60px;
        padding-bottom: 60px;
    }
    .access {
        font-weight: bold;
        color: $tertiary;
        text-decoration: underline;
    }
    .title {
        font-family: $family-title;

        &.is-1 {
            font-size: $size-title-1;
            text-align: center;
            margin-bottom: calc($gap*2);

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-1-desktop;
                text-align: left;
            }
        }
        &.is-2 {
            font-size: $size-title-2;
            margin-bottom: calc($gap*2);

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-2-desktop;
            }
        }
    }

    .ref {
        font-weight: bold;
        margin-top: calc($gap/2);
    }

    address {
        font-style: normal;

        a {
            color: $tertiary;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .row {
        margin-bottom: calc($gap*2);
    }

    .explication {
        margin-top: calc($gap*5);

        p {
            margin-bottom: calc($gap/2);
        }
    }
</style>
