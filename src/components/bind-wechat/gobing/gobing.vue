<template lang="html">
  <!-- 绑定账号 -->
  <section class="go-bing">
    <header class="header">
      <mu-appbar title="绑定账号">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
        <mu-icon-button slot="right"/>
      </mu-appbar>
    </header>
    <!-- 填写信息 -->
    <section class="content">
      <ul>
        <li class="flex-li">
          <span class="title">账号：</span>
          <mu-text-field class="input" type="number" fullWidth/><br/>
        </li>
        <li class="flex-li">
          <span class="title">密码：</span>
          <mu-text-field class="input" type="password" fullWidth/><br/>
        </li>
      </ul>
      <div class="submit">
        <mu-raised-button label="绑定" class="demo-raised-button" primary fullWidth/>
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .go-bing {
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
    .content {
      padding:  20px 16px;
      .flex-li {
        display: flex;
        align-items: center;
        .title {
          font-size: 16px;
          color: #333;
        }
        .input {
          flex: 1;
        }
      }
      .submit {
        padding: 20px 40px;
        margin-top: 20px;
      }
    }
  }
</style>
