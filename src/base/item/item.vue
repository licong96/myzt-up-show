<template lang="html">
  <section class="item-wrap" ref="touch">
    <div class="scroll" ref="target">
      <mu-list>
        <div v-for="(item, index) in 5" @click="selectItem(index)">
          <mu-list-item class="list-wrap">
            <div class="list">
              <div class="image">
                <img src="../../../static/case.jpg" class="img">
              </div>
              <div class="content">
                <h3 class="title">项目标题</h3>
                <span class="label">项目产业</span>
                <p class="desc">项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍</p>
              </div>
            </div>
            <div class="chip">
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签一</span>
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签二</span>
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>标签三</span>
            </div>
          </mu-list-item>
        </div>
      </mu-list>
    </div>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'

  export default {
    mounted () {
      this.scrollWrap()
    },
    methods: {
      selectItem (item) {    // 配发事件，实现路由跳转，返回自身数据
        this.$emit('select', item)
      },
      scrollWrap () {
        // let self = this
        let touch = this.$refs.touch
        let target = this.$refs.target
        Transform(target, true)

        this.alloyTouch = new AlloyTouch({
          touch: touch, // 反馈触摸的dom
          vertical: true, // 不必需，默认是true代表监听竖直方向touch
          target: target, // 运动的对象
          property: 'translateY',  // 被滚动的属性
          sensitivity: 1, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
          factor: 1,  // 不必需,默认值是1代表touch区域的1px的对应target.y的1
          min: window.innerHeight - target.clientHeight,   // 不必需,滚动属性的最小值
          max: 0,   // 不必需,滚动属性的最大值
          step: 40,
          initialValue: 0, // 初始值
          change: function (value) {
            console.log(target.clientHeight)
          },
          touchStart: function (evt, value) {
            // 计算min高度
            // self.min = window.innerHeight - self.target.clientHeight
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .item-wrap {
    position: fixed;
    top: 319px;
    left: 0;
    z-index: 50;
    margin-bottom: 50px;
    .mu-list {
      padding: 0;
      background-color: $color-body-bg;
    }
    .list-wrap {
      background-color: #fff;
      @include border(t);
      box-shadow: 0 1px 3px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
      margin-bottom: 6px;
    }
    .list {
      display: flex;
      padding-bottom: 10px;
      @include border(b);
      // 图片
      .image {
        flex: 1;
        margin-right: 15px;
        .img {
          display: block;
          width: 100%;
        }
      }
      // 内容样式
      .content {
        flex: 2;
        .title {
          margin: 0;
          font-size: 16px;
          color: #333;
        }
        .label {
          display: block;
          padding: 5px 0;
          font-size: 12px;
          color: #999;
        }
        .desc {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
      }
    }
    // 标签
    .chip {
      padding-top: 10px;
      .label {
        margin-right: 10px;
        padding: 3px 7px;
        min-width: 70px;
        border-radius: 26px;
        background-color: #e57373;
        // background-color: $color-background;
        color: #fff;
        font-size: 12px;
        .chip-icon {
          vertical-align: middle;
          font-size: 15px;
        }
      }
    }
  }
</style>
