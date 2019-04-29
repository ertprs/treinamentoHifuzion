import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/es5/locale/pt'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont'
import theme from './theme'

Vue.use(Vuetify, {
  theme,
  options: {
    customProperties: true
  },
  iconfont: 'mdi',
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
