import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import upload from '@/components/upload/upload'
import detail from '@/components/detail/detail'
import my from '@/components/my/my'

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
      component: home,
      children: [
        {
          path: 'detail/:id',                // ：id变量为路由
          component: detail
        }
      ]
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
