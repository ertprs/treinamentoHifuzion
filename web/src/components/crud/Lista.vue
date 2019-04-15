<template>
  <div id="hfz-lista">
    <h1>{{ titulo }}</h1>
    <v-data-table
      :headers="headers"
      :items="data"
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
          <hfz-remove :item="props.item"
                      :api-remove="apiRemove"
                      btnConfirmarColor="orange"
                      @itemRemoved="itemRemoved"/>

        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default {
  props: {
    titulo: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    apiRemove: {
      type: Function,
      required: true
    }
  },
  methods: {
    editItem (item) {
      this.$emit('editar', item)
    },
    itemRemoved () {
      this.$emit('reload')
    }
  }
}
</script>
