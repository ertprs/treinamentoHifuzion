import Vue from 'vue'
import CrudForm from './crud/Form'
import CrudLista from './crud/Lista'
import Crud from './crud/Crud'
import Menu from './Menu'

Vue.component('hfz-menu', Menu)
Vue.component('hfz-form', CrudForm)
Vue.component('hfz-lista', CrudLista)
Vue.component('hfz-crud', Crud)
