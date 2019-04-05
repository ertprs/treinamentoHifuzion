import { mapState, mapActions } from 'vuex'

const clienteMixIn = {
  data () {
    return {
      headersCliente: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'nome', width: '400' },
        { text: 'Fone', value: 'fone', width: '200' },
        { text: 'Email', value: 'email' },
        { text: 'Conta', value: 'conta_display', width: '200' },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ],
      loadingCliente: false,
      formCliente: {},
      dialogCliente: false,
      hasErrorCliente: false,
      errorMessageCliente: ''
    }
  },
  computed: {
    ...mapState([
      'clientes'
    ])
  },
  methods: {
    ...mapActions([
      'listarClientes',
      'salvarCliente',
      'apagarCliente'
    ]),
    reload () {
      this.loadingCliente = true
      this.listarClientes().then(
        () => { this.loadingCliente = false }
      ).catch(
        err => {
          this.hasErrorCliente = true
          this.errorMessageCliente = err
        }
      )
    },
    editCliente (cliente) {
      this.formCliente = cliente
      this.dialogCliente = true
    },
    deleteCliente (cliente) {
      if (confirm(`Tem certeza que quer apagar o cliente ${cliente.nome}?`)) {
        this.apagarCliente(cliente)
      }
    },
    salvar () {
      this.loadingCliente = true
      this.salvarCliente(this.formCliente).then(
        () => {
          this.formCliente = {}
          this.dialogCliente = false
          this.loadingCliente = false
        }
      ).catch(
        err => {
          this.hasErrorCliente = true
          this.errorMessageCliente = err
          setTimeout(() => {
            this.hasErrorCliente = false
            this.loadingCliente = false
          }, 3000)
        }
      )
    }
  },
  mounted () {
    this.reload()
  }
}

export default clienteMixIn
