<script>
    import { store } from '$lib/stores/Store';
	import FormationNav from "$lib/components/FormationNav.svelte";
	import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';

    export let data;
    const modules = data.donnees;
    
    $store.nav = 'formations';
    $store.sousnav = 'cycle-2';
    $store.slug = '/formations/cycle-2';
</script>

<FormationNav />
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-2">Cycle 2 Thérapie familiale</h1>
                        <span class="subtitle">Description</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            <p>Une pratique effective d’entretiens ou de thérapies familiales est exigée à ce niveau de la formation.</p>
                            <p>Ce second cycle de formation se décline en deux modules de formation à l’Aprtf. Un second cycle complet implique, au minimum, un an de Supervision clinique et un an de Résonance, soit 2 ans à raison de 70 heures minimum par an.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="subtitle">Les modules</p>
        <div class="container is-max-widescreen colloques">
            <div class="columns is-multiline">
                {#each modules as item}
                {#if item.type === 'cycle-2'}
                    <FormationSlider {...item} />
                {/if}
                {/each}
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
        .ref {
            font-weight: bold;
            &:not(:first-child) {
                margin-top: calc($gap * 2);
            }
        }
        .placement {
            margin-top: calc($gap / 2);
            margin-top: -30px;
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