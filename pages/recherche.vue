<template>
    <div class="container">
        <h1>Rechercher</h1>
        <hr>
        <div class="row">
            <div class="col">
                <input v-model="recherche" @change="search" class="form-control form-control-lg" type="text" placeholder="Chercher sur le site..." aria-label="Chercher sur le site" />
            </div>
        </div>
        <div class="row" v-if="recherche.length !== 0">
            <p>{{ result }}</p>
        </div>
        <div class="row" v-if="(emplois &&emplois.data.length > 0)">
            <h2 v-if="(recherche.length >= 3)">Résultat pour <strong class="text-primary">{{ recherche }}</strong> dans les emplois</h2>
            <template v-for="emploi in emplois.data">
                <Emploi :emploi="emploi" />
            </template>
        </div>
        <div class="row" v-if="(colloques && colloques.data.length > 0)">
            <h2 v-if="(recherche.length >= 3)">Résultat pour <strong class="text-primary">{{ recherche }}</strong> dans les colloques</h2>
            <template v-for="colloque in colloques.data">
                <Colloque :colloque="colloque" />
            </template>
        </div>
        <div class="row" v-if="(emplois && colloques && colloques.data.length === 0 && emplois.data.length === 0)">
            <h2>Pas de résultat pour <strong class="text-primary">{{ recherche }}</strong></h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()

let recherche = ref('')
let emplois = ref(null)
let colloques = ref(null)
let result = ref('')

refreshNuxtData()

const searchQuery = function(query) {
    fetch(`http://localhost:8055/items/emplois?search=${query}`)
    .then((res) => res.json())
    .then((json) => (emplois.value = json))
    fetch(`http://localhost:8055/items/colloques?search=${query}`)
    .then((res) => res.json())
    .then((json) => (colloques.value = json))
}

if(route.query.search) {
    recherche.value = route.query.search
    searchQuery(route.query.search)
}

watch(recherche, (newRecherche) => {
    if(newRecherche.length <= 2) {
        result = 'La recherche doit comporter 3 caractères minimum'
        emplois.value = null
        colloques.value = null
    } else {
        result = ''
        searchQuery(newRecherche)
    }
})
</script>