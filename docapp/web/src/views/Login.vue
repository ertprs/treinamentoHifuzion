<template>
  <v-flex
    xs12
    sm8
    md4
  >
    <v-form
      ref="form"
      @submit.prevent="login"
      v-model="form"
    >
      <v-card
        class="elevation-12"
        light
      >
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>DocsApp Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                dark
                large
                v-on="on"
              >
                <v-icon>lock</v-icon>
              </v-btn>
            </template>
            <span>Recuperar Senha</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-alert
            :value="error.has"
            color="error"
          >
            {{error.message}}
          </v-alert>
          <v-text-field
            prepend-icon="person"
            label="Usuário"
            :rules="rules.username"
            v-model="credentials.username"
            type="text"
            autofocus
          ></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="lock"
            label="Senha"
            :rules="rules.password"
            v-model="credentials.password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat
            block
            color="primary"
            type="submit"
            :disabled="!form"
            :loading="loading"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-flex>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      form: false,
      loading: false,
      error: {
        has: false,
        message: 'Erro ao efetuar o login'
      },
      rules: {
        username: [
          v => !!v || 'Usuário é obrigatório'
        ],
        password: [
          v => !!v || 'Senha é obrigatória',
          v => v.length >= 6 || 'Senha não pode ter menos de 6 caracteres'
        ]
      },
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        console.log('Chamou o login')
        this.loading = false
      }, 3000)
    }
  },
  mounted () {
    this.$refs.form.validate()
  }
}
</script>
