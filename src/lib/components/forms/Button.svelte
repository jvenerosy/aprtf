<script lang="ts">
    export let text: string = "Suivant";
    export let theme: string = "is-tertiary";
    export let disabled: any = "";
</script>

<button class="button {theme}" on:click disabled={disabled}>
    {text}
</button>

<style lang="scss">
    @import '../../../styles/variables.scss';

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