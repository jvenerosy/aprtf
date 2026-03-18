<script lang="ts">
    import { store } from '$lib/stores/Store';
    import SocialLinks from '$lib/components/SocialLinks.svelte';

    $store.nav = 'newsletter';
    $store.slug = '/inscription-newsletter';
</script>

<svelte:head>
    <title>Inscription à la newsletter - APRTF</title>
    <meta name="description" content="Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, formations et événements de l'APRTF." />
</svelte:head>

<section class="section">
    <div class="container is-max-desktop">
        <div class="content has-text-centered">
            <h1 class="title is-2">Inscription à la newsletter</h1>
            <p class="description">
                Recevez directement dans votre boîte mail nos actualités, nos nouvelles formations,
                les dates de nos événements et toutes les informations importantes de l'APRTF.
            </p>
        </div>
        
        <div class="newsletter-form">
            <div class="box">
                <iframe id="subscribe" title="Inscription Newsletter" width="500" height="800" src="https://1f52f782.sibforms.com/serve/MUIFAJ5TbBak6lIYbhphR3hdOCKXJ5Y5n7iB4FZTSKBrgzGBGdBJ4Xo6V44wrAQFycN_BgPBEOAojgcwLeWFeZ77W8UF0oq5PBqnfm2dj9qdBjHi7g-W_i4sDwEBUj1sXRR4zr0HkXRX2jaqrlstD5a0ldsOzHEsr0pj9kXLN9Y_MvrGtzC4EZRQiK_tsqIBzyKjFvqGqOsa0qcW" frameborder="0" scrolling="auto" allowfullscreen style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"></iframe>
            </div>
        </div>

        <div class="newsletter-info">
            <div class="content">
                <h3 class="title is-4">Pourquoi s'inscrire ?</h3>
                <div class="benefits">
                    <div class="benefit-item">
                        <span class="icon">📧</span>
                        <div>
                            <strong>Actualités exclusives</strong>
                            <p>Soyez les premiers informés de nos nouveautés et événements</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <span class="icon">🎓</span>
                        <div>
                            <strong>Nouvelles formations</strong>
                            <p>Découvrez en avant-première nos nouveaux programmes de formation</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <span class="icon">📅</span>
                        <div>
                            <strong>Dates importantes</strong>
                            <p>Ne manquez aucune date d'inscription ou d'événement</p>
                        </div>
                    </div>
                </div>
                
                <div class="privacy-note">
                    <p><small>
                        <strong>Respect de votre vie privée :</strong> Vos données personnelles sont protégées.
                        Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription
                        présent dans chaque email. Consultez notre
                        <a href="/legals/politique-de-confidentialite">politique de confidentialité</a>
                        pour plus d'informations.
                    </small></p>
                </div>
            </div>
        </div>
    </div>
</section>

<SocialLinks />

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    #subscribe {
        height: 940px;


        @media screen and (min-width: $b-desktop) {
            width: 100%;
            height: 740px;
        }
    }

    .section {
        padding: 3rem 1.5rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .title {
        font-family: $family-title;
        color: $primary;
        margin-bottom: 1rem;

        &.is-2 {
            font-size: $size-title-2;

            @media screen and (min-width: $b-desktop) {
                font-size: $size-title-2-desktop;
            }
        }

        &.is-4 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
    }

    .subtitle {
        color: $grey;
        margin-bottom: 1.5rem;
    }

    .description {
        font-size: $size-large;
        color: $primary;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .newsletter-form {
        border-radius: 12px;
        padding: 1rem 0;
        display: flex;
        justify-content: center;

        .box {
            padding: 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            background: white;
            border: 1px solid #e9ecef;
            width: 100%;
        }
    }

    .newsletter-iframe {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        border-radius: 8px;
        
        @media screen and (max-width: 768px) {
            width: 100%;
            height: 400px;
        }
    }

    .newsletter-info {
        margin-top: 3rem;
        
        .content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
    }

    .benefits {
        margin: 1.5rem 0;
    }

    .benefit-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid $tertiary;

        .icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            margin-top: 0.25rem;
        }

        strong {
            color: $primary;
            display: block;
            margin-bottom: 0.5rem;
        }

        p {
            margin: 0;
            color: $grey;
            line-height: 1.5;
        }
    }

    .privacy-note {
        margin-top: 2rem;
        padding: 1rem;
        background: #e3f2fd;
        border-radius: 8px;
        border-left: 4px solid #2196f3;

        a {
            color: $tertiary;
            text-decoration: underline;

            &:hover {
                color: $tertiary-action;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .section {
            padding: 2rem 1rem;
        }

        .benefit-item {
            flex-direction: column;
            text-align: center;

            .icon {
                margin-right: 0;
                margin-bottom: 0.5rem;
            }
        }
    }
</style>