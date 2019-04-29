<template>
  <div id="clientes">
    <v-container fluid
                 grid-list-md>
      <v-layout wrap row>
        <v-flex
          sm12
          md3
        >
          <material-chart-card
            :data="dailySalesChart.data"
            :options="dailySalesChart.options"
            color="info"
            type="Line"
          >
            <h4 class="title font-weight-light">Daily Sales</h4>
            <p class="category d-inline-flex font-weight-light">
              <v-icon
                color="green"
                small
              >
                mdi-arrow-up
              </v-icon>
              <span class="green--text">55%</span>&nbsp;
              increase in today's sales
            </p>

            <template slot="actions">
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
            </template>
          </material-chart-card>
        </v-flex>
        <v-flex md9 sm12>
          <v-layout wrap row>
            <v-flex
              sm6
              xs12
            >
              <material-stats-card
                color="green"
                icon="mdi-store"
                title="Clientes"
                :value="clientes.length.toString()"
              />
            </v-flex>
            <v-flex
              sm6
              xs12
            >
              <material-stats-card
                color="orange"
                icon="mdi-content-copy"
                title="Total Balance"
                :value="totalBalance.toLocaleString()"
                small-value="R$"
              />
            </v-flex>
            <v-flex xs12>
              <app-crud style="margin-top: -70px;"
                        title="Clientes"
                        :items="items"
                        :data="clientes"
                        apiModule="cliente"
              ></app-crud>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      }
    }
  },
  computed: {
    ...mapState('cliente', ['clientes']),
    requiredField () {
      return v => !!v || 'Campo obrigatório'
    },
    totalBalance () {
      return this.clientes.reduce((pre, ele) => pre + ele.balance_display, 0)
    },
    items () {
      return [
        { text: '#', value: 'id', width: '10', component: 'v-text-field' },
        {
          text: 'Nome',
          value: 'name',
          width: '200',
          component: 'v-text-field',
          rules: [this.requiredField]
        },
        { text: 'Fone', value: 'phone', width: '100', component: 'v-text-field', rules: [this.requiredField] },
        {
          text: 'Email',
          value: 'email',
          component: 'v-text-field',
          rules: [
            this.requiredField,
            v => /[\w_.-]+@[\w-]+\.[\w-]{1,3}(?:\.[\w-]{1,3})?/.test(v) || 'Insira um email válido'
          ]
        },
        {
          text: 'Tipo',
          value: 'type_person_display',
          width: '100'
        },
        {
          text: 'Tipo',
          value: 'type_person',
          component: 'v-select',
          config: { items: this.$store.state.cliente.types, id: 'id', value: 'name' },
          showInTable: false
        },
        {
          text: 'Endereço',
          value: 'address',
          component: 'v-textarea',
          showInTable: false,
          rules: [this.requiredField]
        },
        {
          text: 'Saldo',
          value: 'balance_display',
          align: 'right',
          width: '100'
        },
        { text: 'Opções', value: '', width: '10', sortable: false, component: 'v-text-field' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
