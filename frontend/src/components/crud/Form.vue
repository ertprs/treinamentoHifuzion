<template>
  <div id="form">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          bottom
          right
          color="primary"
          dark
          fixed
          v-on="on"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </template>

      <v-card class="elevation-1 mt-2">
        <v-card-title>
          <h3>{{ titulo }}</h3>

          <v-alert
            :value="error.has"
            type="error"
          >
            {{ error.message }}
          </v-alert>

        </v-card-title>

        <!-- Personalização do formulário -->
        <slot />

        <v-card-actions>
          <v-btn
            flat
            color="red"
            outline
            @click="dialog = false"
            :loading="loading"
          >Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="primary"
            outline
            @click="salvar"
            :loading="loading"
          >Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // Titulo do form
    titulo: {
      type: String,
      required: true
    },
    // Método da chamada para salvar na api
    apiSalvar: {
      type: Function,
      required: true
    },
    // Objeto do formulário
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // Controlador de exceções
      error: {
        has: false,
        message: 'Ops! Algo errado ocorreu.'
      },
      // Indicador de operação em andamento
      loading: false,
      // Controlador do modal
      dialog: false
    }
  },
  methods: {
    // Mostra formulário no caso da edição
    show () {
      this.dialog = true
    },
    // Salva dados
    async salvar () {
      this.loading = true
      try {
        await this.apiSalvar(this.form)
        this.loading = false
        this.dialog = false
        this.$emit('atualizar')
      } catch (err) {
        this.error.has = true
        this.error.message = err
        this.loading = false
      }
    }
  },
  watch: {
    dialog (value) {
      if (value === false) {
        this.$emit('limpar')
      }
    }
  }
}
</script>
