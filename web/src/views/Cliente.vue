<template>
  <div id="cliente">
    <v-layout row wrap>
      <v-flex xs12>
        <hfz-lista titulo="Lista de Clientes"
                   :headers="headers"
                   :data="clientes"
                   :api-remove="removeCliente"
                   @editar="editarCliente"
                   @reload="reload"/>
      </v-flex>
    </v-layout>

    <v-btn
      fab
      bottom
      right
      color="green"
      dark
      fixed
      @click="openForm"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <hfz-form ref="form"
              titulo="Cliente"
              :form="form"
              :isValid="isValid"
              :apiSave="saveCliente"
              @limparForm="limparForm"
              @atualizarDados="startClientes">
      <div>
        <v-layout row wrap>
          <v-flex xs12 sm1>
            <v-text-field
              placeholder="ID"
              disabled
              v-model="form.id"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              placeholder="Nome"
              v-model="form.nome"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm7>
            <v-text-field
              placeholder="Email"
              v-model="form.email"
              type="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              placeholder="Fone"
              v-model="form.fone"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm8>
            <v-select
              :items="contas"
              item-text="nome"
              item-value="id"
              placeholder="Conta"
              v-model="form.conta"
            ></v-select>
          </v-flex>
        </v-layout>
      </div>
    </hfz-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: '#', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Telefone', value: 'fone' },
        { text: '@', value: 'email' },
        { text: 'Conta', value: 'conta_display' },
        { text: 'Opções', value: '' }
      ],
      form: {
        nome: '',
        fone: '',
        email: '',
        conta: 0
      }
    }
  },
  computed: {
    ...mapState([
      'clientes',
      'contas'
    ]),
    isValid () {
      if (this.form.nome === '') {
        return false
      }
      if (this.form.email === '') {
        return false
      }
      if (this.form.fone === '') {
        return false
      }
      if (this.form.conta === 0) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions([
      'startClientes',
      'loadContas',
      'saveCliente',
      'removeCliente'
    ]),
    reload () {
      this.startClientes()
    },
    openForm () {
      this.$refs.form.show()
    },
    limparForm () {
      this.form = {
        nome: '',
        fone: '',
        email: '',
        conta: 0
      }
    },
    editarCliente (cliente) {
      this.form = cliente
      this.$refs.form.show()
    }
  },
  mounted () {
    this.reload()
    this.loadContas()
  }
}
</script>
