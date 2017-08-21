<template>
  <div id="app">
    <!-- 导航 -->
    <nav ref="menu">
      <slide-nav></slide-nav>
    </nav>
    <!-- 内容 -->
    <section ref="panel" class="home-scroll">
      <transition name="opacity">
        <router-view></router-view>
      </transition>
    </section>
    <!-- 加载中 -->
    <transition name="fade">
      <section class="progress" v-show="progress">
        <mu-circular-progress :size="40"/>
      </section>
    </transition>
  </div>
</template>

<script>
  import SlideNav from '@/base/nav/nav'
  import Slideout from 'slideout'

  export default {
    name: 'app',
    data () {
      return {
        progress: true
      }
    },
    created () {
      setTimeout(() => {
        this.progress = false
      }, 2000)
    },
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
        window.slideNav.disableTouch()    // 禁止滑动打开关闭
      }
    },
    components: {
      SlideNav
    }
  }
</script>

<style lang="scss" scoped>
  .home-scroll {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .progress {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    .mu-circular-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -20px 0 0 -20px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
</style>
