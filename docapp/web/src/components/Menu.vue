<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed>
    <v-btn icon to="/">
      <v-icon>home</v-icon>
    </v-btn>
    <v-toolbar-title class="ml-0 pl-3">
      <span class="hidden-sm-and-down">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-for="menu in items">
      <v-btn flat :icon="menu.icon !== ''" :key="menu.to" :to="menu.to" v-if="!menu.submenu.length">
        <v-icon v-if="menu.icon">{{menu.icon}}</v-icon>
        <small v-else>{{menu.to}}</small>
      </v-btn>

      <v-menu offset-y open-on-hover :key="menu.to" v-else>
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
            v-for="submenu in menu.submenu"
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
  },
  computed: {
    items () {
      const filter = f => !['login', 'home'].includes(f)
      const routes = this.$router.options.routes.filter(f => filter(f.name)).map(route => ({
        to: route.name,
        icon: '',
        submenu: []
      }))
      if (this.menus.length !== 0) return this.menus
      return routes
    }

  }
}
</script>
