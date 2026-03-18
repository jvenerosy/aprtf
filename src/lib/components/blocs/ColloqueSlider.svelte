<script lang="ts">
    import { PUBLIC_HOST_API } from '$env/static/public';

    let { statut, date_debut, date_fin, lieu, titre, slug, illustration_colloque }: {
        statut: string;
        date_debut: string;
        date_fin: string;
        lieu: string;
        titre: string;
        slug: string;
        illustration_colloque: string;
    } = $props();

    function formatDate(date: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    const dateDebut = $derived(formatDate(date_debut));
    const dateFin = $derived(formatDate(date_fin));
    const statutValue = $derived(statut === 'past' ? 'Terminé' : statut === 'present' ? 'Inscriptions ouvertes' : 'A venir');
</script>

<a href="/modules-courts/{slug}" class="column is-4">
    <div class="card is-fullheight">
        <div class="card-image">
            <figure class="image">
                <img src="{`${PUBLIC_HOST_API}/assets/${illustration_colloque}?width=400&height=300&format=webp`}" alt="Placeholder">
            </figure>
        </div>
        <div class="card-content">
            <p class="tag is-{statut}">{statutValue}</p>
            <p class="date">du {dateDebut} au {dateFin}</p>
            <p class="lieu">{lieu}</p>
            <h3 class="titre">{titre}</h3>
        </div>
    </div>
</a>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    .card {
        border-radius: $gap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;

        &:hover {
            box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.4), 0 0px 0 1px rgba(10, 10, 10, 0.1);
        }
    }

    .card-content {
        position: relative;
    }

    .tag {
        position: absolute;
        top: -15px;
        font-size: $size-regular;
        font-family: $family-regular;
        font-weight: bold;
        color: $primary-dark;

        &.is-past {
            background: $tag-past;
        }
        &.is-present {
            background: $tag-present;
        }
        &.is-future {
            background: $tag-future;
        }
    }

    .date {
        font-size: $size-small;
        color: $grey;
    }

    .lieu {
        font-size: $size-regular;
    }

    .titre {
        font-size: $size-large;
        font-weight: 600;
        margin-top: $gap;
    }

    .is-fullheight {
        height: 100%;
    }
</style>
