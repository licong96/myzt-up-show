<template lang="html">
  <!-- 绑定微信，功能暂无，但是保留 -->
  <section class="bind-wechat">
    <header class="header">
      <mu-appbar title="微信登录"></mu-appbar>
    </header>
    <section class="main">
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <mu-list-item class="border-b" title="已有蚂蚁众投账号，去绑定" @click="links('gobing')">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item title="尚未注册蚂蚁众投账号，去注册" @click="links('goregister')">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
        </div>
      </mobile-tear-sheet>
    </section>
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import mobileTearSheet from '@/base/muse-ui/mobileTearSheet'

  export default {
    methods: {
      links (path) {
        this.$router.push({
          path: `/wechat/${path}`
        })
      }
    },
    components: {
      mobileTearSheet
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .bind-wechat {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    .main {
      padding: 20px 16px;
      .mobile-tear-sheet {
        margin: 0 auto;
        .mobile-wrap {
          padding: 16px;
        }
      }
      .border-b {
        @include border(b);
      }
    }
  }
</style>
