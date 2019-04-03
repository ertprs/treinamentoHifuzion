<template>
  <div id="contas">
    <v-data-table
      :headers="headers"
      :items="contas"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.nome }}</td>
        <td class="justify-center layout pa-3">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>

        </td>
      </template>
    </v-data-table>

    <div id="form">
      <v-btn
        fab
        bottom
        right
        color="green"
        dark
        fixed
        @click="dialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">
            Formulário de Contas
          </v-card-title>
          <v-container
            grid-list-sm
            class="pa-4"
          >
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                sm1
              >
                <v-text-field
                  placeholder="ID"
                  disabled
                  v-model="form.id"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                sm11
              >
                <v-text-field
                  placeholder="Nome"
                  v-model="form.nome"
                  autofocus
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn
              flat
              color="red"
              outline
              @click="dialog = false"
              :loading="isLoading"
            >Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="green"
              outline
              @click="salvarConta"
              :loading="isLoading"
              :disabled="!isValid"
            >Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div id="remove">
      <v-dialog
        v-model="dialogRemove"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Remover Conta!</v-card-title>

          <v-card-text>
            Você tem certeza que quer excluir a conta {{form.nome}}
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange darken-1"
              flat="flat"
              :loading="isLoading"
              @click="dialogRemove = false"
            >
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              flat="flat"
              :loading="isLoading"
              @click="confirmRemove"
            >
              Remover
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      dialogRemove: false,
      isLoading: false,
      form: {},
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'nome' },
        { text: 'Opções', value: '', width: '10' }
      ]
    }
  },
  computed: {
    ...mapState([
      'contas'
    ]),
    isValid () {
      return true
    }
  },
  methods: {
    ...mapActions([
      'listarContas'
    ]),
    salvarConta () {
      this.isLoading = true
      this.$store.dispatch('salvarConta', this.form).then(
        () => {
          this.form = {}
          this.isLoading = false
          this.dialog = false
        }
      )
    },
    editItem (item) {
      this.form = item
      this.dialog = true
    },
    deleteItem (item) {
      this.form = item
      this.dialogRemove = true
    },
    confirmRemove () {
      this.isLoading = true
      this.$store.dispatch('apagarConta', this.form).then(
        () => {
          this.form = {}
          this.isLoading = false
          this.dialogRemove = false
        }
      )
    }
  },
  mounted () {
    this.listarContas()
  }
}
</script>
