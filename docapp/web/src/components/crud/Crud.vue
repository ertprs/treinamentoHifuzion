<template>
  <div id="clientes">
    <v-alert
      :value="hasError"
      type="error"
    >
      {{errorMessage}}
    </v-alert>

    <hfz-lista
      :headers="headers"
      :items="data"
      :loading="loading"
      @reloadItems="reload"
      @editItem="edit"
      @deleteItem="remove"
    />

    <hfz-form
      ref="form"
      :api-module="apiModule"
      titulo="Formulário de Clientes"
      :api-salvar="apiSave"
      :form="form"
      @atualizar="reload"
      @limpar="limparForm"
    >
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <template v-for="item in formItems">
            <v-flex xs12 :key="item.value">
              <component
                v-if="item.component == 'v-text-field' || item.component == 'v-textarea'"
                :is="item.component"
                :label="item.text"
                v-model="form[item.value]"
              ></component>
              <component
                v-else-if="item.component == 'v-select'"
                :is="item.component"
                :items="item.config.items"
                :item-text="item.config.value"
                :item-value="item.config.id"
                :label="item.text"
                v-model="form[item.value]"
              ></component>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </hfz-form>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    apiModule: {
      type: String,
      required: true
    },
    apiGet: {
      type: String,
      required: true
    },
    apiSave: {
      type: String,
      required: true
    },
    apiRemove: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      dialog: false,
      hasError: false,
      errorMessage: ''
    }
  },
  computed: {
    headers () {
      return this.items.filter(f => typeof f.showInTable === 'undefined' ? true : f.showInTable)
    },
    formItems () {
      return this.items.filter(f => f.value !== 'id' && f.value !== '' && f.value.indexOf('display') === -1)
    }
  },
  methods: {
    getAction (action) {
      if (this.apiModule) {
        return `${this.apiModule}/${action}`
      }
      return action
    },
    limparForm () {
      this.form = {}
    },
    async reload () {
      try {
        this.loading = true
        await this.$store.dispatch(this.getAction(this.apiGet))
        this.loading = false
      } catch (err) {
        this.loading = false
        this.hasError = true
        this.errorMessage = err
      }
    },
    edit (item) {
      this.form = item
      this.$refs.form.show()
    },
    async remove (item) {
      if (confirm(`Tem certeza que quer apagar o cliente ${item.nome}?`)) {
        await this.$store.dispatch(this.getAction(this.apiRemove), item.id)
        this.reload()
      }
    },
    async salvar () {
      this.loading = true
      try {
        await this.$store.dispatch(this.getAction(this.apiSave), this.form)
        this.form = {}
        this.dialog = false
        this.loading = false
      } catch (err) {
        this.hasError = true
        this.errorMessage = err
      }
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
