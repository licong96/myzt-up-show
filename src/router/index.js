import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import upload from '@/components/upload/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'      // 重定向 和 别名
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
