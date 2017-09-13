<template lang="html">
  <!-- 投资人 -->
  <section class="fixed-wrapp">
    <alloy-scroll ref="scrolls">
      投资人
    </alloy-scroll>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'

  export default {
    components: {
      AlloyScroll
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .fixed-wrapp {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: $color-body-bg;
  }
</style>
