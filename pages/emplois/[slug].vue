<template>
    <template v-if="job">
        <Head>
            <Title>{{ job.data.titre + config.title }}</Title>
        </Head>
        <div class="container">
            <h1>Details {{ job.data.titre }}</h1>
            <hr>
            <p><i class="bi bi-geo-alt-fill"></i>{{ job.data.lieu }}</p>
            <p class="h3">Description</p>
            <div v-html="renderMd(job.data.description)"></div>
        </div>
    </template>
    <template v-else>
        Offre non existante
    </template>
</template>

<script setup>
    import MarkdownIt from 'markdown-it'
    const config = useAppConfig()
    const route = useRoute()
    const { data: job } = await useFetch(`http://localhost:8055/items/emplois/${route.params.slug}`)
    
	let md = new MarkdownIt

    function renderMd(item) {
        const format = md.render(item)
        return format
    }

</script>