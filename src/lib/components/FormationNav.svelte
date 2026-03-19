
<script>
    import { store } from '../stores/Store';
</script>

<section class="section formations">
    <div class="container is-max-widescreen">
        <div class="columns is-vcentered">
            <div class="column is-5">
                <picture>
                    <img src="/images/formations.svg" alt="" />
                </picture>
            </div>
            <div class="column">
                <h1 class="title is-1">Information et inscriptions aux formations</h1>
            </div>
        </div>
    </div>
</section>
<section class="section sous-nav is-paddingless">
    <ul>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'description'} href="/formations">Description</a></li>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'tarifs'} href="/formations/tarifs">Tarifs</a></li>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'cycle-1'} href="/formations/cycle-1">Cycle 1</a></li>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'cycle-2'} href="/formations/cycle-2">Cycle 2</a></li>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'cycle-tmf'} href="/formations/cycle-tmf">Cycle TMF</a></li>
        <li><a data-sveltekit-noscroll class:active={$store.sousnav === 'hors-cycle'} href="/formations/hors-cycle">Hors Cycles</a></li>
    </ul>
</section>

<style lang="scss">
    @use '../../styles/variables.scss' as *;

    .title.is-1 {
        text-align: center;

        @media screen and (min-width: $b-desktop) {
            text-align: left;
        }
    }

    .formations {
        background: $tertiary-light;
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .sous-nav {
        background: $primary;
        color: $inverted;

        ul {
                display: block;
                justify-content: center;
                li {
                    display: block;
                    text-align: center;

                    a {
                        display: block;
                        padding: $gap;

                        &:hover, &.active {
                            background: $primary-light;
                        }
                    }
                }
            }

            @media screen and (min-width: $b-desktop) {
            ul {
                display: flex;
                justify-content: center;
                li {
                    padding: calc($gap - 3px) 0;
                    display: block;
                    text-align: left;

                    a {
                        padding: $gap;
                        display: inline;

                        &:hover, &.active {
                            background: $primary-light;
                            color: $inverted;
                        }
                    }
                }
            }
        }

    }
</style>
