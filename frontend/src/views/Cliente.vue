<template>
  <div id="clientes">
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Pesquisar"
      single-line
      solo
      hide-details
      class="mb-2"
    />
    <v-data-table
      :headers="headers"
      :items="clientes"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.nome }}</td>
        <td>{{ props.item.fone }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.conta_display }}</td>
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
        color="primary"
        dark
        fixed
        @click="dialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-dialog
        v-model="dialog"
        persistent
      >
        <v-card class="elevation-1 mt-2">
          <v-card-title>
            Formulário de Clientes
          </v-card-title>

          <v-container grid-list-md>
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
          <v-card-actions>
            <v-btn
              flat
              color="red"
              outline
              @click="dialog = false"
            >Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="primary"
              outline
              @click="salvar"
            >Salvar
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
      form: {},
      search: '',
      dialog: false,
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'nome', width: '400' },
        { text: 'Fone', value: 'fone', width: '200' },
        { text: 'Email', value: 'email' },
        { text: 'Conta', value: 'conta_display', width: '200' },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState([
      'clientes',
      'contas'
    ])
  },
  methods: {
    ...mapActions([
      'listarClientes',
      'listarContas',
      'salvarCliente',
      'apagarCliente'
    ]),
    editItem (item) {
      this.form = item
      this.dialog = true
    },
    deleteItem (item) {
      if (confirm(`Tem certeza que quer apagar o cliente ${item.nome}?`)) {
        this.apagarCliente(item)
      }
    },
    salvar () {
      this.salvarCliente(this.form).then(
        () => {
          this.form = {}
          this.dialog = false
        }
      )
    }
  },
  mounted () {
    this.listarClientes()
    this.listarContas()
  }
}
</script>
