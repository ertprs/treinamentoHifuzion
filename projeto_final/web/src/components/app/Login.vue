<template>
  <div id="form">
    <v-dialog
      v-model="loginModalShow"
      persistent
      max-width="500"
    >
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="login"
      >
        <v-card class="elevation-1 mt-2">
          <v-card-title>
            Login
            <v-alert
              :value="error.has"
              type="error"
            >
              {{ error.message }}
            </v-alert>

          </v-card-title>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  ref="username"
                  :rules="rules.username"
                  label="Usuário"
                  v-model="credentials.username"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  ref="password"
                  :rules="rules.password"
                  label="Senha"
                  type="password"
                  v-model="credentials.password"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="primary darken-3"
              outline
              type="submit"
              :disabled="!valid"
              :loading="loading">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      credentials: {},
      rules: {
        username: [v => !!v || 'Usuário é obrigatório'],
        password: [v => !!v || 'Senha é obrigatório']
      },
      error: {
        has: false,
        message: 'Ops! Algo errado ocorreu.'
      },
      loading: false,
      dialog: true,
      valid: false
    }
  },
  computed: {
    ...mapState('auth', ['profile']),
    ...mapGetters('auth', ['loginModalShow'])
  },
  methods: {
    ...mapActions('auth', ['authLogin']),
    login () {
      this.loading = true
      this.authLogin(this.credentials)
        .then(res => {
          self.loading = false
          this.dialog = false
          this.$router.go()
        })
        .catch(err => {
          this.error.has = true
          this.error.message = err
          this.loading = false
        })
    }
  }
}
</script>
