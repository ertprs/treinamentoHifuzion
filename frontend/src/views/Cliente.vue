<template>
  <div id="clientes">
    <v-alert
      :value="hasError"
      type="error"
    >
      {{errorMessage}}
    </v-alert>

    <hfz-lista
      :headers="headers"
      :items="clientes"
      :loading="loading"
      @reloadItems="reload"
      @editItem="edit"
      @deleteItem="remove"
    />

    <hfz-form
      ref="form"
      titulo="Formulário de Clientes"
      :api-salvar="salvarCliente"
      :form="form"
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
              v-model="form.nome"
              label="Nome"
              autofocus
            />
          </v-flex>

          <v-flex
            xs12
            sm4
          >
            <v-text-field
              v-model="form.fone"
              label="Fone"
            />
          </v-flex>

          <v-flex
            xs12
            sm7
          >
            <v-text-field
              v-model="form.email"
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
              v-model="form.conta"
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
  mounted () {
    this.$store.dispatch('listarContas')
  }
}
</script>
