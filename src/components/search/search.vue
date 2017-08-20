<template lang="html">
  <section class="search">
    <header class="header">
      <mu-appbar title="搜索">
        <mu-icon-button icon="close" slot="left" @click="back"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
      </mu-appbar>
    </header>
    <section class="content">
       <mu-auto-complete labelFloat label="输入要搜索的内容" fullWidth icon="search" @input="handleInput" :dataSource="dataSource"/>
    </section>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        dataSource: []
      }
    },
    methods: {
      handleInput (val) {
        console.log(val)
        this.dataSource = [
          val,
          val + val
        ]
      },
      openSlideout () {     // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 16px 16px 0 0;
  }
</style>
