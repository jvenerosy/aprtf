<script lang="ts">
    export let placeholder: string = "Tapez votre recherche";
</script>

<input type="text" placeholder={placeholder}>

<style lang="scss">
    @import '../../../styles/variables.scss';

    input {
        padding: 10px $gap;
        font-size: $size-regular;
        border: 1px solid $secondary;
        border-radius: 5px;

        &:focus {
            outline: none;
            border-color: $tertiary;
        }
    }
</style>