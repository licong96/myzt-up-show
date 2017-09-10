<template lang="html">
  <section class="my-recommend">
    <my-recommend-item @select="selectLink" :data="item"></my-recommend-item>
  </section>
</template>

<script>
  import MyRecommendItem from '@/base/item/item'
  export default {
    data () {
      return {
        item: []
      }
    },
    created () {
      this.getData()          // 获取页面数据
    },
    methods: {
      getData () {
        let self = this
        this.axios.get('/api/project/myrecommend')
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
      MyRecommendItem
    }
  }
</script>

<style lang="scss" scoped>
  .my-recommend {
    padding-bottom: 10px;
  }
</style>
