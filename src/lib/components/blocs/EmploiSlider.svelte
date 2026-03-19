<script lang="ts">
    let { slug, date_updated, titre, lieu }: {
        slug: string;
        date_updated: string;
        titre: string;
        lieu: string;
    } = $props();

    function formatDate(date: string) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    const dateUpdated = $derived(formatDate(date_updated));
</script>

<a href="/emploi/{slug}" class="column is-4">
    <div class="card is-fullheight">
        <div class="card-image">
            <figure class="image">
                <img src="images/resume.png?width=100&height=100&format=webp" srcset="images/resume.png 22w" sizes="10px" alt="Placeholder">
            </figure>
        </div>
        <div class="card-content">
            <p class="date">
                <picture>
                    <img src="images/pictos/calendar.svg" srcset="images/pictos/calendar.svg 38w" width="16" height="16" alt="">
                </picture>
                {dateUpdated}
            </p>
            <p class="lieu">
                <picture>
                    <img src="images/pictos/location.svg" srcset="images/pictos/location.svg 38w" width="16" height="16" alt="">
                </picture>
                {lieu}
            </p>
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

    .card-image {
        background: $grey-lighter;
    }
    
    .card-content {
        position: relative;
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