<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <template v-slot:activator="{ on }">
      <v-icon
        small
        v-on="on"
      >
        delete
      </v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">{{titulo}}!</v-card-title>

      <v-card-text>
        Você tem certeza que quer excluir o cliente {{item.nome}}?
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange darken-1"
          flat="flat"
          @click="dialog = false"
        >
          {{btnCancelar}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :color="btnConfirmarColor"
          flat="flat"
          @click="confirmRemove"
        >
          {{btnConfirmar}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Remove',
  props: {
    titulo: {
      type: String,
      default: 'Apagar Registro'
    },
    btnCancelar: {
      type: String,
      default: 'Cancelar'
    },
    btnConfirmar: {
      type: String,
      default: 'Confirmar'
    },
    btnConfirmarColor: {
      type: String,
      default: 'red'
    },
    item: {
      type: Object,
      require: true
    },
    apiRemove: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async confirmRemove () {
      try {
        await this.apiRemove(this.item.id)
        this.$emit('itemRemoved')
        this.dialog = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
