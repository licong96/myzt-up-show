<template lang="html">
  <!-- 去注册 -->
  <section class="go-register">
    <header class="header">
      <mu-appbar title="注册并绑定">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
        <mu-icon-button slot="right"/>
      </mu-appbar>
    </header>
    <section class="register">
      <form ref="myform">
        <mu-text-field label="手机号" type="number" v-model="phone" @input="verifyPhone" :errorText="phoneErrorText" :maxLength="11" errorColor="#4caf50" icon="stay_current_portrait" labelFloat fullWidth />
        <div class="code-wrap">
          <mu-text-field label="验证码" type="number" v-model="code" @input="verifyCode" :errorText="codeErrorText" :maxLength="6" errorColor="#4caf50" icon="textsms" labelFloat fullWidth/>
          <mu-raised-button label="获取验证码" class="demo-raised-button code-btn" primary @click="getCode"/>
        </div>
        <mu-text-field label="设置密码" type="password" v-model="password" @input="verifyPass" :errorText="passErrorText" :maxLength="16" errorColor="#4caf50" icon="enhanced_encryption" labelFloat fullWidth/>
        <div class="btn">
          <mu-raised-button label="注册" class="demo-raised-button" primary fullWidth @click="submit"/>
        </div>
        <!-- 提示消息 -->
        <mu-dialog :open="dialog" :title="dialogTitle">
          {{dialogText}}
          <div class="progress" v-show="progress">
            <mu-circular-progress :size="50"/>
          </div>
          <mu-flat-button label="确定" slot="actions" primary @click="dialogClose" v-show="dialogHide"/>
        </mu-dialog>
      </form>
    </section>
  </section>
</template>

<script>
import '@/common/js/gt'        // 急验证
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      phone: '',                // 手机号
      code: '',                 // 验证码
      password: '',             // 密码
      phoneErrorText: '',       // 手机号错误提示
      codeErrorText: '',        // 验证码错误提示
      passErrorText: '',        // 密码提示
      case: 1,                  // 记录状态，0=ok,1=手机号有误，2=验证码有误，3=密码设置有误
      phoneOK: false,           // 手机号验证通过，才能获取验证码
      dialog: false,            // 提示框
      dialogTitle: '提示',      // 提示标题
      dialogText: '',           // 提示文字
      dialogHide: true,         // 提示框按钮显示隐藏
      progress: false           // 等待加载动画
    }
  },
  created () {
    this.phoneReg = /^1(3|4|5|7|8)\d{9}$/         // 手机号验证
    this.codeReg = /^\d{6}$/        // 验证码
    this.passReg = /^.{6,16}$/     // 密码
    // 急验证，全局保存
    this.captchaObj = null
  },
  mounted () {
    setTimeout(() => {
      this.getCaptcha()         // 初始化已验证数据
    }, 20)
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'loginLink'
    ])
  },
  methods: {
    verifyPhone () {      // 验证手机号是否合格
      this.phoneErrorText = ''
      if (!this.phoneReg.test(this.phone)) {
        this.case = 1
        // 用延迟的方式显示文字提示，有助于提升输入体验
        if (this.phoneTimer) clearTimeout(this.phoneTimer)
        this.phoneTimer = setTimeout(() => {
          if (this.case === 1) {
            this.phoneErrorText = '手机号有误'
          }
        }, 1000)
      } else {
        this.phoneOK = true
        this.case = 0
        this.phoneErrorText = ''
      }
    },
    getCaptcha () {       // 急验证按钮
      let self = this
      this.axios.get('/api/user/geetest_show_verify')
        .then(function (response) {
          window.initGeetest({
            gt: response.data.gt,
            challenge: response.data.challenge,
            offline: !response.data.success, // 表示用户后台检测极验服务器是否宕机
            product: 'bind', // 产品形式，包括：float，popup
            width: '100%'
          }, function (captchaObj) {
            self.captchaObj = captchaObj                  // 赋值全局
            self.captchaObj.onSuccess(function() {        // 发送手机号到后端
              self.postPhone()            // 点击验证后，执行
            })
            self.captchaObj.onError(function() {
              self.captchaObj.reset()
            })
          })
        })
        .catch(function () {
          self.dialogText = '网络错误，请检查您的网络，或者刷新试试'
          self.dialog = true
        })
    },
    postPhone() {       // 发送手机号到后端，已接受验证码
      let result = this.captchaObj.getValidate()
      let data = {
        geetest_challenge: result.geetest_challenge,
        geetest_validate: result.geetest_validate,
        geetest_seccode: result.geetest_seccode,
        phone: this.phone
      }
      let self = this
      this.axios.post('/api/user/geetest_submit_check', data)
      .then(function (response) {
        // 以为已验证成功有延迟提示，为了避免提示重合，做个延迟
        // console.log(response)
        setTimeout(() => {
          if (response.data.code === 1) {
            self.dialogText = '已发送短信验证码' + response.data.msg
            self.dialog = true
          } else {
            self.dialogText = response.data.msg
            self.dialog = true
            self.captchaObj.reset()        // 重置验证码
          }
        }, 1500)
      })
    },
    getCode () {          // 获取验证码按钮
      if (this.phoneOK) {      // 输入完手机号码之后才能点
        this.captchaObj.verify()
      } else {
        this.dialogText = '请先输入手机号'
        this.dialog = true
      }
    },
    verifyCode () {       // 验证码是否合格
      this.codeErrorText = ''
      if (!this.codeReg.test(this.code)) {
        this.case = 2
        // 用延迟的方式显示文字提示，有助于提升输入体验
        if (this.codeTimer) clearTimeout(this.codeTimer)
        this.codeTimer = setTimeout(() => {
          if (this.case === 2) {
            this.codeErrorText = '验证码有误'
          }
        }, 1000)
      } else {
        this.codeErrorText = ''
        this.case = 0
      }
    },
    verifyPass () {            // 验证密码
      this.passErrorText = ''
      if (!this.passReg.test(this.password)) {
        this.case = 3
        // 用延迟的方式显示文字提示，有助于提升输入体验
        if (this.passTimer) clearTimeout(this.passTimer)
        this.passTimer = setTimeout(() => {
          if (this.case === 3) {
            this.passErrorText = '密码要求6-16位之间'
          }
        }, 1000)
      } else {
        this.passErrorText = ''
        this.case = 0
      }
    },
    submit () {
      let result = this.captchaObj.getValidate()
      // 逐步验证
      if (this.phone === '') {
        this.dialogText = '手机号不能为空'
        this.dialog = true
      } else if (this.case === 1) {
        this.dialogText = '手机号有误'
        this.dialog = true
      } else if (!result) {             // 急验证
        this.dialogText = '请获取验证码'
        this.dialog = true
      } else if (this.code === '') {
        this.dialogText = '请输入验证码'
        this.dialog = true
      } else if (this.case === 2) {
        this.dialogText = '验证码有误'
        this.dialog = true
      } else if (this.password === '') {
        this.dialogText = '请设置密码'
        this.dialog = true
      } else if (this.case === 3) {
        this.dialogText = '密码要求6-16位之间'
        this.dialog = true
      } else {
        // 把弹出框修改成等待提示，东西有点多，不能乱
        this.dialogTitle = ''
        this.dialogText = ''
        this.dialogHide = false
        this.progress = true
        this.dialog = true
        let self = this
        // 手机号，验证码，密码 传过去
        this.axios.post('/api/user/reg', {
          phone: this.phone,
          code: this.code,
          password: this.password
        })
        .then(function (response) {
          self.dialogTitle = '提示'
          self.dialogHide = true
          self.progress = false
          self.dialog = false
          switch (response.data.code) {
            case 1:
              self.setUserInfo({userInfo: response.data.result})        // 注册成功后保存到vuex
              // console.log(self.loginLink)
              self.$router.replace({
                path: '/account/selectian'
              })
              break
            default:
              self.dialogText = response.data.msg
              self.dialog = true
          }
        })
      }
    },
    dialogClose () {      // 关闭提示对话框
      this.dialog = false
    },
    back () {
      this.$router.back()
    },
    ...mapActions([             // 修改
      'setUserInfo'
    ])
  }
}
</script>

<style scoped lang="scss">
  .go-register {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    .header {
      position: relative;
      z-index: 88;
    }
  }
  .register {
    padding: 10px 20px 40px 0;
    .captcha-wrap {
      position: relative;
      padding-left: 20px;
      .shade {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 5;
      }
    }
    .code-wrap {
      display: flex;
      align-items: center;
      .code-btn {
        margin-left: 20px;
      }
    }
    .btn {
      padding: 20px 40px;
      margin: 20px 0 0 20px;
    }
  }
</style>
