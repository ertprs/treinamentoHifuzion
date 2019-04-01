<template>
  <div id="clientes">
    <v-data-table
      :headers="headers"
      :items="clientes"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.nome }}</td>
        <td>{{ props.item.fone }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.conta_display }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Fone', value: 'fone' },
        { text: 'Email', value: 'email' },
        { text: 'Conta', value: 'conta_display' }
      ]
    }
  },
  computed: {
    // Alternativa para importar do STORE sem usar ...MAP
    // clientes: () => this.$store.state.clientes

    ...mapState([
      'clientes'
    ])
  },
  methods: {
    ...mapActions([
      'listarClientes'
    ])
  },
  mounted () {
    // this.$store.dispatch('listarClientes')
    this.listarClientes()
  }
}
</script>
