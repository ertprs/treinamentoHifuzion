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

    <div id="form">
      <v-btn
        fab
        bottom
        right
        color="primary"
        dark
        fixed
        @click="dialogCliente = true"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-dialog
        v-model="dialogCliente"
        persistent
      >
        <v-card class="elevation-1 mt-2">
          <v-card-title>
            Formulário de Clientes
            <v-alert
              :value="hasErrorCliente"
              type="error"
            >
              {{errorMessageCliente}}
            </v-alert>
          </v-card-title>

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
          <v-card-actions>
            <v-btn
              flat
              color="red"
              outline
              @click="dialogCliente = false"
              :loading="loadingCliente"
            >Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="primary"
              outline
              @click="salvar"
              :loading="loadingCliente"
            >Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import clienteMixIn from '../mixins/cliente'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [clienteMixIn],
  computed: {
    ...mapState([
      'contas'
    ])
  },
  methods: {
    ...mapActions([
      'listarContas'
    ])
  }
}
</script>
