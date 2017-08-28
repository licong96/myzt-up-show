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
import account from '@/components/account/account'
import register from '@/base/register/register'
import login from '@/base/login/login'
import selectian from '@/components/selectian/selectian'

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
        },
        {
          path: 'account',          // 登录注册
          component: account,
          children: [
            {
              path: 'login',
              name: 'login',
              component: login
            },
            {
              path: 'register',
              name: 'register',
              component: register
            },
            {
              path: 'selectian',          // 选择投资人，项目方等
              name: 'selectian',
              component: selectian
            }
          ]
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
          components: {
            list: myUpload
          }
        },
        {
          path: 'myRecommend',
          name: 'myRecommend',
          components: {
            list: myRecommend
          }
        },
        {
          path: 'myCollect',
          name: 'myCollect',
          components: {
            list: myCollect
          }
        },
        {
          path: 'detail/:id',     // 我的列表详细页，命名视图
          name: 'myDetail',
          components: {
            detail: detail
          }
        }
      ]
    }
  ]
})
