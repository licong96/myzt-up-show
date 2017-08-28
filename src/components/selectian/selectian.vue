<template lang="html">
  <section class="selectian">
    <header class="header">
      <mu-appbar title="身份认证">
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
      </mu-appbar>
    </header>
    <article class="main">
      <mobile-tear-sheet>
        <mu-list>
          <mu-list-item class="border-b" title="我要投资/查看项目(投资人/一般产业人员)">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item class="border-b" title="我要领头项目(投资经理/领头机构)">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item class="border-b" title="我要融资(创业者)">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
          <mu-list-item class="border-no" title="我要点评项目(产业专家)">
            <mu-icon slot="right" value="keyboard_arrow_right"/>
          </mu-list-item>
        </mu-list>
      </mobile-tear-sheet>
    </article>
  </section>
</template>

<script>
  import mobileTearSheet from '@/base/muse-ui/mobileTearSheet'

  export default {
    data () {
      return {
      }
    },
    methods: {
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
      }
    },
    components: {
      mobileTearSheet
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .selectian {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: $color-body-bg;
    .main {
      display: block;
      margin: 40px auto;
    }
    .mu-list {
      padding: 0;
    }
    .mobile-tear-sheet {
      margin: 0 auto;
    }
    .mu-item-wrapper {
      border-bottom: 1px solid #eee;
    }
    .border-b {
      padding: 10px 0;
      @include border(b);
    }
    .border-no {
      padding: 10px 0;
    }
  }
</style>
