<template lang="html">
  <section class="my-upload">
    <my-upload-item @select="selectLink" @edit="editLink" @delete="deleteItem" :data="item" v-show="loadings"></my-upload-item>
    <!-- 没有上传的项目 -->
    <section class="no-item" v-show="noItem">
      <p class="desc">您还没有上传项目</p>
      <mu-raised-button label="去上传项目" class="demo-raised-button" primary @click="ifLinks('upload/0')"/>
    </section>
    <!-- 加载中 -->
    <loading v-show="!loadings"></loading>
    <!-- 提示 -->
    <mu-dialog :open="dialog" :title="dialogTitle" @close="dialogClose">
      {{dialogText}}
      <mu-flat-button slot="actions" primary @click="dialogClose" label="取消"/>
      <mu-flat-button slot="actions" primary @click="dialogConfirm" label="确定"/>
    </mu-dialog>
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
        noItem: false,          // 没有数据
        dialog: false,          // 删除弹出框提示
        dialogTitle: '',
        dialogText: '',
        itemID: 0              // 要删除的id
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
            // console.log(response)
            self.loadings = true        // 隐藏加载中
            if (response.data.count) {
              self.item = response.data.list
              self.noItem = false
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
      deleteItem (item) {       // 删除
        // console.log(item)
        this.dialog = true
        this.dialogTitle = '删除项目'
        this.dialogText = '您确定要删除该项目吗？'
        this.itemID = item.id
      },
      dialogConfirm () {          // 确定删除项目
        if (this.itemID) {
          let self = this
          this.axios.delete('/api/project/del?id=' + this.itemID)
          .then(function (response) {
            // console.log(response)
            if (response.data.code === 1) {
              self.getData()      // 删除后重新获取数据
              self.dialog = false
            } else {
              self.dialog = true
              self.dialogTitle = '删除失败'
              self.dialogText = response.data.msg
              self.itemID = 0           // 如果失败了，就把id还原
            }
          })
        } else {
          this.dialog = false
        }
      },
      dialogClose () {            // 关闭提示弹出框
        this.dialog = false
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
          this.setDialogUrl({muDialogUrl: '/account/login'})
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
