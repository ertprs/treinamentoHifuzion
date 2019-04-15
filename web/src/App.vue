<template>
  <v-app id="inspire">
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
    >
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Hifuzion WEB</span>
      </v-toolbar-title>
      <v-btn icon to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="cliente" v-on="on">
            <v-icon>supervised_user_circle</v-icon>
          </v-btn>
        </template>
        <span>Clientes</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon to="planoconta" v-on="on">
            <v-icon>featured_play_list</v-icon>
          </v-btn>
        </template>
        <span>Plano de Contas</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>
