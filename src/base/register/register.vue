<template lang="html">
  <section class="register">
     <mu-text-field label="手机号" type="number" v-model="phone" @input="verifyPhone" :errorText="phoneErrorText" :maxLength="11" errorColor="#4caf50"  icon="stay_current_portrait" labelFloat fullWidth />
     <div class="verification">
       <mu-text-field label="验证码" type="number" v-model="code" @input="verifyCode" :errorText="codeErrorText" :maxLength="6" errorColor="#4caf50" icon="textsms" labelFloat fullWidth/>
       <mu-raised-button :label="getCodeText" class="demo-raised-button" primary :disabled="getCodeDisabled" @click="getCode"/>
     </div>
     <mu-text-field label="设置密码" type="password" v-model="password" @input="verifyPass" :errorText="passErrorText" :maxLength="16" errorColor="#4caf50" icon="enhanced_encryption" labelFloat fullWidth/>
     <div class="btn">
       <mu-raised-button label="注册" class="demo-raised-button" primary fullWidth @click="submit"/>
     </div>
     <!-- 提示消息 -->
     <mu-dialog :open="dialog" title="提示">
      {{dialogText}}
      <mu-flat-button label="确定" slot="actions" primary @click="dialogClose"/>
    </mu-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',                // 手机号
        code: '',                 // 验证码
        password: '',             // 密码
        phoneErrorText: '',       // 手机号错误提示
        codeErrorText: '',        // 验证码错误提示
        case: 0,                  // 记录状态，0=ok,1=手机号有误，2=验证码有误，3=密码设置有误
        dialog: false,            // 提示框
        dialogText: '',           // 提示文字
        getCodeDisabled: false,   // 获取验证码按钮状态
        getCodeText: '获取验证码',  // 获取验证码按钮文字
        passErrorText: ''         // 密码提示
      }
    },
    created () {
      this.phoneReg = /^1(3|4|5|7|8)\d{9}$/         // 手机号验证
      this.codeReg = /^\d{6}$/        // 验证码
      this.passReg = /^.{6,16}$/     // 密码
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
          this.case = 0
          this.phoneErrorText = ''
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
          console.log('发送ajax')
          this.case = 0
        }
      },
      getCode () {          // 获取验证码按钮
        let count = 6
        this.getCodeDisabled = true
        this.getCodeText = count + '秒'
        if (this.getCodeTimer) clearInterval(this.getCodeTimer)
        this.getCodeTimer = setInterval(() => {
          if (count <= 0) {
            this.getCodeDisabled = false
            this.getCodeText = '获取验证码'
            clearInterval(this.getCodeTimer)
          } else {
            count--
            this.getCodeText = count + '秒'
          }
        }, 1000)
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
        if (this.phone === '') {
          this.dialogText = '手机号不能为空'
          this.dialog = true
        } else if (this.case === 1) {
          this.dialogText = '手机号有误'
          this.dialog = true
        } else if (this.code === '') {
          this.dialogText = '请先获取验证码，再输入'
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
          alert('ok')
          // this.$router.push({
          //   path: '/home/account/selectian'
          // })
        }
      },
      dialogClose () {      // 关闭提示对话框
        this.dialog = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register {
    padding: 10px 20px 0 0;
    .verification {
      display: flex;
      align-items: center;
      .demo-raised-button {
        margin-left: 20px;
      }
    }
    .btn {
      margin: 20px 0 0 20px;
    }
  }
</style>
