<template lang="html">
  <section class="my-item">
    <div v-for="(item, index) in data">
      <mu-card>
        <div @click="selectItem(item)">
          <mu-card-media :subTitle="item.sname">
            <img :src="item.url" @load="loadImage"/>
          </mu-card-media>
        </div>
        <mu-card-title :title="item.itemName" :subTitle="item.cname"/>
        <mu-card-text>
          {{item.introduce}}
        </mu-card-text>
        <mu-card-actions>
          <mu-flat-button label="查看" primary @click="selectItem(item)"/>
          <!-- <mu-flat-button label="编辑"/> -->
        </mu-card-actions>
      </mu-card>
    </div>
  </section>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        num: 0          // 图片加载完毕后，累加，用来触发min计算
      }
    },
    mounted () {
      setTimeout(() => {
      }, 50)
    },
    methods: {
      loadImage () {          // 图片加载完成再计算高度
        this.num++
        this.$nextTick(() => {
          this.setAlloyCountHeight({alloyCountHeight: this.num})
        })
      },
      selectItem (item) {    // 配发事件，实现路由跳转，返回自身数据
        this.$emit('select', item)
      },
      ...mapActions([
        'setAlloyCountHeight'
      ])
    },
    watch: {
      data () {             // 监听数据变化
        this.loadImage()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-item {
    .mu-card {
      margin-bottom: 15px;
    }
    .mu-card-media {
      height: 220px;
      overflow: hidden;
    }
    .mu-card-title-container .mu-card-title {
      font-size: 18px;
    }
  }
</style>
