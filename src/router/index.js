import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
