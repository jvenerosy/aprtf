<template>
  <div class="container">
    <h1 class="title is-4">Emplois</h1>
    <div class="row">
      <template v-for="job in jobs.data">
        <div class="col col-md-6 col-12" v-if="job.status === 'published'">
          <div class="card">
            <div class="card-body">
              <p class="h5">{{ job.Titre }}</p>
              <hr>
              <p>{{ job.lieu }}</p>
              <div v-html="renderMdShort(job.description)"></div>
              <button type="button" class="btn btn-primary">Voir l'offre</button>
            </div>
            <div class="card-footer text-muted" v-html="renderTimeTo(job.date_created)"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import MarkdownIt from 'markdown-it'
  import moment from 'moment'
  let md = new MarkdownIt
  let filteredJobs = []
  moment.locale();

  function renderMdShort(item) {
    const format = `${md.render(item).substring(0, 160)}[...]`
    return format
  }

  function renderTimeTo(item) {
    const format = `posté ${moment(item).fromNow()}`
    return format
  }

  const { pending, data: jobs } = await useLazyFetch('http://localhost:8055/items/emplois')
</script>
