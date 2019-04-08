<template>
  <div id="todo">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ on }">
        <v-icon
          small
          class="mr-2"
          v-on="on"
        >
          more_vert
        </v-icon>
      </template>

      <v-card class="elevation-1 mt-2">
        <v-card-title>
          <v-flex xs10>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Pesquisar"
              single-line
              solo
              hide-details
              class="mb-2"
              @keypress.enter="addTodo"
            />
          </v-flex>
          <v-flex xs1>
            <v-btn
              flat
              color="primary"
              @click="loadData"
              :loading="loading"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn
              flat
              color="red"
              @click="dialog = false"
              :loading="loading"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </v-card-title>

        <v-container fluid>

          <template v-if="loading">
            <div class="text-xs-center">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
          <template v-else>
            <v-flex xs12>
              <v-data-table
                :headers="headers"
                :items="todos"
                :search="search"
                :loading="loading"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{props.item.id}}</td>
                  <td :class="{'finalizado': props.item.finalizado}">{{props.item.nota}}</td>
                  <td class="justify-center layout pa-3">
                    <v-icon
                      small
                      class="mr-2"
                      @click="endTodo(props.item)"
                      v-if="!props.item.finalizado"
                    >
                      done
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </template>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Todo',
  props: {
    clienteId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nota', value: 'nota' },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ],
      search: ''
    }
  },
  computed: {
    ...mapState(['cliente', 'todos'])
  },
  methods: {
    ...mapActions([
      'carregarCliente',
      'listarTodos',
      'salvarTodo',
      'finalizarTodo'
    ]),
    async loadData () {
      this.loading = true
      await this.carregarCliente(this.clienteId)
      await this.listarTodos(this.clienteId)
      this.loading = false
    },
    async addTodo () {
      this.loading = true
      await this.salvarTodo({
        cliente: this.clienteId,
        nota: this.search
      })
      await this.listarTodos(this.clienteId)
      this.search = ''
      this.loading = false
    },
    async endTodo (todo) {
      this.loading = true
      await this.finalizarTodo(todo.id)
      await this.listarTodos(this.clienteId)
      this.loading = false
    }
  },
  watch: {
    dialog (value) {
      if (value) {
        this.loadData()
      }
    }
  }
}
</script>

<style>
  .finalizado {
    text-decoration: line-through;
  }
</style>
