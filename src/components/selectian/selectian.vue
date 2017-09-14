<template lang="html">
  <section class="selectian">
    <header class="header">
      <mu-appbar title="身份认证">
        <!-- <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
        <mu-icon-button icon="menu" slot="right" @click="openSlideout"/> -->
      </mu-appbar>
    </header>
    <!-- 先填身份证 -->
    <article class="card" v-show="showNext">
      <mu-text-field label="姓名" type="text" labelFloat v-model="inputData.userName" errorColor="#4caf50" @textOverflow="userNameOverflow" :errorText="inputMsg.userNameErrorText" :maxLength="6" fullWidth />
      <mu-text-field label="身份证" type="number" labelFloat v-model="inputData.idCard" errorColor="#4caf50" @textOverflow="cardOverflow" :errorText="inputMsg.cardErrorText" :maxLength="18" fullWidth />
      <div class="next">
        <mu-raised-button label="下一步" class="demo-raised-button" primary @click="next"/>
      </div>
    </article>
    <!-- 选择身份 -->

    <transition name="tranx">
      <article class="main" v-show="!showNext">
        <mobile-tear-sheet>
          <mu-list>
            <mu-list-item class="border-b" title="我要投资/查看项目(投资人)" @click="links('one')">
              <mu-icon slot="right" value="keyboard_arrow_right"/>
            </mu-list-item>
            <mu-list-item class="border-b" title="我要领头项目(投资经理)" @click="links('two')">
              <mu-icon slot="right" value="keyboard_arrow_right"/>
            </mu-list-item>
            <mu-list-item class="border-b" title="我要融资(创业者)" @click="links('three')">
              <mu-icon slot="right" value="keyboard_arrow_right"/>
            </mu-list-item>
            <mu-list-item class="border-no" title="我要点评项目(产业专家)" @click="links('four')">
              <mu-icon slot="right" value="keyboard_arrow_right"/>
            </mu-list-item>
          </mu-list>
        </mobile-tear-sheet>
      </article>
    </transition>
    <!-- 填写相应的信息 -->
    <transition name="tranx">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import mobileTearSheet from '@/base/muse-ui/mobileTearSheet'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        showNext: true,
        inputData: {
          userName: '',         // 姓名
          idCard: ''            // 身份证
        },
        inputMsg: {
          userNameErrorText: '',
          cardErrorText: ''
        }
      }
    },
    methods: {
      userNameOverflow (isOverflow) {         // 验证姓名
        this.inputMsg.userNameErrorText = isOverflow ? '您输入的姓名不靠谱' : ''
      },
      cardOverflow (isOverflow) {           // 验证身份证
        this.inputMsg.cardErrorText = isOverflow ? '您输入的身份证号不合格' : ''
      },
      next () {         // 填写完身份证后执行，下一步
        if (this.inputData.userName && this.inputData.idCard && !this.inputMsg.userNameErrorText && !this.inputMsg.cardErrorText) {
          this.axios.post('/api/user/realname', this.inputData)
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              this.showNext = false
            }
          }.bind(this))
        } else {
          this.setMuDialog(true)
          this.setMuDialogText('请输入真实信息后再下一步')
          this.setMuDialogUrl('')
        }
      },
      links (path) {          // 选择身份，填写信息
        this.$router.push({
          path: `/account/selectian/${path}`
        })
      },
      back () {
        // this.$router.back()
      },
      openSlideout () {   // 打开侧边栏导航
        window.slideNav.toggle()
      },
      ...mapMutations({             // 设置
        setMuDialog: 'SET_MUDIALOG',
        setMuDialogText: 'SET_MUDIALOGTEXT',
        setMuDialogUrl: 'SET_MUDIALOGURL'
      })
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
    background-color: #fff;
    .card {
      padding: 20px;
      .next {
        margin-top: 20px;
        text-align: center;
      }
    }
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
