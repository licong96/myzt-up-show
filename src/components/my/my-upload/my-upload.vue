<template lang="html">
  <section class="my-upload">
    <my-upload-item @select="selectLink" @edit="editLink" :data="item" v-show="loadings"></my-upload-item>
    <!-- 没有上传的项目 -->
    <section class="no-item" v-show="noItem">
      <p class="desc">您还没有上传项目</p>
      <mu-raised-button label="去上传项目" class="demo-raised-button" primary @click="ifLinks('upload/0')"/>
    </section>
    <!-- 加载中 -->
    <loading v-show="!loadings"></loading>
  </section>
</template>

<script>
  import MyUploadItem from '@/base/my-item/my-item'
  import Loading from '@/base/loading/loading'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        item: [],
        loadings: false,        // 加载中
        noItem: false
      }
    },
    created () {
      this.getData()          // 获取页面数据
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      getData () {
        let self = this
        this.axios.get('/api/project/myupload')
          .then(function (response) {
            console.log(response)
            self.loadings = true        // 隐藏加载中
            if (response.data.code === 1) {
              self.item = response.data.list
            } else {
              self.item = []
              self.noItem = true
            }
          })
      },
      selectLink (item) {       // 获取列表点击事件的返回数据
        this.$router.push({
          path: `/my/detail/${item.id}`
        })
      },
      editLink (item) {         // 编辑
        this.$router.push({
          path: `/upload/${item.id}`
        })
      },
      ifLinks (path) {          // 如果没有项目，显示去上传
        if (this.userInfo.user_id) {
          this.$router.push({
            path: `/${path}`
          })
        } else {
          this.setLoginLink({loginLink: `/${path}`})          // 保存到全局去，登录完后跳到
          this.setDialog({muDialog: true})
          this.setDialogText({muDialogText: '您还没有登陆'})
          this.setDialogUrl({muDialogUrl: '/home/account/login'})
        }
      },
      ...mapActions([
        'setUserInfo',
        'setDialog',
        'setDialogText',
        'setDialogUrl',
        'setLoginLink'
      ])
    },
    watch: {
      $route () {         // 如果路由有变化，会再次执行该方法
        this.getData()
      }
    },
    components: {
      MyUploadItem,
      Loading
    }
  }
</script>

<style lang="scss" scoped>
  .my-upload {
    .no-item {
      padding: 20px;
      text-align: center;
      background-color: #fff;
      .desc {
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>
