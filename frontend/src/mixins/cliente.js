import { mapState, mapActions } from 'vuex'

const clienteMixIn = {
  data () {
    return {
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'nome', width: '400' },
        { text: 'Fone', value: 'fone', width: '200' },
        { text: 'Email', value: 'email' },
        { text: 'Conta', value: 'conta_display', width: '200' },
        { text: 'Opções', value: '', width: '10', sortable: false }
      ],
      loading: false,
      form: {},
      dialog: false,
      hasError: false,
      errorMessage: ''
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
    limparForm () {
      this.form = {}
    },
    async reload () {
      try {
        this.loading = true
        await this.listarClientes()
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
    remove (item) {
      if (confirm(`Tem certeza que quer apagar o cliente ${item.nome}?`)) {
        this.apagarCliente(item)
      }
    },
    salvar () {
      this.loading = true
      this.salvarCliente(this.form).then(
        () => {
          this.form = {}
          this.dialog = false
          this.loading = false
        }
      ).catch(
        err => {
          this.hasError = true
          this.errorMessage = err
          setTimeout(() => {
            this.hasError = false
            this.loading = false
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
