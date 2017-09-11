<template lang="html">
  <section class="my">
    <div class="top">
      <div class="header">
        <mu-icon-button icon="close" slot="left" @click="back"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
        <!-- settings -->
      </div>
      <div class="head-color" ref="header"></div>
      <div class="user-logo-wrapper" ref="userLogo">
        <div class="user-logo">
          <img class="img" src="../../common/images/portrait4.png">
        </div>
      </div>
      <div class="nav-paper" ref="navPaper">
        <mu-paper>
          <mu-bottom-nav :value="bottomNav" shift>
            <mu-bottom-nav-item value="myUpload" title="上传的" icon="cloud_done" to="/my/myUpload"/>
            <mu-bottom-nav-item value="myRecommend" title="关注的" icon="star" to="/my/myRecommend"/>
            <mu-bottom-nav-item value="myCollect" title="收藏的" icon="favorite" to="/my/myCollect"/>
          </mu-bottom-nav>
        </mu-paper>
      </div>
    </div>
    <alloy-scroll ref="scrolls" :scroll-value="scrollValue" :scroll-head="scrollHead" @scroll="scroll">
      <div class="content">
        <keep-alive>
          <router-view name="list"></router-view>
        </keep-alive>
      </div>
    </alloy-scroll>
    <!-- 详细页命名视图 -->
    <transition name="tranx">
      <router-view name="detail"></router-view>
    </transition>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import Transform from 'css3transform'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        scrollValue: true,            // 返回滚动value
        scrollHead: 56,               // min要减去的额外高度
        bottomNav: 'myUpload'         // 导航切换，当前选中的
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.header = this.$refs.header
        this.userLogo = this.$refs.userLogo
        this.navPaper = this.$refs.navPaper
        Transform(this.header)
        Transform(this.userLogo)
        Transform(this.navPaper, true)
        this.headerHeight = this.header.clientHeight     // header高度
        this.navMaxHeight = this.headerHeight - 55      // 导航上滑最大高度
        this.scaleY = 0           // 缩放大小
        // 内容高度
        this.header.originY = -this.headerHeight       // ransform-origin为 center top
        this.header.translateY = -this.headerHeight    // 一半
      })
    },
    computed: {
      ...mapGetters([         // 获取
        'userInfo',
        'alloyCountHeight'
      ])
    },
    methods: {
      scroll (obj) {
        if (obj.value < 0) {      // 上滑缩小
          if (obj.value < -this.headerHeight) {     // 规定最小值
            obj.value = -this.headerHeight
          }
          this.scaleY = (280 + obj.value) / 280    // 计算缩小比例
          // console.log(this.scaleY)
          this.header.scaleY = this.scaleY
          this.userLogo.scaleX = this.userLogo.scaleY = this.scaleY
          this.userLogo.translateY = obj.value / 3.4
          // 导航最大上滑距离
          if (obj.value < -this.navMaxHeight) {
            this.navPaper.translateY = -this.navMaxHeight
          } else {
            this.navPaper.translateY = obj.value
          }
        } else {      // 下滑放大
          this.scaleY = 1 + obj.value / 240      // 计算放大比例
          // console.log(this.scaleY)
          this.header.scaleY = this.scaleY
          this.userLogo.scaleX = this.userLogo.scaleY = this.scaleY
          this.userLogo.translateY = obj.value / 1.7
          this.navPaper.translateY = obj.value / 1.2
        }
      },
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.push({
          path: '/home'
        })
      }
    },
    beforeRouteEnter (to, from, next) {       // 在渲染该组件的对应路由被 confirm 前调用
      next(vm => {
        vm.bottomNav = to.name
      })
    },
    beforeRouteUpdate (to, from, next) {    // 在当前路由改变，但是该组件被复用时调用
      this.bottomNav = to.name
      next()
      if (to.name === 'myDetail') {   // 打开详细页不执行
        return false
      }
      if (from.name === 'myDetail') {
        return false
      }
      this.$nextTick(() => {    // 检测图片是否加载完毕，用vuex保存状态，再初始化滚动，这是临时的
        this.$refs.scrolls.to(0)
        this.$refs.scrolls.countHeight(this.scrollHead)
      })
    },
    watch: {
      alloyCountHeight () {
        this.$refs.scrolls.countHeight(this.scrollHead)
      }
    },
    components: {
      AlloyScroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .top {
    position: relative;
    z-index: 2;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 0 8px;
      width: 100%;
      height: 56px;
      background-color: $color-background;
      color: #fff;
      .mu-icon-button {
        z-index: 4;
      }
    }
    .head-color {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 152px;
      background-color: $color-background;
    }
    .user-logo-wrapper {
       position: absolute;
       top: 0;
       left: 0;
       z-index: 3;
       width: 100%;
       text-align: center;
       font-size: 0;
       .user-logo {
         display: inline-block;
         margin-top: 40px;
         border: 2px solid #fff;
         width: 80px;
         height: 80px;
         border-radius: 50%;
         background-color: #ededed;
         box-sizing: border-box;
         .img{
           width: 100%;
           height: 100%;
           border-radius: 50%;
         }
       }
     }
    .nav-paper {
      position: absolute;
      top: 150px;
      left: 0;
      width: 100%;
      z-index: 2;
      box-shadow: none;
    }
    .mu-paper {
      box-shadow: none;
    }
  }
  .content {
    position: relative;
    z-index: 1;
    padding-top: 150px;
    p {
      height: 100px;
      margin: 0;

    }
  }
</style>
