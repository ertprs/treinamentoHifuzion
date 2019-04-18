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
      :hasTodo="true"
      todoKey="id"
      @reloadItems="reload"
      @editItem="edit"
      @deleteItem="remove"
    />

    <hfz-form
      ref="form"
      titulo="Formulário de Clientes"
      :api-salvar="saveCliente"
      :form="form"
      @atualizar="reload"
      @limpar="limparForm"
    >
      <v-container grid-list-md fluid>
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
              v-model="form.name"
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
              v-model="form.phone"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              placeholder="Fone 2"
              v-model="form.second_phone"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-select
              :items="types"
              item-text="name"
              item-value="id"
              placeholder="Tipo"
              v-model="form.type_person"
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              placeholder="Endereço"
              v-model="form.address"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </hfz-form>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'name', width: '400' },
        { text: 'Fone', value: 'phone', width: '200' },
        { text: 'Email', value: 'email' },
        { text: 'Tipo', value: 'type_person_display', width: '200' },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ],
      types: [
        { id: 1, name: 'Private' },
        { id: 2, name: 'Public' }
      ],
      loading: false,
      form: {},
      dialog: false,
      hasError: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState('cliente', [
      'clientes'
    ])
  },
  methods: {
    ...mapActions('cliente', [
      'loadClientes',
      'saveCliente',
      'removeCliente'
    ]),
    limparForm () {
      this.form = {}
    },
    async reload () {
      try {
        this.loading = true
        await this.loadClientes()
        this.loading = false
      } catch (err) {
        this.loading = false
        this.hasError = true
        this.errorMessage = err
      }
    },
    edit (item) {
      this.form = item
      this.$refs.form.show()
    },
    remove (item) {
      if (confirm(`Tem certeza que quer apagar o cliente ${item.nome}?`)) {
        this.removeCliente(item.id)
        this.reload()
      }
    },
    salvar () {
      this.loading = true
      this.salvarCliente(this.form).then(
        () => {
          this.form = {}
          this.dialog = false
          this.loading = false
        }
      ).catch(
        err => {
          this.hasError = true
          this.errorMessage = err
          setTimeout(() => {
            this.hasError = false
            this.loading = false
          }, 3000)
        }
      )
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
