import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const _axios = axios.create({
  baseURL: 'http://localhost:8000/'
})

Vue.use(VueAxios, _axios)

export default _axios
