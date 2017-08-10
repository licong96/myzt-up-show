<template lang="html">
  <header class="header">
    <mu-appbar title="项目上传">
      <mu-icon-button icon="close" slot="left"/>
      <mu-icon-menu icon="menu" slot="right"></mu-icon-menu>
    </mu-appbar>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 56px;
    .mu-appbar {
      position: fixed;
      top: 0;
      left: 0;
    }
  }
</style>
