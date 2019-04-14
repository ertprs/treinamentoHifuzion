<template>
  <v-app id="docsapp">
    <hfz-menu title="AppDocs" :menus="menus"/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
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
  }
}
</script>
