<template lang="html">
  <section class="setuser">
    <!-- 这些事列表 -->
    <ul>
      <li></li>
    </ul>
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  .setuser {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
  }
</style>
