<template lang="html">
  <section class="account">
    <alloy-scroll class="listview" ref="scrolls">
      <div class="top">
        <div class="header">
          <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
          <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
        </div>
        <div class="logo">
          <img class="img" src="../../common/images/logo.png" alt="">
        </div>
        <mu-paper>
          <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item value="login" title="登录" icon="face"/>
            <mu-bottom-nav-item value="register" title="注册" icon="child_care"/>
          </mu-bottom-nav>
        </mu-paper>
      </div>
      <div class="content">
        <transition name="trany" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </alloy-scroll>
    <!-- 身份认证，单独视图 -->
    <transition name="tranx">
      <router-view name="selectian"></router-view>
    </transition>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  export default {
    data () {
      return {
        bottomNav: 'login',
        backGo: 1,                // 记录要返回的次数，我想关闭本页面
        bottomNavColor: 'movies'
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
      })
    },
    methods: {
      handleChange (val) {
        this.$router.push({
          path: `/account/${val}`
        })
      },
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {      // 不再返回上一页，而是关闭本页
        // this.$router.back()
        this.$router.go(-this.backGo)
      }
    },
    beforeRouteEnter (to, from, next) {       // 在渲染该组件的对应路由被 confirm 前调用
      next(vm => {
        vm.bottomNav = to.name
      })
    },
    beforeRouteUpdate (to, from, next) {    // 在当前路由改变，但是该组件被复用时调用
      this.bottomNav = to.name
      if (to.name !== 'selectian' && from.name !== 'selectian') {       // 注册身份认证不需要记录
        this.backGo++     // 累加要返回的次数
      }
      console.log(this.backGo)
      next()
    },
    components: {
      AlloyScroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";
  .account {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    .top {
      position: relative;
      z-index: 2;
      background-color: $color-background;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 0 8px;
        width: 100%;
        height: 56px;
        color: #fff;
        .mu-icon-button {
          z-index: 4;
        }
      }
      .logo {
        width: 100px;
        margin: 30px auto 0 auto;
        padding-bottom: 84px;
        .img{
          width: 100%;
        }
      }
      .mu-paper {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-shadow: none;
      }
    }
  }
</style>
