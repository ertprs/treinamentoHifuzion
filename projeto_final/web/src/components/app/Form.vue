<template>
  <div id="form">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
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
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="salvar"
      >
        <v-card class="elevation-1 mt-2">
          <v-card-title>
            <h3>{{ title }}</h3>
            <v-alert
              :value="error.has"
              type="error"
            >
              {{ error.message }}
            </v-alert>

          </v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <template v-for="item in formItems">
                <v-flex xs12 :key="item.value">
                  <component
                    v-if="item.component == 'v-text-field' || item.component == 'v-textarea'"
                    :ref="`form${item.value}`"
                    :is="item.component"
                    :rules="item.rules || []"
                    :label="item.text"
                    v-model="form[item.value]"
                  ></component>
                  <component
                    v-else-if="item.component == 'v-select'"
                    :ref="`form${item.value}`"
                    :is="item.component"
                    :rules="item.rules || []"
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
          <v-card-actions>
            <v-btn
              flat
              color="red darken-3"
              outline
              @click="dialog = false"
              :loading="loading"
            >Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="primary darken-3"
              outline
              type="submit"
              :disabled="!valid"
              :loading="loading"
            >Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    apiSave: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      error: {
        has: false,
        message: 'Ops! Algo errado ocorreu.'
      },
      loading: false,
      dialog: false,
      valid: false
    }
  },
  methods: {
    show () {
      this.dialog = true
    },
    async salvar () {
      this.loading = true
      try {
        await this.$store.dispatch(this.apiSave, this.form)
        this.loading = false
        this.dialog = false
        this.$emit('reload')
      } catch (err) {
        this.error.has = true
        this.error.message = err
        this.loading = false

        try {
          let focus = `form${err.toString().split(':')[1].replace(' ', '')}`
          this.$nextTick(() => this.$refs[focus][0].focus())
        } catch (e) {
          console.log('epa!', e)
        }
      }
    }
  },
  watch: {
    dialog (value) {
      if (value === false) {
        this.$emit('clearForm')
      } else {
        this.$refs.form.validate()
        let focus = `form${this.formItems.filter(f => f.value !== 'id')[0].value}`
        this.$nextTick(() => this.$refs[focus][0].focus())
      }
    }
  }
}
</script>
