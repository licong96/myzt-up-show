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
import selectianOne from '@/components/selectian/one/one'
import selectianTwo from '@/components/selectian/two/two'
import selectianThree from '@/components/selectian/three/three'
import selectianFour from '@/components/selectian/four/four'
import wechat from '@/components/bind-wechat/bind-wechat'
import gobing from '@/components/bind-wechat/gobing/gobing'
import goregister from '@/components/bind-wechat/goregister/goregister'
import setuser from '@/components/my/setuser/setuser'
import portrait from '@/components/my/setuser/portrait/portrait'

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
          path: 'detail/:id',                // ：id变量为路由，首页详细页
          component: detail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: 'detail/:id',
          component: detail
        }
      ]
    },
    {
      path: '/upload/:id',
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
        },
        {
          path: 'setuser',
          name: 'setuser',
          components: {
            detail: setuser
          },
          children: [
            {
              path: 'portrait',
              name: 'portrait',
              component: portrait
            }
          ]
        }
      ]
    },
    {
      path: '/account',          // 登录注册，独立一个view
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
          components: {
            selectian: selectian
          },
          children: [               // 选择身份
            {
              path: 'one',
              component: selectianOne
            },
            {
              path: 'two',
              component: selectianTwo
            },
            {
              path: 'three',
              component: selectianThree
            },
            {
              path: 'four',
              component: selectianFour
            }
          ]
        }
      ]
    },
    {
      path: '/wechat',          // 绑定微信登录
      name: 'wechat',
      component: wechat,
      children: [
        {
          path: 'gobing',
          component: gobing
        },
        {
          path: 'goregister',
          component: goregister
        }
      ]
    }
  ]
})
