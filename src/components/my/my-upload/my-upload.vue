<template lang="html">
  <section class="my-upload">
    <my-upload-item @select="selectLink" :data="item"></my-upload-item>
  </section>
</template>

<script>
  import MyUploadItem from '@/base/my-item/my-item'
  export default {
    data () {
      return {
        item: []
      }
    },
    created () {
      this.getData()          // 获取页面数据
    },
    mounted () {
    },
    methods: {
      getData () {
        let self = this
        this.axios.get('/api/project/myupload')
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              self.item = response.data.list
            }
          })
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/detail/${item.id}`
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
  }
</style>
