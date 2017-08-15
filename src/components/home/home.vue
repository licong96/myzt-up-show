<template lang="html">
  <section class="home">
    <header class="header">
      <mu-appbar title="首页">
        <mu-icon-button icon="search" slot="left"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
      </mu-appbar>
    </header>
    <!-- 轮播图 -->
    <section id="slider" class="swipe" ref="swipes">
      <div class="swipe-wrap">
        <div class="item" v-for="item in swipeImg"><img class="item-img" :src="item"></div>
      </div>
      <div class="desc">
        <span class="current" v-for="(item, index) in swipeImg.length" :class="{active: currentIndex===index}"></span>
      </div>
    </section>
    <!-- 左右滑动筛选 -->
    <section class="filtrate" ref="scroll">
      <mu-divider />
      <ul class="label-wrap" ref="target">
        <li class="label" v-for="item in filtrate"><mu-flat-button class="demo-flat-button">{{item}}</mu-flat-button></li>
      </ul>
    </section>
    <mu-divider />
  </section>
</template>

<script>
  import Swipe from 'swipejs'
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    data () {
      return {
        swipeImg: [     // 轮播图
          'http://www.my930.com/sites/default/files/public/6821495528799.jpeg',
          'http://www.my930.com/sites/default/files/public/6821488772475.jpeg',
          'http://www.my930.com/sites/default/files/public/6821495528753.jpeg',
          'http://www.my930.com/sites/default/files/public/6821483582164.jpeg'
        ],
        currentIndex: 0,   // 轮播图下面的点
        filtrate: ['标签一', '标签二', '标签三', '标签四', '标签五', '标签六', '标签七', '标签八', '标签九']
      }
    },
    mounted () {
      setTimeout(() => {
        this.mySwipe()
        this.myTransformX()
      }, 20)
    },
    methods: {
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
      },
      mySwipe () {        // 轮播图
        let self = this
        let el = this.$refs.swipes
        this.swipe = new Swipe(el, {
          startSlide: 0,
          speed: 400,
          auto: 3000,
          draggable: false,
          continuous: true,
          disableScroll: false,
          stopPropagation: false,
          callback: function(index, elem, dir) {
            self.currentIndex = index
          },
          transitionEnd: function(index, elem) {
          }
        })
      },
      myTransformX () {     // 滑动筛选标签
        let target = this.$refs.target
        let scroll = this.$refs.scroll
        Transform(target, true)

        this.alloytouch = new AlloyTouch({
          touch: scroll, // 反馈触摸的dom
          vertical: false, // 不必需，默认是true代表监听竖直方向touch
          target: target, // 运动的对象
          property: 'translateX',  // 被滚动的属性
          sensitivity: 1, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
          factor: 1,  // 不必需,默认值是1代表touch区域的1px的对应target.y的1
          min: window.innerWidth - target.clientWidth,   // 不必需,滚动属性的最小值
          max: 0,   // 不必需,滚动属性的最大值
          step: 40,
          initialValue: 0, // 初始值
          change: function (value) {
          },
          pressMove: function (evt, value) {
            // console.log(evt.deltaX, evt.deltaY, value)
          },
          animationEnd: function (value) {
          }
        })
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    .swipe {
      overflow: hidden;
      visibility: hidden;
      position: relative;
      background-color: #fff;
      .swipe-wrap {
        overflow: hidden;
        position: relative;
        .item {
          float: left;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .item-img {
          display: block;
          width: 100%;
        }
      }
      // 底部的点
      .desc {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        .current {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          background-color: rgba(255, 255, 255, .5);
          border-radius: 8px;
          &.active {
            background-color: rgba(255, 255, 255, .9);
          }
        }
      }
    }
    // 可左右滑动筛选标签
    .filtrate {
      position: relative;
      margin-top: 15px;
      height: 36px;
      background-color: #fff;
      .label-wrap {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: nowrap;
        .label {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
</style>
