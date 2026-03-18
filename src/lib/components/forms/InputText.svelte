<script lang="ts">
    let { placeholder = "Tapez votre recherche" }: { placeholder?: string } = $props();
</script>

<input type="text" placeholder={placeholder}>

<style lang="scss">
    @use '../../../styles/variables.scss' as *;

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