<template lang="html">
  <section class="nav">
    <div class="wrap">
      <div class="login" v-show="login">
        <mu-flat-button label="登录" class="demo-flat-button" @click="links('home/account/login')"/>
        <mu-flat-button label="注册" class="demo-flat-button" @click="links('home/account/register')"/>
      </div>
      <div class="login" v-show="!login">
        <span class="phone">13699531996</span>
        <mu-flat-button label="退出" class="demo-flat-button"/>
      </div>
      <mu-list class="mu-list">
        <mu-list-item title="首页" @click="links('home')">
          <mu-icon slot="left" value="home"/>
        </mu-list-item>
        <mu-list-item title="上传项目" @click="ifLinks('upload')">
          <mu-icon slot="left" value="cloud_upload"/>
        </mu-list-item>
        <mu-list-item title="我上传的项目" @click="ifLinks('my/myUpload')">
          <mu-icon slot="left" value="cloud_done"/>
        </mu-list-item>
        <mu-list-item title="我关注的项目" @click="ifLinks('my/myRecommend')">
          <mu-icon slot="left" value="star"/>
        </mu-list-item>
        <mu-list-item title="我收藏的项目" @click="ifLinks('my/myCollect')">
          <mu-icon slot="left" value="favorite"/>
        </mu-list-item>
        <mu-list-item title="联系我们" href="tel://13699531996">
          <mu-icon slot="left" value="message"/>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-float-button icon="close" class="demo-float-button close" @click="close"/>
    <!-- 提示消息 -->
    <mu-dialog :open="dialog" title="提示">
      您需要登录
      <mu-flat-button label="确定" slot="actions" primary @click="dialogClose"/>
    </mu-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        login: true
      }
    },
    mounted () {
      if (window.userInfo.user_id) {
        this.login = false
      }
    },
    methods: {
      links (path) {      // 跳转链接
        this.close()       // 先关闭侧边栏导航
        this.$router.push({
          path: `/${path}`
        })
      },
      ifLinks (path) {      // 这个是要判断是否登录，再跳转
        this.close()       // 先关闭侧边栏导航
        console.log(window.userInfo)
        if (window.userInfo.user_id) {
          this.$router.push({
            path: `/${path}`
          })
        } else {
          this.dialog = true
        }
      },
      dialogClose () {      // 关闭提示对话框
        this.dialog = false
        this.$router.push({
          path: '/home/account/login'
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
      color: #fff;
      .mu-flat-button {
        margin-top: 10px;
        color: #fff;
      }
      .phone {
        font-size: 16px;
      }
    }
    .demo-float-button {
      display: block;
      position: relative;
      margin: 10px auto 0 auto;
    }
  }
</style>
