<template lang="html">
  <section class="my-collect">
    <my-collect-item @select="selectLink" :data="item" v-show="loadings"></my-collect-item>
    <loading v-show="!loadings"></loading>
  </section>
</template>

<script>
  import MyCollectItem from '@/base/item/item'
  import Loading from '@/base/loading/loading'

  export default {
    data () {
      return {
        item: [],
        loadings: false
      }
    },
    created () {
      this.getData()          // 获取页面数据
    },
    methods: {
      getData () {
        let self = this
        this.axios.get('/api/project/mycollect')
          .then(function (response) {
            console.log(response)
            self.loadings = true        // 隐藏加载中
            if (response.data.code === 1) {
              self.item = response.data.list
            } else {
              self.item = []
            }
          })
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/detail/${item.id}`
        })
      }
    },
    watch: {
      $route () {         // 如果路由有变化，会再次执行该方法
        this.getData()
      }
    },
    components: {
      MyCollectItem,
      Loading
    }
  }
</script>

<style lang="scss" scoped>

</style>
