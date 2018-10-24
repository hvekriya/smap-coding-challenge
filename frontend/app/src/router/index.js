import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }]
})
