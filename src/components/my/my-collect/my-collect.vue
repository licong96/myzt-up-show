<template lang="html">
  <section class="my-collect">
    <my-collect-item></my-collect-item>
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import MyCollectItem from '@/base/item/item'
  export default {
    mothods: {
      select (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/myCollect/detail/${item}`
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
