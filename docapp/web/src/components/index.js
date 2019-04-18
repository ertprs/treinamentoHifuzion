import Vue from 'vue'
import CrudForm from './crud/Form'
import CrudLista from './crud/Lista'
import Menu from './Menu'

Vue.component('hfz-menu', Menu)
Vue.component('hfz-form', CrudForm)
Vue.component('hfz-lista', CrudLista)
