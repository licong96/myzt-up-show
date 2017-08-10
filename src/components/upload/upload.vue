<template lang="html">
  <section class="upload">
    <header-bar></header-bar>
    <!-- 上传图片 -->
    <div class="upload-img">
      <!-- 背景图片 -->
      <div class="blur-bg"></div>
      <mu-paper class="demo-paper" :zDepth="1" />
    </div>
    <span class="desc">上传logo或者图片</span>
    <!-- 填写内容 -->
    <div class="fomr">

    </div>
  </section>
</template>

<script>
  import HeaderBar from '@/base/header/header'
  export default {
    components: {
      HeaderBar
    }
  }
</script>

<style lang="scss" scoped>
  .upload {
    background-color: #fff;
  }
  .upload-img {
    overflow: hidden;
    position: relative;
    background-color: #fff;
    text-align: center;
    .blur-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
      transform: scale(1.2);
    }
    .demo-paper {
      display: inline-block;
      position: relative;
      z-index: 2;
      margin: 20px auto;
      width: 200px;
      height: 160px;
    }
  }
  .desc {
    width: 100px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #2196f3;
  }
  // 内容
  .fomr {
    margin-right: 15px;
    background-color: #fff;
  }

</style>
