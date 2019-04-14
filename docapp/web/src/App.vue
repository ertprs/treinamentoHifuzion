<template>
  <v-app id="docsapp">
    <template v-if="isAuthenticated">
      <hfz-menu title="AppDocs" :menus="menus"/>
      <v-content>
        <v-container fluid grid-list-md>
          <router-view/>
        </v-container>
      </v-content>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      menus: [
        { to: 'cliente', icon: 'supervised_user_circle' },
        { to: 'conta', icon: 'featured_play_list' },
        {
          to: 'usuario',
          icon: 'account_circle',
          children: [{
            to: 'logout',
            icon: 'close'
          }]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated'
    ])
  }
}
</script>
