<template>
	<nav class="navbar navbar-expand-lg text-bg-dark">
		<div class="container">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item" v-for="menu in menus.data.lien">
						<NuxtLink class="link-light" aria-current="page" :to="menu.url">{{ menu.titre }}</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
		</nav>
</template>

<script setup>
	const { data: menus } = await useFetch('http://localhost:8055/items/menu_emplacement/footer?fields=lien.titre,lien.url')
</script>