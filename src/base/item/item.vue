<template lang="html">
  <section class="item-wrap" ref="touch">
    <div class="scroll" ref="target" v-show="data.length">
      <mu-list>
        <div v-for="(item, index) in data" @click="selectItem(item)">
          <mu-list-item class="list-wrap">
            <div class="list">
              <div class="image">
                <img :src="item.url" class="img">
              </div>
              <div class="content">
                <h3 class="title">{{item.itemName}}</h3>
                <span class="label"><em>{{item.cname}}</em><em class="em-light">{{item.sname}}</em></span>
                <p class="desc">{{item.introduce}}</p>
              </div>
            </div>
          </mu-list-item>
        </div>
      </mu-list>
    </div>
    <!-- 没有列表显示这个 -->
    <div class="empty" v-show="!data.length">
      <mu-icon value="find_replace" class="icon"/>
      <p class="desc">暂时没有此分类</p>
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
          .em-light {
            margin-left: 10px;
          }
        }
        .desc {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
      }
    }
    // 没有数据
    .empty {
      padding: 15px 0;
      background-color: #fff;
      text-align: center;
      .icon {
        font-size: 60px;
        color: $color-background;
      }
      .desc {
        margin: 0;
        font-size: 16px;
        color: #666;
      }
    }
  }
</style>
