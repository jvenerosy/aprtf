<template>
	<div class="container">
        <Head>
            <Title>Accueil{{ config.title }}</Title>
        </Head>
		<div class="center">
			<SvgCommunity />
		</div>
		<h1 class="title is-4">Nos dernières offres d'emplois</h1>
	</div>
</template>

<script setup>

const config = useAppConfig()
const { data: jobs } = await useFetch('http://localhost:8055/items/emplois')
</script>

<style scoped>
	.center {
		margin: auto;
		text-align: center;
	}
</style>