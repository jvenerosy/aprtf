<script lang="ts">
    import { store } from '$lib/stores/Store';

    let { data } = $props();
    const donnees = $derived(data.donnees);

    $store.nav = 'contact';
    $store.slug = '/contact';
</script>

<section class="section">
    <div class="container is-max-desktop legals">
        <h1 class="title is-1">{donnees.titre}</h1>
        <p class="subtitle">{donnees.version}</p>
        <div class="description">
            {@html donnees.contenu}
        </div>
    </div>
</section>


<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .legals :global(h3) {
        font-weight: bold;
        font-size: $size-large;
    }
</style>