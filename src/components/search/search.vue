<template lang="html">
  <section class="search">
    <header class="header">
      <mu-appbar title="搜索">
        <mu-icon-button icon="close" slot="left" @click="back"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
      </mu-appbar>
    </header>
    <section class="content">
       <mu-auto-complete labelFloat label="输入要搜索的内容" fullWidth icon="search" @input="handleInput" :dataSource="dataSource"/>
    </section>
    <!-- 列表 -->
    <alloy-scroll ref="scrolls" class="alloy">
      <section v-show="item.length">
        <item @select="selectLink" :data="item"></item>
      </section>
      <section class="empty" v-show="empty">
        <mu-icon value="refresh" class="icon"/>
        <p class="desc">没有找到您要的结果</p>
      </section>
    </alloy-scroll>
    <!-- 详细页 -->
    <transition name="tranx" mode="in-out">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import Item from '@/base/item/item'

  export default {
    data () {
      return {
        item: [],
        dataSource: [],
        empty: false
      }
    },
    methods: {
      handleInput (val) {
        if (val) {
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.axios.post('/api/index/projectlist', {keyword: val})
            .then(function (response) {
              console.log(response)
              if (response.data.list.length) {
                this.item = response.data.list
                this.empty = false
              } else {
                this.empty = true
              }
              this.$nextTick(() => {
                console.log(this.$refs.scrolls.countHeight)
                this.$refs.scrolls.countHeight(0)      // 从新计算页面滚动高度
              })
            }.bind(this))
          }, 1000)
        } else {
          this.item = []
          this.empty = false
        }
        // 历史记录
        this.dataSource = [
          // val,
          // val + val
        ]
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/search/detail/${item.id}`
        })
      },
      openSlideout () {     // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      AlloyScroll,
      Item
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .header {
    position: relative;
    z-index: 4;
  }
  .content {
    position: relative;
    z-index: 3;
    padding: 16px 16px 0 0;
    background-color: $color-body-bg;
  }
  .alloy {
    position: relative;
    z-index: 2;
  }
  .empty {
    padding: 15px 0;
    text-align: center;
    .icon {
      font-size: 60px;
      color: $color-background;
    }
    .desc {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  }
</style>
