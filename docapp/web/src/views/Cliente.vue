<template>
  <div id="clientes">
    <hfz-crud
      :data="$store.state.cliente.clientes"
      :items="items"
      api-module="cliente"
      api-get="loadClientes"
      api-save="saveCliente"
      api-remove="removeCliente"
    />
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        { text: 'Nome', value: 'name', width: '400', component: 'v-text-field' },
        { text: 'Fone', value: 'phone', width: '200', component: 'v-text-field' },
        { text: 'Email', value: 'email', component: 'v-text-field' },
        {
          text: 'Tipo',
          value: 'type_person_display',
          width: '200'
        },
        {
          text: 'Tipo',
          value: 'type_person',
          component: 'v-select',
          config: { items: this.$store.state.cliente.types, id: 'id', value: 'name' },
          showInTable: false
        },
        { text: 'Endereço', value: 'address', width: '200', component: 'v-textarea', showInTable: false },
        { text: 'Opções', value: '', width: '10', sortable: false, component: 'v-text-field' }
      ]
    }
  }
}
</script>
