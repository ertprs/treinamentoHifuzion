import Vue from 'vue'
import Toolbar from './Toolbar'
import Lista from './crud/Lista'
import Form from './crud/Form'
import Todo from './Todo'

Vue.component('hfz-menu', Toolbar)
Vue.component('hfz-form', Form)
Vue.component('hfz-lista', Lista)
Vue.component('hfz-todo', Todo)
