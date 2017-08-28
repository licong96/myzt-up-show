<template lang="html">
  <section class="register">
     <mu-text-field label="手机号" type="number" v-model="phone" @input="verifyPhone" :errorText="phoneErrorText" :maxLength="11" errorColor="#4caf50"  icon="stay_current_portrait" labelFloat fullWidth />
     <div class="verification">
       <mu-text-field label="验证码" type="number" icon="textsms" labelFloat fullWidth/>
       <mu-raised-button label="获取验证码" class="demo-raised-button" primary/>
     </div>
     <mu-text-field label="设置密码" type="password" icon="enhanced_encryption" labelFloat fullWidth/>
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
        phone: '',            // 手机号
        phoneErrorText: '',   // 手机号错误提示
        case: 0,              // 记录状态，0=手机号有误，1=验证码有误，2=密码设置有误
        dialog: false,         // 提示框
        dialogText: ''        // 提示文字
      }
    },
    methods: {
      verifyPhone () {      // 验证手机号是否合格
        this.phoneErrorText = ''
        if (this.phoneTimer) clearTimeout(this.phoneTimer)
        this.phoneTimer = setTimeout(() => {
          let reg = /^1(3|4|5|7|8)\d{9}$/
          if (!reg.test(this.phone)) {
            this.phoneErrorText = '手机号码有误'
            this.case = 0
            this.dialogText = '手机号有误'
          } else {
            this.phoneErrorText = ''
          }
        }, 1000)
      },
      submit () {
        if (!this.phone) {
          this.dialog = true
        }
        // this.$router.push({
        //   path: '/home/account/selectian'
        // })
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
