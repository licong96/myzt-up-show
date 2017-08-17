<template lang="html">
  <section class="nav">
    <div class="wrap">
      <div class="login">
        <mu-flat-button label="登录" class="demo-flat-button"/>
        <mu-flat-button label="注册" class="demo-flat-button"/>
      </div>
      <mu-list class="mu-list">
        <mu-list-item title="首页" @click="links('home')">
          <mu-icon slot="left" value="home"/>
        </mu-list-item>
        <mu-list-item title="上传项目" @click="links('upload')">
          <mu-icon slot="left" value="cloud_upload"/>
        </mu-list-item>
        <mu-list-item title="我上传的项目">
          <mu-icon slot="left" value="cloud_done"/>
        </mu-list-item>
        <mu-list-item title="我推荐的项目">
          <mu-icon slot="left" value="record_voice_over"/>
        </mu-list-item>
        <mu-list-item title="我收藏的项目">
          <mu-icon slot="left" value="favorite"/>
        </mu-list-item>
        <mu-list-item title="联系我们">
          <mu-icon slot="left" value="message"/>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-float-button icon="close" class="demo-float-button close" @click="close"/>
  </section>
</template>

<script>
  export default {
    methods: {
      links (path) {      // 跳转链接
        this.close()       // 先关闭侧边栏导航
        this.$router.push({
          path: `/${path}`
        })
      },
      close () {
        window.slideNav.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/colour";

  .nav {
    width: 100%;
    min-height: 100%;
    .wrap {
    }
    .login {
      padding-left: 30px;
      height: 56px;
      line-height: 56px;
      .mu-flat-button {
        color: #fff;
      }
    }
    .demo-float-button {
      display: block;
      position: relative;
      margin: 10px auto 0 auto;
    }
  }
</style>
