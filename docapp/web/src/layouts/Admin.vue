<template>
  <v-app id="admin">
    <hfz-menu title="DocsApp" :menus="$store.state.menu.menus"/>
    <v-content>
      <v-container fluid>
        <slot/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('menu/getMenus')
  }
}
</script>
