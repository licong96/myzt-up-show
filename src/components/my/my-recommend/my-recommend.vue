<template lang="html">
  <section class="my-recommend">
    <my-recommend-item @select="selectLink"></my-recommend-item>
  </section>
</template>

<script>
  import MyRecommendItem from '@/base/my-item/my-item'
  export default {
    mounted () {
      // 检测图片是否加载完毕，用vuex保存状态，再初始化滚动
    },
    methods: {
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/detail/${item}`
        })
      }
    },
    components: {
      MyRecommendItem
    }
  }
</script>

<style lang="scss" scoped>
  .my-recommend {
    padding-bottom: 10px;
  }
</style>
