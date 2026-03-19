<script>
    import { store } from '$lib/stores/Store';
    import FormationNav from "$lib/components/FormationNav.svelte";
    import FormationSlider from '$lib/components/blocs/FormationSlider.svelte';

    let { data } = $props();
    const modules = $derived(data.donnees);

    $store.nav = 'formations';
    $store.sousnav = 'hors-cycle';
    $store.slug = '/formations/hors-cycle';
</script>

<FormationNav />
<section class="section">
    <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
            <div class="column is-7">
                <div class="rows">
                    <div class="row">
                        <h1 class="title is-2">Hors Cycles</h1>
                        <span class="subtitle">Description</span>
                    </div>
                    <div class="row">
                        <div class="description">
                            <p>En dehors de la formation longue à la pratique et aux thérapies familiales systémiques, l’APRTF propose des formations hors cycle selon les besoins des étudiants. La sensibilisation vise à donner des bases sur la thérapie familiale systémique. La formation en thérapie multifamiliale s’attache à former des équipes et/ou des professionnels en binôme à cette pratique spécifique à destination de plusieurs familles. Enfin, des demandes de la part d’institution peuvent aboutir à des formules sur site adaptées aux besoins.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="subtitle">Les modules</p>
        <div class="container is-max-widescreen colloques">
            <div class="columns is-multiline">
                {#each modules as item}
                {#if item.type === 'hors-cycle'}
                    <FormationSlider {...item} />
                {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<style lang="scss">
</style>