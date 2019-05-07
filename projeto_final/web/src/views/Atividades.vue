<template>
  <div id="clientes">
    <v-container fluid
                 grid-list-md>
      <v-layout wrap row>
        <v-flex xs3>
          <material-card
            color="green"
            title="Clientes"
            class="mt-0"
          >
            <template v-slot:search>
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn icon @click="selectClient(null)">
                  <v-icon large>clear</v-icon>
                </v-btn>
              </v-layout>
            </template>
            <v-list dense>
              <v-list-tile
                v-for="item in clientes"
                :key="item.title"
                avatar
                @click="selectClient(item.id)"
                :class="clienteSelected(item.id)"
              >
                <v-list-tile-avatar>
                  <img src="/img/profile.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>

              </v-list-tile>
            </v-list>
          </material-card>

        </v-flex>
        <v-flex xs9>
          <app-crud ref="crud"
                    style="margin-top: -70px;"
                    title="Atividades"
                    :items="items"
                    :data="atividades"
                    apiModule="atividade"
                    @selectedRow="selectedRow"
          >
            <template v-slot:extras>
              <v-btn icon @click="startActivity" :loading="loading" v-if="allowStart">
                <v-icon medium>play_arrow</v-icon>
              </v-btn>
              <v-btn icon @click="finishActivity" :loading="loading" v-if="allowFinish">
                <v-icon medium>done</v-icon>
              </v-btn>
            </template>
          </app-crud>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  watch: {
    item (value) {
      this.allowStart = value.done === false && value.start_at === null
      this.allowFinish = value.done === false && value.start_at !== null && value.finish_at === null
    }
  },
  data () {
    return {
      item: null,
      allowStart: false,
      allowFinish: false,
      loading: false
    }
  },
  computed: {
    ...mapState('atividade', ['atividades']),
    ...mapState('cliente', ['clientes']),
    requiredField () {
      return v => !!v || 'Campo obrigatório'
    },
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        {
          text: 'Titulo',
          value: 'title',
          width: '100',
          component: 'v-text-field',
          rules: [this.requiredField]
        },
        {
          text: 'Descrição',
          value: 'description',
          width: '200',
          component: 'v-textarea',
          rules: [this.requiredField]
        },
        {
          text: 'Cliente',
          value: 'client_display',
          width: '150'
        },
        {
          text: 'Cliente',
          value: 'client',
          component: 'v-select',
          config: { items: this.clientes, value: 'name', id: 'id' },
          rules: [this.requiredField],
          showInTable: false
        },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ]
    }
  },
  methods: {
    ...mapActions('atividade', [
      'start',
      'finish'
    ]),
    clienteSelected (id) {
      return { 'selected': id === this.$store.state.atividade.cliente }
    },
    selectClient (id) {
      this.$store.commit('atividade/CLIENTE', id)
      this.$store.dispatch('atividade/load')
    },
    selectedRow (item) {
      this.item = item
    },
    startActivity () {
      this.loading = true
      this.start(this.item.id).then(
        res => {
          this.$refs.crud.reload()
          this.selectedRow(res.data)
          this.loading = false
        }
      )
    },
    finishActivity () {
      this.loading = true
      this.finish(this.item.id).then(
        res => {
          this.$refs.crud.reload()
          this.selectedRow(res.data)
          this.loading = false
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
  .selected {
    background-color: #4CAE51;
  }
</style>
