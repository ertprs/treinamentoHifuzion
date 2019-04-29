<template>
  <div id="clientes">
    <v-container fill-height
                 fluid
                 grid-list-md>
      <v-flex sm12>
        <app-table
          :headers="headers"
          :items="clientes"
          :loading="loading"
          @reloadItems="reload"
          @addItem="add"
          @editItem="edit"
          @removeItem="remove"
        ></app-table>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Cliente',
  data () {
    return {
      loading: false,
      headers: [
        {
          sortable: false,
          text: '#',
          value: 'id'
        },
        {
          sortable: true,
          text: 'Nome',
          value: 'name'
        },
        {
          sortable: true,
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Telefone',
          value: 'phone',
          align: 'right'
        },
        {
          value: '',
          text: 'Opções',
          width: '10',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapState('cliente', ['clientes'])
  },
  methods: {
    reload () {
      console.log('reload')
    },
    add () {
      console.log('add')
    },
    edit (item) {
      console.log('edit', item)
    },
    remove (item) {
      console.log('remove', item)
    }

  },
  mounted () {
    this.$store.commit('cliente/CLIENTES')
  }
}
</script>

<style scoped>

</style>
