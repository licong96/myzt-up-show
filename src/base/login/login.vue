<template lang="html">
  <section class="login">
    <mu-text-field label="手机号" type="number" v-model="phone" @input="verifyPhone" :errorText="phoneErrorText" :maxLength="11" errorColor="#4caf50"  icon="stay_current_portrait" labelFloat fullWidth />
    <mu-text-field label="密码" type="password" icon="enhanced_encryption" labelFloat fullWidth/>
    <div class="btn">
      <mu-raised-button label="登录" class="demo-raised-button" primary fullWidth/>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        phoneErrorText: ''
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
          } else {
            this.phoneErrorText = ''
          }
        }, 1000)
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
