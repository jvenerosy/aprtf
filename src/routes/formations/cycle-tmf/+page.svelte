<script>
    import { store } from '$lib/stores/Store';
    import FormationNav from "$lib/components/FormationNav.svelte";
    import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';

    let { data } = $props();
    const modules = data.donnees;

    $store.nav = 'formations';
    $store.sousnav = 'cycle-tmf';
    $store.slug = '/formations/cycle-tmf';
</script>

<FormationNav />
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-2">Cycle TMF</h1>
                        <span class="subtitle">Description</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            <p>L’APRTF a mis en place un cycle de formation à la TMF comportant deux niveaux :</p>
                            <p>Niveau 1 TMF Training : Il se déroule sur 9 journées, sur une année<br>
                            Niveau 2 TMF Supervision : Il comprend 4 sessions longues et 5 sessions courtes sur une année</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="subtitle">Les modules</p>
        <div class="container is-max-widescreen colloques">
            <div class="columns is-multiline">
                {#each modules as item}
                {#if item.type === 'cycle-tmf'}
                    <FormationSlider {...item} />
                {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .infos {
        .ref {
            font-weight: bold;
            &:not(:first-child) {
                margin-top: calc($gap * 2);
            }
        }
        .placement {
            margin-top: -30px;
        }
    }

    .stage {
        align-items: end;
    }
</style>
