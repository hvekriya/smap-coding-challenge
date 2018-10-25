import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/index'
import consumer from '@/views/consumer'
import addConsumer from '@/views/addConsumer'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }, {
    path: '/consumer/:id',
    name: 'consumer',
    component: consumer
  }, {
    path: '/new-consumer',
    name: 'addConsumer',
    component: addConsumer
  }]
})
