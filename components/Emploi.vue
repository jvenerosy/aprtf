<template>
    <div class="col col-md-6 col-12" v-if="job.status === 'published'">
        <div class="card h-100">
            <div class="card-body">
                <p class="h5">{{ job.titre }}</p>
                <hr>
                <p><i class="bi bi-geo-alt-fill"></i>{{ job.lieu }}</p>
                <div v-html="renderMdShort(job.description)"></div>
                <NuxtLink :to="`/emplois/${job.slug}`" class="btn btn-primary">Voir l'offre</NuxtLink>
            </div>
            <div class="card-footer text-muted" v-html="renderTimeTo(job.date_created)"></div>
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
	const format = `${md.render(item).substring(0, 150)}[...]`
	return format
}

function renderTimeTo(item) {
	const format = `${dayjs(item).locale('fr').fromNow()}`
	return format
}

defineProps({
    job: Object
})
</script>