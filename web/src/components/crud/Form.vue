<template>
  <div id="hfz-form">
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          {{ titulo }}
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <slot></slot>
        </v-container>
        <v-card-actions>
          <v-btn flat
                 color="red"
                 outline
                 @click="dialog = false"
                 :loading="isLoading">Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat
                 color="green"
                 outline
                 @click="salvarSair"
                 :loading="isLoading"
                 :disabled="!isValid">Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    titulo: {
      type: String,
      requerid: true
    },
    form: {
      type: Object,
      required: true
    },
    isValid: {
      type: Boolean,
      default: true
    },
    apiSave: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      isLoading: false
    }
  },
  methods: {
    show () {
      this.dialog = true
    },
    async salvarSair () {
      try {
        await this.apiSave(this.form)
        this.$emit('limparForm')
        this.$emit('atualizarDados')
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
