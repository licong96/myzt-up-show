<template lang="html">
  <section class="nav">
    <div class="wrap">
      <div class="login" v-show="login">
        <mu-flat-button label="登录" class="demo-flat-button" @click="links('account/login')"/>
        <mu-flat-button label="注册" class="demo-flat-button" @click="links('account/register')"/>
      </div>
      <div class="login" v-show="!login">
        <span class="phone">{{mobile}}</span>
        <mu-flat-button label="退出" class="demo-flat-button" @click="quitLogin"/>
      </div>
      <mu-list class="mu-list">
        <mu-list-item title="首页" @click="links('home')">
          <mu-icon slot="left" value="home"/>
        </mu-list-item>
        <mu-list-item title="上传项目" @click="ifLinks('upload/0')">
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
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      login () {
        let n = true
        this.userInfo.user_id ? n = false : n = true
        return n
      },
      mobile () {
        return this.userInfo.mobile
      },
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      links (path) {      // 跳转链接
        this.close()       // 先关闭侧边栏导航
        this.setLoginLink({loginLink: this.$route.path})          // 保存到全局去，登录完后跳回来
        this.$router.push({
          path: `/${path}`
        })
      },
      ifLinks (path) {      // 这个是要判断是否登录，再跳转
        this.close()       // 先关闭侧边栏导航
        if (this.userInfo.user_id) {
          this.$router.push({
            path: `/${path}`
          })
        } else {
          this.setLoginLink({loginLink: `/${path}`})          // 保存到全局去，登录完后跳回来
          this.setDialog({muDialog: true})
          this.setDialogText({muDialogText: '您还没有登陆'})
          this.setDialogUrl({muDialogUrl: '/account/login'})
        }
      },
      quitLogin () {      // 退出登录
        let self = this
        this.axios.get('/api/user/logout')
          .then(function (response) {
            self.setUserInfo({userInfo: {}})
            self.setDialog({muDialog: true})
            self.setDialogText({muDialogText: '已退出登录'})
            self.setDialogUrl({muDialogUrl: ''})
          })
      },
      close () {
        window.slideNav.close()
      },
      ...mapActions([
        'setUserInfo',
        'setDialog',
        'setDialogText',
        'setDialogUrl',
        'setLoginLink'
      ])
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
