<script lang="ts">
    import Button from '$lib/components/forms/Button.svelte';
    import { store } from '$lib/stores/Store';

	import { PUBLIC_HOST_API } from '$env/static/public';

    let { data } = $props();
    const colloque = $derived(data.donnees);
    const statut = $derived(data.statut);
    const lien_inscription = $derived(data.lien_inscription);

    $store.nav = 'colloque';
</script>

<svelte:head>
<title>{colloque.titre}</title>
<meta name="robots" content="index follow" />
</svelte:head>

<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-1">{colloque.titre}</h1>
                        <span class="tag is-{colloque.statut}">{statut}</span>
                    </div>
                    <div class="row">
                        <p class="chapo">{colloque.chapo}</p>
                        <div class="description">
                            {@html colloque.description}
                        </div>
                    </div>
                    <div class="row">
                        {#if colloque.statut === 'present'}
                            {#if lien_inscription}
                                <a href="{lien_inscription}" target="_blank" rel="noopener noreferrer">
                                    <Button text="Inscription" />
                                </a>
                            {:else}
                                <a href="/modules-courts/{data.slug}/inscription">
                                    <Button text="Inscription" />
                                </a>
                            {/if}
                        {:else if colloque.statut === 'past'}
                        <Button text="Evènement déjà passé" disabled />
                        {:else if colloque.statut === 'future'}
                        <Button text="Inscriptions ouvertes bientôt" disabled />
                        {/if}
                    </div>
                </div>
            </div>
            <div class="column infos">
                <div class="rows">
                    <div class="row">
                        <picture>
                            <img class="mea" src="{`${PUBLIC_HOST_API}/assets/${colloque.illustration_colloque}`}?width=400&height=300&format=webp" alt={colloque.titre} width="400" height="300" loading="lazy">
                        </picture>
                    </div>
                    <div class="row">
                        <div class="box">
                            <p class="ref">Inscription ouvertes</p>
                            <p>du {colloque.date_debut} au {colloque.date_fin}</p>
                            <p class="ref">Tarifs</p>
                            {@html colloque.tarifs}
                            <p class="ref">Lieu du rendez-vous</p>
                            <p>{colloque.lieu}</p>
                            {#if colloque.programme}
                            <div class="columns placement is-centered">
                                <div class="column has-text-centered">
                                    <a href="{`${PUBLIC_HOST_API}/assets/${colloque.programme}`}">
                                        <Button theme="is-inverted" text="Télécharger le programme" />
                                    </a>
                                </div>
                            </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
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
                            {@html colloque.administratif}
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
                            {@html colloque.animateurs}
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
                            {@html colloque.public}
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
                            {@html colloque.modalite}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .infos {
        img.mea {
            display: block;
            border-radius: $gap;
            margin: 0 auto calc($gap * 2);
        }
        .ref {
            font-weight: bold;
            &:not(:first-child) {
                margin-top: calc($gap * 2);
            }
        }
        .placement {
            margin-bottom: -50px;
        }
    }

    .title.is-1 {
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }

    .tag {
        margin: 0 0 $gap 0;
    }
</style>
