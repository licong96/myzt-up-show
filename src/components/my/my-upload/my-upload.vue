<template lang="html">
  <section class="my-upload">
    <my-upload-item @select="selectLink"></my-upload-item>
  </section>
</template>

<script>
  import MyUploadItem from '@/base/my-item/my-item'
  export default {
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/detail/${item}`
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
