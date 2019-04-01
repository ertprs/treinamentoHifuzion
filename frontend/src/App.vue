<template>
  <v-app id="hifuzion">
    <hfz-menu titulo="HIFuzion WEB" :menus="menus"/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { para: 'cliente', icone: 'supervised_user_circle' },
        { para: 'conta', icone: 'featured_play_list' },
        { para: 'usuario', icone: 'account_circle' }
      ]
    }
  }
}
</script>
