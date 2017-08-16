<template>
  <div id="app">
    <!-- 导航 -->
    <nav ref="menu">
      <slide-nav></slide-nav>
    </nav>
    <!-- 内容 -->
    <section ref="panel">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import SlideNav from '@/base/nav/nav'
  import Slideout from 'slideout'

  export default {
    name: 'app',
    created () {},
    mounted () {
      setTimeout(() => {
        this.initSlideout()
      }, 20)
    },
    methods: {
      initSlideout () {     // 初始化侧边栏导航
        let panel = this.$refs.panel
        let menu = this.$refs.menu
        window.slideNav = new Slideout({
          'panel': panel,
          'menu': menu,
          'side': 'right',
          'padding': 250,
          'tolerance': 70
        })
        // window.slideNav.disableTouch()    // 禁止滑动打开关闭
      }
    },
    components: {
      SlideNav
    }
  }
</script>

<style lang="scss" scoped>
</style>
