<template>
  <layout-guest>
    <v-form @submit.prevent="login">
      <v-card class="elevation-8" light>
        <v-card-title class="text--xs-center">
          <h1 class="text-xs-center">DocsApp</h1>
        </v-card-title>

        <v-card-text>
          <v-text-field
            append-icon="person"
            name="login"
            label="Login"
            v-model="form.username"
            ref="username"
            :autofocus="true"
            type="text"
          />

          <v-text-field
            id="password"
            append-icon="lock"
            v-model="form.password"
            name="password"
            label="Senha"
            type="password"
          />

          <v-alert
            :value="alert"
            mode="fade-transition"
            type="error"
          >
            {{errorMessage}}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-btn flat type="submit" block color="primary">
            <v-icon>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </layout-guest>
</template>

<script>
import { mapActions } from 'vuex'

import LayoutGuest from '../layouts/Guest'

export default {
  name: 'Login',
  data () {
    return {
      alert: false,
      errorMessage: 'Falha ao realizar o login',
      form: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    LayoutGuest
  },
  methods: {
    ...mapActions('auth', [
      'authLogin'
    ]),
    async login () {
      try {
        await this.authLogin(this.form)
      } catch (e) {
        let error = e.response.data
        if (error.hasOwnProperty('non_field_errors')) {
          this.errorMessage = error['non_field_errors'][0]
        }
        this.alert = true
        requestAnimationFrame(() => {
          this.$refs.username.focus()
        })
        return false
      }
      this.$router.push({ path: '/' })
    }
  }
}
</script>
