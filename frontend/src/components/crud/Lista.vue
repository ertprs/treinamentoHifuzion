<template>
  <div id="lista">
    <v-layout
      row
      wrap
    >
      <v-flex xs11>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pesquisar"
          single-line
          solo
          hide-details
          class="mb-2"
        />
      </v-flex>
      <v-flex xs1>
        <v-btn
          flat
          color="primary"
          @click="callReload"
          :loading="loading"
        >
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <!-- Percorre o headers para listar os items através do value -->
            <td
              v-for="i in headers.filter(h => h.value)"
              :key="i.value"
            >
              {{props.item[i.value]}}
            </td>

            <!-- Opções -->
            <template v-if="headers.filter(h => !h.value).length > 0">
              <td class="justify-center layout pa-3">
                <hfz-todo :cliente-id="props.item.id"></hfz-todo>
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
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    callReload () {
      this.$emit('reloadItems')
    },
    editItem (item) {
      this.$emit('editItem', item)
    },
    deleteItem (item) {
      this.$emit('deleteItem', item)
    }
  }
}
</script>
