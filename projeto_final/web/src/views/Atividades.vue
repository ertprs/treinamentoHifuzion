<template>
  <div id="clientes">
    <v-container fluid
                 grid-list-md>
      <v-layout wrap row>
        <v-flex xs12>
          <app-crud style="margin-top: -70px;"
                    title="Atividades"
                    :items="items"
                    :data="atividades"
                    apiModule="atividade"
          ></app-crud>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('atividade', ['atividades']),
    ...mapState('cliente', ['clientes']),
    requiredField () {
      return v => !!v || 'Campo obrigatório'
    },
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        {
          text: 'Titulo',
          value: 'title',
          width: '100',
          component: 'v-text-field',
          rules: [this.requiredField]
        },
        {
          text: 'Descrição',
          value: 'description',
          width: '200',
          component: 'v-textarea',
          rules: [this.requiredField]
        },
        {
          text: 'Cliente',
          value: 'client_display',
          width: '150'
        },
        {
          text: 'Cliente',
          value: 'client',
          component: 'v-select',
          config: { items: this.clientes, value: 'name', id: 'id' },
          rules: [this.requiredField],
          showInTable: false
        },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ]
    }
  }
}
</script>

<style scoped>

</style>
