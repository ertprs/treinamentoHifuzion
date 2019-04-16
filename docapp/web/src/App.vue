<template>
  <div id="app">
    <layout-admin v-if="isAuthenticated">
      <router-view/>
    </layout-admin>
    <layout-publico v-else>
      <router-view/>
    </layout-publico>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated'
    ])
  }
}
</script>
