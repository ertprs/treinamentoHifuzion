<template>
  <div id="clientes">
    <v-container fluid
                 grid-list-md>
      <v-layout wrap row>
        <v-flex xs12>
          <app-crud style="margin-top: -70px;"
                    title="Clientes"
                    :items="items"
                    :data="clientes"
                    apiModule="cliente"
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
    ...mapState('cliente', ['clientes']),
    requiredField () {
      return v => !!v || 'Campo obrigatório'
    },
    totalBalance () {
      return this.clientes.reduce((pre, ele) => pre + ele.balance_display, 0)
    },
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        {
          text: 'Nome',
          value: 'name',
          width: '200',
          component: 'v-text-field',
          rules: [this.requiredField]
        },
        { text: 'Fone', value: 'phone', width: '100', component: 'v-text-field', rules: [this.requiredField] },
        {
          text: 'Email',
          value: 'email',
          component: 'v-text-field',
          rules: [
            this.requiredField,
            v => /[\w_.-]+@[\w-]+\.[\w-]{1,3}(?:\.[\w-]{1,3})?/.test(v) || 'Insira um email válido'
          ]
        },
        {
          text: 'Tipo',
          value: 'type_person_display',
          width: '100'
        },
        {
          text: 'Tipo',
          value: 'type_person',
          component: 'v-select',
          config: { items: this.$store.state.cliente.types, id: 'id', value: 'name' },
          showInTable: false
        },
        {
          text: 'Endereço',
          value: 'address',
          component: 'v-textarea',
          showInTable: false,
          rules: [this.requiredField]
        },
        {
          text: 'Saldo',
          value: 'balance_display',
          align: 'right',
          width: '100'
        },
        { text: 'Opções', value: '', width: '10', sortable: false, component: 'v-text-field' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
