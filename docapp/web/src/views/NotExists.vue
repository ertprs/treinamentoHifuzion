<template functional>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card light>
          <v-card-title class="primary darken-3 white--text subheading" primary-title>
            <span class="title">Essa página não existe</span>
          </v-card-title>
          <v-card-text>
            Algo não está correto. Para mais informações retorne a página inicial
          </v-card-text>
          <v-card-actions>
            <v-btn block flat class="primary darken-3 white--text" to="/">Ir para inicio</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
