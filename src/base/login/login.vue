<template lang="html">
  <section class="login">
    <mu-text-field label="手机号" type="number" v-model="phone" @input="verifyPhone" :errorText="phoneErrorText" :maxLength="11" errorColor="#4caf50"  icon="stay_current_portrait" labelFloat fullWidth />
    <mu-text-field label="密码" type="password" v-model="password" @input="verifyPass" :errorText="passErrorText" :maxLength="16" errorColor="#4caf50" icon="enhanced_encryption" labelFloat fullWidth/>
    <div class="btn">
      <mu-raised-button label="登录" class="demo-raised-button" primary fullWidth @click="login"/>
    </div>
    <!-- 提示消息 -->
    <mu-dialog :open="dialog" :title="dialogTitle">
      {{dialogText}}
      <div class="progress" v-show="progress">
        <mu-circular-progress :size="50"/>
      </div>
      <mu-flat-button label="确定" slot="actions" primary @click="dialogClose" v-show="dialogHide"/>
    </mu-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        password: '',
        phoneErrorText: '',
        passErrorText: '',
        phoneOK: false,
        passOk: false,
        dialog: false,            // 提示框
        dialogTitle: '提示',      // 提示标题
        dialogText: '',           // 提示文字
        dialogHide: true,         // 提示框按钮显示隐藏
        progress: false           // 等待加载动画
      }
    },
    created () {
      this.phoneReg = /^1(3|4|5|7|8)\d{9}$/         // 手机号验证
      this.passReg = /^.{6,16}$/     // 密码
    },
    methods: {
      verifyPhone () {      // 验证手机号是否合格
        this.phoneErrorText = ''
        if (!this.phoneReg.test(this.phone)) {
          this.phoneOK = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.phoneTimer) clearTimeout(this.phoneTimer)
          this.phoneTimer = setTimeout(() => {
            if (!this.phoneOK) {
              this.phoneErrorText = '手机号有误'
            }
          }, 1000)
        } else {
          this.phoneOK = true
          this.phoneErrorText = ''
        }
      },
      verifyPass () {        // 验证密码
        this.passErrorText = ''
        if (!this.passReg.test(this.password)) {
          this.passOk = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.passTimer) clearTimeout(this.passTimer)
          this.passTimer = setTimeout(() => {
            if (!this.passOk) {
              this.passErrorText = '密码要求6-16位之间'
            }
          }, 1000)
        } else {
          this.passOk = true
          this.passErrorText = ''
        }
      },
      login () {          // 登录
        if (this.phone === '') {
          this.dialogText = '请输入手机号'
          this.dialog = true
        } else if (!this.phoneOK) {
          this.dialogText = '手机号有误'
          this.dialog = true
        } else if (this.password === '') {
          this.dialogText = '请输入密码'
          this.dialog = true
        } else if (!this.passOk) {
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
          this.axios.post('/api/user/login', {
            phone: this.phone,
            password: this.password
          })
          .then(function (response) {
            self.dialogTitle = '提示'
            self.dialogHide = true
            self.progress = false
            self.dialog = false
            // console.log(response)
            switch (response.data.code) {
              case 1:
                self.$router.push({       // 登录成功就跳个人中心
                  path: '/my/myUpload'
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    padding: 10px 20px 0 0;
    .btn {
      margin: 20px 0 0 20px;
    }
  }
</style>
