<template>
  <v-app id="admin">
    <hfz-menu titulo="DocsApp" :menus="menus"/>

    <v-content>
      <v-container fluid>
        <slot/>
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
        { para: 'usuario', icone: 'account_circle' },
        { para: 'logout', icone: 'close' }
      ]
    }
  }
}
</script>
