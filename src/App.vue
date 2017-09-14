<template>
  <div id="app">
    <!-- 导航 -->
    <nav ref="menu">
      <slide-nav></slide-nav>
    </nav>
    <!-- 内容 -->
    <section ref="panel" class="home-scroll">
      <transition name="opacity">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
      this.getUserID()
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
      getUserID () {
        let self = this
        this.axios.get('/api/user/index')
          .then(function (response) {
            console.log(response)
            if (response.data.user_id) {
              self.setUserInfo(response.data)     // 保存用户信息到vue
            } else {
              self.setUserInfo({})
            }
            setTimeout(() => {
              self.progress = false
            }, 50)
          })
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
        // 如果有url那就跳转
        if (this.muDialogUrl) {
          this.$router.push({
            path: this.muDialogUrl
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
        'setDialog'
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
