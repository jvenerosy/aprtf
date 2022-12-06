<template>
	<nav :class="`navbar navbar-expand-lg bg-white fixed-top ${shadow}`">
		<div class="container">
			<NuxtLink to="/" class="navbar-brand">APRTF</NuxtLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item" v-for="menu in menus.data.lien">
						<NuxtLink class="nav-link active" aria-current="page" :to="menu.url">{{ menu.titre }}</NuxtLink>
					</li>
				</ul>
				<form class="d-flex" role="search" @submit="launchSearch">
					<input v-model="query" class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search">
					<button class="btn btn-outline-success" type="submit">Rechercher</button>
				</form>
			</div>
		</div>
		</nav>
</template>

<script setup>
import { ref } from 'vue'
const { data: menus } = await useFetch('http://localhost:8055/items/menu_emplacement/header?fields=lien.titre,lien.url')
const query = ref('')
const shadow = ref('')

const launchSearch = function(e) {	
	window.location.href = `/recherche?search=${query.value}`
	e.preventDefault()
}

if(process.client) {
	window.addEventListener('scroll', (event) => {
		const y = window.scrollY
		if(y > 50) {
			shadow.value = 'navbar-shadow'
		} else {
			shadow.value = ''
		}
	})
}



</script>

<style>
.navbar {
	transition: all ease .2s;
}
.navbar-shadow {
	-webkit-box-shadow: 0px -1px 15px 9px rgba(0,0,0,0.10); 
	box-shadow: 0px -1px 15px 9px rgba(0,0,0,0.10);
}
</style>