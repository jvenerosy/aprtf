<script>
    import { store } from '$lib/stores/Store';
    import FormationNav from "$lib/components/FormationNav.svelte";
    import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';

    let { data } = $props();
    const modules = $derived(data.donnees);

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
</style>