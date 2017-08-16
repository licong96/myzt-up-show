<template lang="html">
  <section class="detail">
    详细页
  </section>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: $color-body-bg;
  }
</style>
