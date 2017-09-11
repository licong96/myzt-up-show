<template lang="html">
  <article class="loading">
    <!-- 加载中 -->
    <mu-circular-progress :size="30"/>
    <p class="desc">加载中...</p>
  </article>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .loading {
    margin: 50px 0;
    text-align: center;
    .desc {
      margin: 0;
      padding-top: 5px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }
</style>
