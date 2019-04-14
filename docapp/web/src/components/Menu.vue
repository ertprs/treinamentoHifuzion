<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed>
    <v-btn icon to="/">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title class="ml-0 pl-3">
      <span class="hidden-sm-and-down">{{ title }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-for="menu in menus">
      <v-btn icon :to="menu.to" :key="menu.to" v-if="menu.children === undefined">
        <v-icon>{{menu.icon}}</v-icon>
      </v-btn>

      <v-menu open-on-hover :key="menu.to" v-else>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>{{menu.icon}}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="submenu in menu.children"
            :key="submenu.to"
            :to="submenu.to"
          >
            <v-list-tile-title>
              <v-icon>{{submenu.icon}}</v-icon>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
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
