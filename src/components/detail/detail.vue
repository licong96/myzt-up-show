<template lang="html">
  <section class="detail" ref="wrapper">
    <div ref="head">
      <header class="header">
        <mu-appbar title="项目详情">
          <mu-icon-button icon="close" slot="left" @click="back"/>
          <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
        </mu-appbar>
      </header>
      <div class="image-wrap">
        <img class="image" :src="src" @load="loadImage" ref="scaleImg">
      </div>
    </div>
    <!-- 滚动区域 -->
    <div class="scroller" ref="scroller">
      <section class="top">
        <div class="collec">
          <h3 class="name">项目名称</h3>
          <mu-checkbox label="收藏" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/>
        </div>
        <p class="introduce">项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍</p>
        <p class="city"><mu-icon class="room" value="room"/>北京 / 北京</p>
      </section>
      <section class="classify">
        <mu-list-item class="item">
          <span class="title">项目产业：</span>
          <span class="list">互联网</span>
        </mu-list-item>
        <mu-list-item class="item">
          <span class="title">项目阶段：</span>
          <span class="list">产品已发布</span>
        </mu-list-item>
        <mu-list-item class="item">
          <div class="flex-item">
            <span class="title">项目标签：</span>
            <div class="flex-1">
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签一</span>
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签二</span>
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签三</span>
            </div>
          </div>
        </mu-list-item>
      </section>
      <section class="img-txt">
        <p class="txt">项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况</p>
        <img class="image" :src="src" @load="loadImage">
        <p class="txt">项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况况项目概况项目概况项目概况项目概况项目概况项目概况项目概况项目概况</p>
      </section>
      <section class="business">
        <mu-float-button icon="file_download" class="demo-float-button"/>
        <p class="desc">下载商业计划书</p>
      </section>
    </div>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    data () {
      return {
        src: '../../../static/case.jpg'
      }
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
        this.head = this.$refs.head.clientHeight
        this.scroller = this.$refs.scroller   // 保存全局，方便调用
        this.alloy()      // 页面滚动，需要等资源全部加载完成再初始化
      }, 20)
    },
    methods: {
      alloy() {
        let self = this
        // let head = this.$refs.head.clientHeight          // 顶部距离
        let touch = this.$refs.wrapper
        // let scroller = this.$refs.scroller   // 保存全局，方便调用
        let scaleImg = this.$refs.scaleImg    // 图片放大
        let percent = 0           // 放大scale and 偏移大小 size
        // 内容高度
        Transform(this.scroller, true)   // true代表关闭透视投影，因为scroller里面是有文本，防止文本在IOS中模糊
        Transform(scaleImg)

        this.alloyTouch = new AlloyTouch({
          touch: touch,
          vertical: true,
          target: self.scroller,
          property: 'translateY',
          sensitivity: 0.8, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
          factor: 0.8, // 不必需,表示触摸位移与被运动属性映射关系，默认值是1
          min: window.innerHeight - self.scroller.clientHeight - self.head,
          max: 0,
          change: function (value) {
            percent = Math.abs(value / self.head)
            if (value > 0) {      // 下拉放大
              percent += 1
              scaleImg.scaleX = scaleImg.scaleY = percent
              scaleImg.translateY = 0
            } else {
              percent *= 100
              scaleImg.translateY = -percent
            }
          },
          touchStart: function () {
          }
        })
      },
      loadImage () {        // 图片加载完成再计算高度
        setTimeout(() => {
          this.head = this.$refs.head.clientHeight
          this.alloyTouch.min = window.innerHeight - this.scroller.clientHeight - this.head
        }, 50)
      },
      openSlideout () {     // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    // height: 100vh;
    background-color: #fff;
    .header {
      position: relative;
      z-index: 3;
    }
    .image-wrap {
      width: 100%;
      .image {
        display: block;
        width: 100%;
      }
    }
    // 滚动内容
    .scroller {
      padding-top: 16px;
      background-color: #fff;
      .top {
        padding: 0 16px;
        @include border(b);
        .collec {
          display: flex;
          .name {
            flex: 1;
            padding-right: 15px;
            margin: 0;
            font-size: 16px;
            color: #333;
          }
        }
        .introduce {
          margin: 15px 0 0 0;
          font-size: 14px;
          color: #666;
        }
        .city {
          margin: 5px 0 0 0;
          padding-bottom: 10px;
          text-align: right;
          font-size: 14px;
          color: $color-background;
          .room {
            font-size: 20px;
            vertical-align: middle;
          }
        }
      }
      .mu-list {
        padding: 0;
        @include border(b);
        .desc {
          display: block;
          margin-top: 5px;
        }
      }
    }
    // 标签
    .classify {
      .item {
        @include border(b);
        .title {
          font-size: 14px;
          color: #333;
        }
        .list {
          color: #666;
        }
      }
      .label {
        display: inline-block;
        margin-bottom: 6px;
        padding: 2px 6px;
        min-width: 70px;
        border-radius: 26px;
        background-color: #e57373;
        color: #fff;
        font-size: 12px;
        .chip-icon {
          vertical-align: middle;
          font-size: 15px;
        }
      }
      .flex-item {
        display: flex;
        flex-wrap: wrap;
        .flex-1 {
          flex: 1;
        }
      }
    }
    // 图文混排
    .img-txt {
      padding: 0 16px;
      @include border(b);
      .txt {
        margin: 0;
        padding: 15px 0;
      }
      .image {
        display: block;
        width: 100%;
      }
    }
    .business {
      padding: 20px;
      text-align: center;
      .desc {
        margin: 0;
        padding-top: 5px;
        font-size: 14px;
        color: $color-background;
      }
    }
  }
</style>
