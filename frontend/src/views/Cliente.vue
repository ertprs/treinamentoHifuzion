<template>
  <div id="clientes">
    <v-alert
      :value="hasErrorCliente"
      type="error"
    >
      {{errorMessageCliente}}
    </v-alert>

    <hfz-lista
      :headers="headersCliente"
      :items="clientes"
      :loading="loadingCliente"
      @reloadItems="reload"
      @editItem="editCliente"
      @deleteItem="deleteCliente"
    />

    <hfz-form
      ref="form"
      titulo="Formulário de Clientes"
      :api-salvar="salvarCliente"
      :form="formCliente"
      @atualizar="reload"
      @limpar="limparForm"
    >
      <v-container
        grid-list-md
        fluid
      >
        <v-layout
          row
          wrap
        >

          <v-flex
            xs12
            sm8
          >
            <v-text-field
              v-model="formCliente.nome"
              label="Nome"
              autofocus
            />
          </v-flex>

          <v-flex
            xs12
            sm4
          >
            <v-text-field
              v-model="formCliente.fone"
              label="Fone"
            />
          </v-flex>

          <v-flex
            xs12
            sm7
          >
            <v-text-field
              v-model="formCliente.email"
              label="Email"
            />
          </v-flex>

          <v-flex
            xs12
            sm5
          >
            <v-select
              :items="contas"
              item-value="id"
              item-text="nome"
              v-model="formCliente.conta"
              label="Conta"
            ></v-select>
          </v-flex>

        </v-layout>
      </v-container>
    </hfz-form>

  </div>
</template>

<script>
import clienteMixIn from '../mixins/cliente'
import { mapState } from 'vuex'

export default {
  mixins: [clienteMixIn],
  computed: {
    ...mapState(['contas'])
  },
  methods: {
    abrirModal () {
      this.$refs.clienteForm.show()
    }
  },
  mounted () {
    this.$store.dispatch('listarContas')
  }
}
</script>
