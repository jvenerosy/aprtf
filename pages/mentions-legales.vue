<template>
    <div class="container">
        <Head>
            <Title>Mentions légales{{ config.title }}</Title>
        </Head>
        <h1>Mentions Légales</h1>
        <div v-html="renderMd(content.data.contenu)"></div>
    </div>
</template>

<script setup>
    import MarkdownIt from 'markdown-it'
    const config = useAppConfig()
    const { data: content } = await useFetch(`http://localhost:8055/items/mentions_legales`)
    
	let md = new MarkdownIt

    function renderMd(item) {
        const format = md.render(item)
        return format
    }
</script>