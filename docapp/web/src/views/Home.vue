<template>
  <div class="home">
    <h1>This is an home page</h1>
    <v-btn color="primary" @click="loadProfiles">CARREGA AE!</v-btn>
    {{profiles}}
  </div>
</template>

<script>
import axios from '../plugins/axios'

export default {
  data () {
    return {
      profiles: []
    }
  },
  methods: {
    loadProfiles () {
      axios.get('/core/profiles/').then(
        res => {
          this.profiles = res.data
        }
      )
    }
  }
}
</script>
