<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed>
    <v-toolbar-title class="ml-0 pl-3">
      <span class="hidden-sm-and-down">{{ titulo }}</span>
    </v-toolbar-title>
    <v-btn icon to="/">
      <v-icon>home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon :to="menu.para" v-for="menu in menus" :key="menu.para">
      <v-icon>{{menu.icone}}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true
    },
    menus: {
      type: Array,
      default: () => []
    }
  }
}
</script>
