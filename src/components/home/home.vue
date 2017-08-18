<template lang="html">
  <section class="home">
    <alloy-scroll class="listview" :topstop="topstop" ref="scrolls">
      <div class="home-touch" ref="refelement">
        <header class="header">
          <mu-appbar title="首页">
            <mu-icon-button icon="search" slot="left"/>
            <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
          </mu-appbar>
        </header>
        <!-- 轮播图 -->
        <section id="slider" class="swipe" ref="swipes" data-slideout-ignore>
          <div class="swipe-wrap">
            <div class="item" v-for="item in swipeImg"><img class="item-img" :src="item" @load="loadImage"></div>
          </div>
          <div class="desc">
            <span class="current" v-for="(item, index) in swipeImg.length" :class="{active: currentIndex===index}"></span>
          </div>
        </section>
        <!-- 快速链接 -->
        <section class="quick-link">
          <mu-paper>
            <mu-bottom-nav @change="handleChange">
              <mu-bottom-nav-item value="upload" title="上传项目" icon="cloud_upload"/>
              <mu-bottom-nav-item value="" title="我上传的项目" icon="cloud_done"/>
              <mu-bottom-nav-item value="" title="我推荐的项目" icon="record_voice_over"/>
            </mu-bottom-nav>
          </mu-paper>
        </section>
        <!-- 左右滑动筛选 -->
        <section class="filtrate" ref="scroll" data-slideout-ignore>
          <ul class="label-wrap" ref="target">
            <li class="label" v-for="item in filtrate"><mu-flat-button class="demo-flat-button">{{item}}</mu-flat-button></li>
          </ul>
        </section>
        <!-- 项目列表 -->
        <section class="item-wrap">
          <my-item @select="selectLink"></my-item>
        </section>
      </div>
    </alloy-scroll>
    <!-- 详细页容器 -->
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import Swipe from 'swipejs'
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'
  import MyItem from '@/base/item/item'
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'

  export default {
    data () {
      return {
        swipeImg: [     // 轮播图
          'http://www.my930.com/sites/default/files/public/6821495528799.jpeg',
          'http://www.my930.com/sites/default/files/public/6821488772475.jpeg',
          'http://www.my930.com/sites/default/files/public/6821495528753.jpeg',
          'http://www.my930.com/sites/default/files/public/6821483582164.jpeg'
        ],
        imgLoadOne: true,
        currentIndex: 0,   // 轮播图下面的点
        filtrate: ['标签一', '标签二', '标签三', '标签四', '标签五', '标签六', '标签七', '标签八', '标签九'],
        topstop: true       // 滚动到顶部停止，别弹动了
      }
    },
    created () {
    },
    mounted () {
      setTimeout(() => {
        this.mySwipe()
        this.myTransformX()
        this.$refs.scrolls.countHeight()      // 从新计算页面滚动高度
      }, 20)
    },
    methods: {
      handleChange (path) {      // 快速链接
        this.$router.push({
          path: `/${path}`
        })
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/home/detail/${item}`
        })
      },
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
      loadImage () {      // 轮播图片加载完成后，从新计算高度
        if (this.imgLoadOne) {      // 只加载一次
          this.imgLoadOne = false
          setTimeout(() => {
            this.$refs.scrolls.countHeight()      // 从新计算页面滚动高度
          }, 20)
        }
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
    components: {
      MyItem,
      AlloyScroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .home {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .swipe {
      overflow: hidden;
      visibility: hidden;
      position: relative;
      max-height: 200px;
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
    // 快速链接
    .quick-link {
      padding: 15px 15px;
      background: #fff;
      @include border(t);
      @include border(b);
      .mu-buttom-item {
        color: $color-background;
      }
    }
    // 可左右滑动筛选标签
    .filtrate {
      position: relative;
      margin-top: 10px;
      height: 40px;
      background-color: #fff;
      @include border(t);
      @include border(b);
      .mu-flat-button {
        height: 40px;
        line-height: 40px;
      }
      .label-wrap {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-wrap: nowrap;
        .label {
          // @include border(r);
        }
      }
    }
    // 项目列表
    .item-wrap {
      margin-top: 10px;
    }
  }
</style>
