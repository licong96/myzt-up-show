<template>
  <div id="app">
    <!-- 导航 -->
    <nav ref="menu">
      <slide-nav></slide-nav>
    </nav>
    <!-- 内容 -->
    <section ref="panel" class="home-scroll">
      <transition name="opacity">
        <router-view></router-view>
      </transition>
    </section>
    <!-- 提示消息 -->
    <mu-dialog :open="dialog" title="提示" @close="dialogClose">
      {{dialogText}}
      <mu-flat-button label="确定" slot="actions" primary @click="dialogClose"/>
    </mu-dialog>
    <!-- 加载中 -->
    <transition name="fade">
      <section class="progress" v-show="progress">
        <mu-circular-progress :size="40"/>
      </section>
    </transition>
  </div>
</template>

<script>
  import SlideNav from '@/base/nav/nav'
  import Slideout from 'slideout'
  import {mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
        progress: false              // 加载中
      }
    },
    created () {
      this.getUserID()      // 获取用户信息
      // 初始化弹出信息
      this.setMuDialog(false)
      this.setMuDialogText('')
      this.setMuDialogUrl('')
    },
    mounted () {
      setTimeout(() => {
        this.initSlideout()
      }, 20)
    },
    computed: {
      dialog () {
        return this.muDialog
      },
      dialogText () {
        return this.muDialogText
      },
      ...mapGetters([         // 获取
        'userInfo',
        'muDialog',
        'muDialogText',
        'muDialogUrl'
      ])
    },
    methods: {
      getUserID () {            // 获取用户登录
        let self = this
        this.axios.get('/api/user/index')
          .then(function (response) {
            console.log(response)
            if (response.data.user_id) {        // 判断是否有id
              self.setUserInfo(response.data)         // 保存用户信息到vue
            } else {
              self.local()            // 没有登录，就去找本地存储，试试
            }
            setTimeout(() => {
              self.progress = false
            }, 50)
          })
      },
      local () {
        let local = this.localstore.get('user')
        console.log(local)
        if (local) {              // 判断是否保存了用户信息到本地
          this.axios.post('/api/user/login', {          // 调用登录
            phone: local.phone,
            password: local.password
          })
          .then(function (response) {
            if (response.data.code === 1) {
              this.setUserInfo(response.data.result)     // 保存用户信息到vue
            }
          }.bind(this))
        }
      },
      initSlideout () {     // 初始化侧边栏导航
        let panel = this.$refs.panel
        let menu = this.$refs.menu
        window.slideNav = new Slideout({
          'panel': panel,
          'menu': menu,
          'side': 'right',
          'padding': 250,
          'tolerance': 70
        })
        window.slideNav.disableTouch()    // 禁止滑动打开关闭
      },
      dialogClose () {        // 关闭提示对话框
        this.setDialog({
          muDialog: false
        })
        console.log(this.muDialogUrl)
        // 如果有url那就跳转
        if (this.muDialogUrl) {
          this.$router.push({
            path: this.muDialogUrl
          })
          this.setDialogUrl({         // 跳转完后，清除掉
            muDialogUrl: ''
          })
        }
      },
      ...mapMutations({             // 设置
        setUserInfo: 'SET_USERINFO',
        setMuDialog: 'SET_MUDIALOG',
        setMuDialogText: 'SET_MUDIALOGTEXT',
        setMuDialogUrl: 'SET_MUDIALOGURL'
      }),
      ...mapActions([             // 修改
        'setDialog',
        'setDialogUrl'
      ])
    },
    components: {
      SlideNav
    }
  }
</script>

<style lang="scss" scoped>
  .home-scroll {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    .mu-circular-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -20px 0 0 -20px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to{
    opacity: 0
  }
</style>
