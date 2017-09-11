<template lang="html">
  <section class="home">
    <alloy-scroll class="listview" ref="scrolls" :scroll-value="scrollValue" @scroll="scroll">
      <div class="home-touch" ref="refelement">
        <header class="header">
          <mu-appbar title="首页">
            <mu-icon-button icon="search" slot="left" to="/search"/>
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
              <mu-bottom-nav-item value="upload/0" title="上传项目" icon="cloud_upload"/>
              <mu-bottom-nav-item value="my/myUpload" title="我上传的项目" icon="cloud_done"/>
              <mu-bottom-nav-item value="my/myRecommend" title="我关注的项目" icon="star"/>
            </mu-bottom-nav>
          </mu-paper>
        </section>
        <!-- 左右滑动筛选 -->
        <section class="filtrate" ref="scroll" data-slideout-ignore>
          <ul class="label-wrap" ref="target">
            <li class="label" v-for="(item, index) in filtrate" @click="screenItem(item.id, index)">
              <mu-flat-button class="demo-flat-button" :class="{active: index===labelActive}">{{item.cname}}</mu-flat-button>
            </li>
          </ul>
        </section>
        <!-- 项目列表 -->
        <section class="item-wrap">
          <my-item @select="selectLink" :data="list"></my-item>
        </section>
      </div>
    </alloy-scroll>
    <!-- 详细页容器 -->
    <transition name="tranx" mode="in-out">
      <router-view class="homeview"></router-view>
    </transition>
  </section>
</template>

<script>
  import Swipe from 'swipejs'
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'
  import MyItem from '@/base/item/item'
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        swipeImg: [],         // 轮播图
        imgLoadOne: true,
        currentIndex: 0,      // 轮播图下面的点
        filtrate: [],         // 分类
        list: [],             // 列表数据
        labelActive: -1,      // 分类切换class
        scrollValue: true,    // 是否返回滑动value值
        loadmore: true,       // 执行滑动加载
        page: 1               // 加载数据的页数
      }
    },
    created () {
      this.getIndexData()      // 获取轮播图和分类数据
      this.getItemData()      // 获取项目数据
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'homeItem'
      ])
    },
    methods: {
      getIndexData () {        // 获取轮播图和分类数据
        let self = this
        this.axios.get('/api/index/index')
          .then(function (response) {
            // console.log(response)
            let arrPic = []
            for (let i = 0; i < response.data.adlist.length; i++) {
              arrPic.push(response.data.adlist[i].pic)
            }
            self.swipeImg = arrPic
            response.data.industry.unshift({id: '', cname: '全部'})
            self.filtrate = response.data.industry
            self.$nextTick(() => {
              self.mySwipe()
              self.myTransformX()
              self.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
            })
          })
      },
      getItemData () {        // 获取项目数据
        let self = this
        this.axios.get('/api/index/projectlist')
          .then(function (response) {
            // console.log(response)
            if (response.data.code === 1) {
              self.list = response.data.list
            }
            self.$nextTick(() => {
              self.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
            })
          })
      },
      handleChange (path) {      // 快速链接
        if (this.userInfo.user_id) {
          this.$router.push({
            path: `/${path}`
          })
        } else {
          this.setLoginLink({loginLink: `/${path}`})          // 保存到全局去，登录完后跳到
          this.setDialog({muDialog: true})
          this.setDialogText({muDialogText: '您还没有登陆'})
          this.setDialogUrl({muDialogUrl: '/home/account/login'})
        }
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        // console.log(item)
        this.setHomeItem({homeItem: item})      // 把当前列表需要的数据保存
        this.$router.push({
          path: `/home/detail/${item.id}`
        })
      },
      screenItem (id, index) {        // 分类筛选
        this.labelActive = index      // 修改class颜色
        let self = this
        this.axios.post('/api/index/projectlist', {industry: id})
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              self.list = response.data.list
              self.$nextTick(() => {
                self.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
              })
            }
          })
      },
      scroll (obj) {            // 滑动加载更多
        if (obj.value <= obj.min + 5 && this.loadmore) {
          let self = this
          this.loadmore = false
          this.axios.post('/api/index/projectlist', {page: this.page})
            .then(function (response) {
              console.log(response)
              if (response.data.list.length) {
                self.list = response.data.list
                self.page ++
              }
              setTimeout(() => {        // 权益之计
                self.loadmore = true
              }, 500)
            })
        }
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
          this.$nextTick(() => {
            this.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
          })
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
          step: 45,
          initialValue: 0, // 初始值
          change: function (value) {
          },
          pressMove: function (evt, value) {
            // console.log(evt.deltaX, evt.deltaY, value)
          },
          animationEnd: function (value) {
          }
        })
      },
      ...mapActions([
        'setDialog',
        'setDialogText',
        'setDialogUrl',
        'setLoginLink',
        'setHomeItem'
      ])
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
        .active {
          color: $color-background;
        }
      }
    }
    // 项目列表
    .item-wrap {
      margin-top: 10px;
    }
  }
</style>
