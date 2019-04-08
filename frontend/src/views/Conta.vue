<template>
  <div id="contas">
    <v-alert
      :value="hasError"
      type="error"
    >
      {{errorMessage}}
    </v-alert>

    <hfz-lista
      :headers="headers"
      :items="contas"
      :loading="loading"
      @reloadItems="reload"
      @editItem="edit"
      @deleteItem="remove"
    />

    <hfz-form
      ref="form"
      titulo="Formulário de Clientes"
      :api-salvar="salvarConta"
      :form="form"
      @atualizar="reload"
      @limpar="limparForm"
    >
      <v-container
        grid-list-sm
        class="pa-4"
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm1
          >
            <v-text-field
              placeholder="ID"
              disabled
              v-model="form.id"
            ></v-text-field>
          </v-flex>
          <v-flex
            xs12
            sm11
          >
            <v-text-field
              placeholder="Nome"
              v-model="form.nome"
              autofocus
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </hfz-form>

  </div>
</template>

<script>
import contaMixIn from '../mixins/conta'
export default {
  mixins: [contaMixIn]
}
</script>

<style>
</style>
