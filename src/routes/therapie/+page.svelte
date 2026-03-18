<script>
    import Button from '../../lib/components/forms/Button.svelte';
    import { store } from '../../lib/stores/Store';

    $store.nav = 'therapie';
    $store.slug = '/therapie';
</script>

<section class="section top">
    <div class="container is-max-widescreen">
        <div class="columns">
            <div class="column is-5 has-text-centered">
                <picture>
                    <img src="images/family-illustration.svg" srcset="images/family-illustration.svg 262w" sizes="362px" alt="" />
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Vous êtes une famille, un couple en demande d’une consultation</h1>
                <p class="parag">Dans le cadre des formations dispensées, l'APRTF propose des consultations à visée d'enseignement et de recherche pour ses apprenants.
                    <br>Elle remplit, par ailleurs, une mission d'orientation des familles et des couples demandeurs vers des unités de thérapie familiale hospitalières ou des praticiens expérimentés.
                </p>
                <div class="links">
                    <a href="/therapie/contact">
                        <Button theme="is-primary" text="Contacter" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section bottom">
    <div class="container is-max-desktop">
        <h2 class="title is-2 has-text-centered">Qu’est-ce que la thérapie familiale et de couple ?</h2>
        <div class="columns pepites is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="images/pictos/house.svg" alt="" />
                        </picture>
                    </div>
                    <div class="row">
                        <h3 class="name">La thérapie familiale, une thérapie en famille</h3>
                        <h3 class="parag">La thérapie familiale réunit tous les membres d’une famille dans un même cadre thérapeutique. Elle donne à chacun la possibilité de reconnaître l’impact des troubles sur les relations et le bien-être de tous. Elle vise à trouver, dans les relations, les ressources permettant de dépasser les problèmes</h3>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img src="images/pictos/chat.svg" alt="" />
                        </picture>
                    </div>
                    <div class="row">
                        <p class="name">La thérapie de couple</p>
                        <p class="parag">La thérapie de couple explore avec ses membres les enjeux relationnels et les difficultés qu’ils créent dans les interactions quotidiennes et dans le projet de couple.</p>
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
        background: $family-light;
        padding-top: 60px;
        padding-bottom: 60px;
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

    .name {
        font-size: $size-large;
        font-weight: 600;
        margin-bottom: $gap;
    }

    .links {
        margin-top: 20px;
    }
</style>
