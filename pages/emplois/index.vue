<template>
    <div class="container">
        <Head>
            <Title>Nos dernières offres d'emploi{{ config.title }}</Title>
        </Head>
        <h1>Nos dernières offres d'emploi</h1>
        <hr>
		<div class="row">
			<template v-for="emploi in emplois.data">
				<Emploi :emploi="emploi" />
			</template>
		</div>
    </div>
</template>

<script setup>
const config = useAppConfig()
const { data: emplois } = await useFetch('http://localhost:8055/items/emplois')
</script>