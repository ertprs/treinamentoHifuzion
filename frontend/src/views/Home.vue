<template>
  <div>
    <h1>Home</h1>
    <input type="text" v-model="form.state" placeholder="State">
    <input type="text" v-model="form.url" placeholder="URL">
    <input type="text" v-model="form.filtro" placeholder="Filtros">
    <button @click="callGenerico">Chamar</button>
    <v-btn flat @click="callCliente">CHAMAR CLIENTE</v-btn>
    <hr>
    {{ clientes }}
    <hr>
    {{ contas }}
    <hr>
    {{ todos }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        state: 'clientes',
        url: '/contabilidade/clientes/',
        filtro: ''
      }
    }
  },
  computed: {
    ...mapState('cliente', [
      'clientes'
    ]),
    ...mapState('generico', [
      'contas',
      'todos'
    ])
  },
  methods: {
    ...mapActions('generico', ['load']),
    ...mapActions('cliente', ['loadApi']),
    callGenerico () {
      this.load(this.form)
    },
    callCliente () {
      this.loadApi({
        state: 'clientes',
        url: '/contabilidade/clientes/',
        filtro: ''
      })
    }
  }
}
</script>

<style>
</style>
