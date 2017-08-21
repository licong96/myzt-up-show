import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import search from '@/components/search/search'
import upload from '@/components/upload/upload'
import detail from '@/components/detail/detail'
import my from '@/components/my/my'
import myUpload from '@/components/my/my-upload/my-upload'
import myRecommend from '@/components/my/my-recommend/my-recommend'
import myCollect from '@/components/my/my-collect/my-collect'

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
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/my',
      component: my,
      children: [
        {
          path: 'myUpload',
          name: 'myUpload',
          component: myUpload
        },
        {
          path: 'myRecommend',
          name: 'myRecommend',
          component: myRecommend
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          component: myCollect
        }
      ]
    },
    {
      path: '/my/item/:id',     // 我的列表详细页
      name: 'myitem',
      component: detail
    }
  ]
})
