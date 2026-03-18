<script lang="ts">
    import type { Snippet } from 'svelte';

    let { text = "Suivant", theme = "is-tertiary", disabled = false, onclick }: {
        text?: string;
        theme?: string;
        disabled?: boolean;
        onclick?: () => void;
    } = $props();
</script>

<button class="button {theme}" {onclick} {disabled}>
    {text}
</button>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

    button {
        color: $inverted;
        padding: 10px $gap;
        font-size: $size-regular;
        border: none;
        border-radius: 5px;

        &.is-primary {
            background-color: $primary;
            &:hover {
                background-color: darken($primary, 5%);
                color: $inverted;
            }
        }
        &.is-tertiary {
            background-color: $tertiary;
            &:hover {
                background-color: darken($tertiary, 5%);
                color: $inverted;
            }
        }
        &.is-family {
            background-color: $family;
            &:hover {
                background-color: darken($family, 5%);
                color: $inverted;
            }
        }
        &.is-inverted {
            color: $tertiary;
            border: 1px solid $tertiary;
            &:hover {
                border-color: darken($tertiary, 5%);
            }
        }
        &.is-inverted-family {
            color: $family;
            border: 1px solid $family;
            &:hover {
                border-color: darken($family, 5%);
            }
        }
        
    }
</style>