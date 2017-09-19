<template lang="html">
  <section class="portrait">
    <header class="header">
      <mu-appbar title="修改头像">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
        <mu-icon-button slot="right"/>
      </mu-appbar>
    </header>
    <section class="image">
      <img :src="portraitImg">
    </section>
    <div class="btn-core">
      <vue-core-image-upload
        class="btn btn-primary"
        crop-ratio="1:1"
        crop="local"
        :cropBtn="{'ok': '确定', 'cancel': '取消'}"
        @imageuploaded="imageuploaded"
        @imagechanged="imagechanged"
        @errorhandle="errorhandle"
        :max-file-size="2097152"
        :isXhr="true"
        url="/api/upload/img"
        text="">
        <mu-raised-button label="选择头像" class="demo-raised-button" primary/>
      </vue-core-image-upload>
      <mu-raised-button label="确定修改" class="demo-raised-button" primary @click.stop="submit"/>
    </div>
  </section>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        portraitImg: '',
        head_pic: ''
      }
    },
    created () {
      this.portraitImg = this.userInfo.head_pic         // 拿到用户头像
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      submit () {
        let self = this
        this.axios.post('/api/user/updatehead', {head_pic: this.head_pic})
          .then(function (response) {
            // console.log(response)
            if (response.data.code === 1) {
              self.userInfo.head_pic = self.head_pic
              self.back()
            }
          })
      },
      imageuploaded (res) {   // 图片上传，后台返回
        console.log(res)
        if (res.code === 1) {
          this.head_pic = res.url
        } else {
          this.dialog = true
          this.dialogText = '图片上传失败！请重试或刷新页面'
        }
      },
      imagechanged (res) {    // 图片改变
        this.portraitImg = res
      },
      errorhandle (res) {     // 错误提示
        console.log('图片不能超过2M')
      },
      back () {
        this.$router.back()
      },
      ...mapMutations({
        setUserInfo: 'SET_USERINFO'
      })
    },
    watch: {
      userInfo () {
        this.portraitImg = this.userInfo.head_pic         // 拿到用户头像
      }
    },
    components: {
      VueCoreImageUpload
    }
  }
</script>

<style scoped lang="scss">
  .portrait {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    .image {
      margin-top: 50px;
      width: 200px;
      height: 200px;
      margin: 40px auto;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .btn-core {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .btn {
      display: inline-block;
    }
  }
</style>
