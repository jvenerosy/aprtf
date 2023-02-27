<template>
    <div class="col col-md-6 col-12" v-if="emploi.status === 'published'">
        <div class="card h-100">
            <div class="card-body">
                <p class="h5">{{ emploi.titre }}</p>
                <hr>
                <p><i class="bi bi-geo-alt-fill"></i>{{ emploi.lieu }}</p>
                <div v-html="renderMdShort(emploi.description)"></div>
                <NuxtLink :to="`/emplois/${emploi.slug}`" class="btn btn-primary">Voir l'offre</NuxtLink>
            </div>
            <div class="card-footer text-muted" v-html="renderTimeTo(emploi.date_created)"></div>
        </div>
    </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

let md = new MarkdownIt

function renderMdShort(item) {
	const format = `${md.render(item).substring(0, 150)}...`
	return format
}

function renderTimeTo(item) {
	const format = `${dayjs(item).locale('fr').fromNow()}`
	return format
}

defineProps({
    emploi: Object
})
</script>