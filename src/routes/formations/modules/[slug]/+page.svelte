<script>
    import { store } from '$lib/stores/Store';
	import FormationNav from "$lib/components/FormationNav.svelte";
    import Button from '$lib/components/forms/Button.svelte';

	import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';
    
    import { PUBLIC_HOST_API } from '$env/static/public';
    import {slugify} from '$lib/utils/slugify';

    export let data;
    const modules = data.donnees;
    const module = data.module;

    const disabled = module.statut !== 'during' ? 'disabled' : '';

    
    $store.nav = 'formations';
    $store.sousnav = module.type;
    $store.slug = '/formations/cycle-2';
</script>

<svelte:head>
<title>{module.titre}</title>
<meta name="robots" content="index follow" />
</svelte:head>

<FormationNav />
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-2">{module.titre}</h1>
                        <span class="subtitle">Description</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            {@html module.description}
                        </div>
                    </div>
                    {#if module.slug != "hors-cycle-formation-sur-site"}
                    <div class="row">
                        <a target="_blank" class="button-inscription" href="{PUBLIC_HOST_API}/assets/{module.inscription}/aprtf_{slugify(module.titre)}-inscription.pdf">
                            <Button text="Inscription" disabled={disabled} />
                        </a>
                        <a class="button-inscription" href="/formations/tarifs">
                            <Button theme="is-inverted" text="Voir le tarif" />
                        </a>
                    </div>
                    {:else}
                    <p>Nous contacter à l'adresse: <a class="link" href="mailto:contact@aprtfformations.fr">contact@aprtfformations.fr</a></p>
                    {/if}
                </div>
            </div>
            {#if module.informations_pratiques}
            <div class="column infos">
                <div class="rows">
                    <div class="row">
                        <div class="box">
                            <div class="placement-tag">
                                <p class="tag violet">{module.groupe}</p>
                            </div>
                            <div class="placement-txt">
                                <div class="description">
                                    {@html module.informations_pratiques}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="columns placement is-centered">
                            <div class="column has-text-centered">
                                <a target="_blank" href="{PUBLIC_HOST_API}/assets/{module.programme}/aprtf_{slugify(module.titre)}-programme.pdf">
                                    <Button theme="is-inverted" text="Télécharger le programme et le planning" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</section>
{#if module.administrative}
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
{/if}
<section class="section list">
    <div class="container is-max-widescreen">
        <p class="subtitle">Dans le même cycle</p>
        <div class="container is-max-widescreen colloques">
            <div class="columns is-multiline">
                {#each modules as item}
                {#if item.type === module.type && item.slug !== module.slug}
                    <FormationSlider {...item} />
                {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @import '../../../../styles/variables.scss';


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
    
    :global(.description ol) {
        margin-bottom: 20px;
        margin-left: $gap;
    }

    :global(.text a) {
        color: $tertiary;
    }
    :global(.text a:hover) {
        color: $tertiary;
        text-decoration: underline;
    }

    .button-inscription {
        &:not(:last-child) {
            margin-right: $gap;
        }
    }

    .link {
        color: $tertiary;
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
        .box {
            padding-bottom: calc($gap * 2);
        }
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
    
    .tag {
        border-radius: 19px;
        padding: calc($gap/2) $gap;
        display: inline-block;
        text-align: center;
        line-height: 24px;
        height: auto;
        font-weight: 600;
        font-size: $size-regular;
        &.violet {
            background: $tertiary-light;
        }
    }
    
    .utile {
        background: $tertiary-light;
    }
</style>