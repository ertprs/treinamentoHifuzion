<template>
  <div id="menus">
    <hfz-crud
      :data="$store.state.menu.menus"
      :items="items"
      api-module="menu"
      api-get="load"
      api-save="save"
      api-remove="remove"
    />
  </div>
</template>

<script>
export default {
  computed: {
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        { text: 'Para', value: 'to', width: '400', component: 'v-text-field' },
        { text: 'Icone', value: 'icon', width: '400', component: 'v-text-field' },
        {
          text: 'Vinculo',
          value: 'relation',
          component: 'v-select',
          config: { items: this.$store.state.menu.menus, id: 'id', value: 'to' },
          showInTable: false
        },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ]
    }
  }
}
</script>
