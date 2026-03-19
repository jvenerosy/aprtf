<script lang="ts">
    import { page } from '$app/stores';
    import { store } from '$lib/stores/Store';
    import Button from '$lib/components/forms/Button.svelte';
    
    $store.nav = 'contact';
    $store.slug = '/contact';
</script>

<section class="section error-page">
    <div class="container is-max-widescreen">
        <div class="bloc">
            <h1 class="title is-1 error-title">404</h1>
            <h2 class="title is-2">Oups ! Ce document légal a pris la poudre d'escampette !</h2>
            <p class="subtitle">
                Il semblerait que le document "<strong>{$page.params.slug}</strong>" ait décidé de prendre des vacances...
                ou peut-être qu'il n'a jamais existé ! 🤷‍♀️
            </p>
        </div>

        <div class="columns">
            <div class="column">
                <div class="box is-fullheight">
                    <h3 class="title is-3">Documents légaux disponibles</h3>
                    <p class="text">Pas de panique ! Nos avocats n'ont pas encore tout mangé. Voici quelques documents qui, eux, sont bien présents :</p>
                    
                    <div class="links">
                        <div class="columns is-vcentered is-mobile">
                            <div class="column is-narrow">
                                <a href="/legals/conditions-generales-de-vente" title="Conditions générales de vente">Conditions générales de vente</a>
                            </div>
                            <div class="column">
                                <a href="/legals/reglement-interieur" title="Règlement intérieur">Règlement intérieur</a>
                            </div>
                        </div>
                        <div class="columns is-vcentered is-mobile">
                            <div class="column is-narrow">
                                <a href="/legals/politique-de-confidentialite" title="Politique de confidentialité">Politique de confidentialité</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;
    
    .error-page {
        padding-top: 60px;
        padding-bottom: 60px;

        .error-title {
            color: #e74c3c;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .bloc {
            text-align: center;
            margin-bottom: calc($gap*2);
        }
        
        .links {
            margin-top: 20px;
        }
        
        .box {
            transition: all 0.3s ease-in-out;
            
            &:hover {
                box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.1);
            }
        }
        
        a {
            color: $tertiary;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>