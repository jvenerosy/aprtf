<template>
    <div class="col col-md-6 col-12">
        <div class="card h-100">
            <div class="card-body">
                <p class="h5">{{ colloque.titre }}</p>
                <hr>
                <p><i class="bi bi-geo-alt-fill"></i>{{ colloque.lieu }}</p>
                <div v-html="renderMdShort(colloque.description)"></div>
                <NuxtLink :to="`/colloques/${colloque.slug}`" class="btn btn-primary">Voir l'offre</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt

function renderMdShort(item) {
	const format = `${md.render(item).substring(0, 150)}...`
	return format
}

defineProps({
    colloque: Object
})
</script>