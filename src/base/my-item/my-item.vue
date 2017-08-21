<template lang="html">
  <section class="my-item">
    <div v-for="(item, index) in 3">
      <mu-card>
        <div @click="selectItem(index)">
          <mu-card-media :subTitle="subTxt">
            <img src="../../../static/case.jpg"/>
          </mu-card-media>
        </div>
        <mu-card-title title="项目标题" subTitle="项目类别"/>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
        </mu-card-text>
        <mu-card-actions>
          <mu-flat-button label="查看" primary @click="selectItem(index)"/>
          <!-- <mu-flat-button label="编辑"/> -->
        </mu-card-actions>
      </mu-card>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        subTxt: '自定义内容'
      }
    },
    methods: {
      selectItem (item) {    // 配发事件，实现路由跳转，返回自身数据
        this.$emit('select', item)
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
