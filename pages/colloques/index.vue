<template>
    <div class="container">
        <Head>
            <Title>Les colloques{{ config.title }}</Title>
        </Head>
        <h1>Les colloques</h1>
        <hr>
		<div class="row">
			<template v-for="colloque in colloques.data">
				<Colloque :colloque="colloque" />
			</template>
		</div>
    </div>
</template>

<script setup>
const config = useAppConfig()
const { data: colloques } = await useFetch('http://localhost:8055/items/colloques')
</script>