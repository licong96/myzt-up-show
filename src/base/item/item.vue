<template lang="html">
  <section class="item-wrap" ref="touch">
    <div class="scroll" ref="target">
      <mu-list>
        <div v-for="(item, index) in data" @click="selectItem(index)">
          <mu-list-item class="list-wrap">
            <div class="list">
              <div class="image">
                <img src="../../../static/case.jpg" class="img">
              </div>
              <div class="content">
                <h3 class="title">项目标题</h3>
                <span class="label">项目阶段</span>
                <p class="desc">中岁颇好道，晚家南山陲。兴来每独往，胜事空自知。</p>
              </div>
            </div>
            <div class="chip">
              <span class="label"><mu-icon value="bookmark" class="chip-icon"/>互联网</span>
            </div>
          </mu-list-item>
        </div>
      </mu-list>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      selectItem (item) {    // 配发事件，实现路由跳转，返回自身数据
        this.$emit('select', item)
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .item-wrap {
    margin-bottom: 10px;
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
        margin-right: 12px;
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
        display: inline-block;
        margin-right: 6px;
        padding: 2px 6px;
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
