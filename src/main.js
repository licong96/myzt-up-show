// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'

import '@/common/css/normalize.css'
import 'muse-ui/dist/muse-ui.css'
import '@/common/css/theme-light.css' // 使用 light 主题
import '@/common/sass/museui-reset.scss'  // 修改样式

Vue.use(MuseUI)

Vue.config.productionTip = false

window.slideNav = null      // 全局变量用来保存侧边栏导航

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
