import { mapState, mapActions } from 'vuex'

const contaMixIn = {
  data () {
    return {
      headers: [
        { text: '#', value: 'id', width: '10' },
        { text: 'Nome', value: 'nome', width: '400' },
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
    ...mapState('conta', [
      'contas'
    ])
  },
  methods: {
    ...mapActions('conta', [
      'listarContas',
      'salvarConta',
      'apagarConta'
    ]),
    limparForm () {
      this.form = {}
    },
    reload () {
      this.loading = true
      this.listarContas().then(
        () => { this.loading = false }
      ).catch(
        err => {
          this.hasError = true
          this.errorMessage = err
        }
      )
    },
    edit (item) {
      this.form = item
      this.$refs.form.show()
    },
    remove (item) {
      if (confirm(`Tem certeza que quer apagar o cliente ${item.nome}?`)) {
        this.apagarConta(item)
      }
    },
    salvar () {
      this.loading = true
      this.salvarConta(this.form).then(
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

export default contaMixIn
