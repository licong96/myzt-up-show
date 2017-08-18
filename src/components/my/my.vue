<template lang="html">
  <section class="my">
    <div class="top">
      <div class="header">
        <mu-icon-button icon="close" slot="left"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
      </div>
      <div class="head-color" ref="header"></div>
      <div class="user-logo-wrapper" ref="userLogo">
        <div class="user-logo">
          <img class="img" src="http://q3.qlogo.cn/g?b=qq&k=dsIAz3gs7bWoJ8oSicpwLcw&s=100">
        </div>
      </div>
    </div>
    <alloy-scroll ref="scrolls" :data="list" :scroll-value="scrollValue" :scroll-head="scrollHead" @scroll="scroll">
      <div class="content">
        <p v-for="(item, index) in list">{{index}}</p>
      </div>
    </alloy-scroll>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import Transform from 'css3transform'

  export default {
    data () {
      return {
        list: ['1', '2', '3', '3', '3', '3', '3', '3', '3', '3', '3'],
        scrollValue: true,          // 返回滚动value
        scrollHead: 56               // min要减去的额外高度
      }
    },
    created () {
      this.alloyTouch = null
    },
    mounted () {
    },
    methods: {
      scroll (value) {
        console.log(value)
        let header = this.$refs.header
        let userLogo = this.$refs.userLogo
        // 内容高度
        Transform(header)
        header.originY = -70        // ransform-origin为 center top
        header.translateY = -70
        Transform(userLogo)

        // 因为上下文都在改变value的值，所以先后顺序不能变
        if (value < 0) {      // 上滑缩小
          if (value < -140) {     // 规定最小值
            value = -140
          }
          let scaleY = (240 + value) / 240    // 计算缩小比例
          // console.log(scaleY)
          header.scaleY = scaleY
          userLogo.scaleX = userLogo.scaleY = scaleY
          userLogo.translateY = value / 1.7
        } else {      // 下滑放大
          let scaleY = 1 + value / 240      // 计算放大比例
          // console.log(scaleY)
          header.scaleY = scaleY
          userLogo.scaleX = userLogo.scaleY = scaleY
          userLogo.translateY = value / 1.7
        }
      },
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
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
        z-index: 3;
      }
    }
    .head-color {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 140px;
      background-color: $color-background;
    }
    .user-logo-wrapper {
       position: absolute;
       top: 0;
       left: 0;
       z-index: 2;
       width: 100%;
       text-align: center;
       font-size: 0;
       .user-logo {
         display: inline-block;
         margin-top: 90px;
         border: 2px solid #fff;
         width: 100px;
         height: 100px;
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
  }
  .content {
    p {
      height: 100px;
    }
  }
</style>
