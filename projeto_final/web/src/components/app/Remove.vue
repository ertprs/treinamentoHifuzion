<template>
  <v-dialog v-model="dialog" persistent max-width="375">
    <template v-slot:activator="{ on }">
      <v-icon
        small
        class="mr-1"
        v-on="on"
      >
        delete
      </v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">Remover Registro!</v-card-title>
      <v-card-text>
        Você tem certeza que deseja remover o registro?
      </v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1"
               flat
               @click="dialog = false"
               :loading="loading">
          Não, cancele!
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat
          @click="acceptRemove"
          :loading="loading">
          Sim, pode apagar!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    apiRemove: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    async acceptRemove () {
      try {
        await this.$store.dispatch(this.apiRemove, this.item)
        this.$emit('removeItem', this.item)
        this.dialog = false
        this.loading = false
      } catch (e) {
        this.error.has = true
        this.error.message = e
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
