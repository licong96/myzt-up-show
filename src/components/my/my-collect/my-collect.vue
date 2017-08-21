<template lang="html">
  <section class="my-collect">
    <my-collect-item @select="selectLink"></my-collect-item>
  </section>
</template>

<script>
  import MyCollectItem from '@/base/item/item'
  export default {
    methods: {
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/item/${item}`
        })
      }
    },
    components: {
      MyCollectItem
    }
  }
</script>

<style lang="scss" scoped>

</style>
