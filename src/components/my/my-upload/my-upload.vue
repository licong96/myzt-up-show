<template lang="html">
  <section class="my-upload">
    <my-upload-item></my-upload-item>
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import MyUploadItem from '@/base/my-item/my-item'
  export default {
    mothods: {
      select (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/myUpload/detail/${item}`
        })
      }
    },
    components: {
      MyUploadItem
    }
  }
</script>

<style lang="scss" scoped>
  .my-upload {
    padding-bottom: 10px;
  }
</style>
