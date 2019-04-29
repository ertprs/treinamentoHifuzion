<template>
  <div id="lista">
    <material-card
      color="green"
      title="Clientes"
    >
      <template v-slot:search>
        <v-layout row wrap>
          <v-flex xs12 sm10>
            <v-text-field
              v-model="search"
              append-icon="search"
              placeholder="Pesquisar"
              single-line
              hide-details
              :solo="solo"
              class="mb-2"
              @focus="solo = !solo"
              @blur="solo = !solo"
              dark
            />
          </v-flex>
          <v-flex xs6 sm1>
            <v-btn icon block @click="$emit('addItem')">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 sm1>
            <v-btn icon block @click="$emit('reloadItems')" :loading="loading">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </template>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :loading="loading"
        >
          <template v-slot:items="props">
            <td
              v-for="i in headers.filter(h => h.value)"
              :key="i.value"
              :class="{'text-xs-right': i.align === 'right'}"
            >
              {{props.item[i.value]}}
            </td>
            <template v-if="headers.filter(h => !h.value).length > 0">
              <td class="justify-center layout ma-1">
                <v-icon
                  small
                  class="mr-1"
                  @click="$emit('editItem', props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  class="mr-1"
                  @click="$emit('removeItem', props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </template>
        </v-data-table>
      </v-flex>
    </material-card>
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
      search: '',
      solo: false
    }
  }
}
</script>
