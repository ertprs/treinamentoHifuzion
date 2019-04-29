<template>
  <v-app>
<!--    <core-filter></core-filter>-->
    <app-login></app-login>
    <core-toolbar :notifications="notifications"></core-toolbar>
    <core-drawer></core-drawer>
    <core-view></core-view>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      notifications: []
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/index.scss';

  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>
