<template>
  <div id="lista">
    <material-card
      color="green"
      :title="title"
    >
      <template v-slot:search>
        <v-layout row wrap>
          <v-flex xs10>
            <v-text-field
              v-model="search"
              append-icon="search"
              placeholder="Pesquisar"
              single-line
              hide-details
              :solo-inverted="solo"
              class="mb-2"
              @focus="solo = !solo"
              @blur="solo = !solo"
              dark
            >
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('reloadItems')" :loading="loading">
            <v-icon medium>refresh</v-icon>
          </v-btn>
        </v-layout>
      </template>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          :loading="loading"
        >
          <template v-slot:items="props" v-if="!loading">
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
                <app-remove :item="props.item"
                            :apiRemove="apiRemove"
                            @removeItem="$emit('reloadItems')">
                </app-remove>
              </td>
            </template>
          </template>
          <template v-slot:footer v-else>
            <td :colspan="headers.length" class="text-xs-center">
              <v-progress-circular
                color="primary darken-2"
                class="ma-3"
                indeterminate
                :size="70"
                :width="7"
              ></v-progress-circular>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </material-card>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String
    },
    headers: {
      type: Array,
      required: true
    },
    data: {
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    apiRemove: {
      type: String
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
