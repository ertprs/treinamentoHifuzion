import Vue from 'vue'
import Toolbar from './Toolbar'
import Lista from './crud/Lista'
import Form from './crud/Form'
import Todo from './Todo'
import ListaTodo from './todo/Lista'

Vue.component('hfz-menu', Toolbar)
Vue.component('hfz-form', Form)
Vue.component('hfz-lista', Lista)
Vue.component('hfz-todo', Todo)
Vue.component('hfz-todo-lista', ListaTodo)
