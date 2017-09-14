<template lang="html">
  <!-- 产业专家 -->
  <section class="fixed-wrapp">
    <header class="header">
      <mu-appbar title="我要点评项目(产业专家)">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      </mu-appbar>
    </header>
    <alloy-scroll ref="scrolls" :scroll-head="scrollHead">
      <h4 class="title">为更好的提供服务，请完善您在平台的身份信息</h4>
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <ul>
            <li class="info-li">
              <span class="desc">公司全称：</span>
              <mu-text-field hintText="请填写任职公司全称" type="text" v-model="preference.companyName" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">任职职位：</span>
              <mu-text-field hintText="请填写职位" type="text" v-model="preference.companyPost" fullWidth />
            </li>
          </ul>
        </div>
      </mobile-tear-sheet>
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <p class="topic">关注领域：</p>
          <div v-for="list in industryList">
            <mu-checkbox name="group" :nativeValue="list.id" v-model="preference.territory" :label="list.cname" class="demo-checkbox" />
          </div>
        </div>
      </mobile-tear-sheet>
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <p class="topic">个人标签：</p>
          <mu-radio label="资深从业人员" name="labels" nativeValue="1" v-model="preference.labels"  class="demo-radio"/><br/>
          <mu-radio label="行业专家教授" name="labels" nativeValue="2" v-model="preference.labels" class="demo-radio"/><br/>
          <mu-radio label="国内外知名学者" name="labels" nativeValue="3" v-model="preference.labels"  class="demo-radio"/><br/>
        </div>
      </mobile-tear-sheet>
      <div class="submit">
        <mu-raised-button label="提交" primary @click="submit"/>
      </div>
    </alloy-scroll>
  </section>
</template>

<script>
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import mobileTearSheet from '@/base/muse-ui/mobileTearSheet'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        scrollHead: 100,
        preference: {
          companyName: '',
          companyPost: '',
          territory: [],
          labels: ''
        },
        industryList: [],
        stageList: []
      }
    },
    created () {
      this.getIndustryList()
    },
    methods: {
      getIndustryList () {        // 获取项目分类，和阶段
        let self = this
        this.axios.get('/api/project/getaddinfo')
        .then(function (response) {
          self.industryList = response.data.industry
          self.stageList = response.data.stage
          self.$nextTick(() => {
            self.$refs.scrolls.countHeight(self.scrollHead)
          })
        })
      },
      submit () {
        if (!this.preference.companyName || !this.preference.companyPost || !this.preference.territory.length || !this.preference.labels) {
          this.setMuDialog(true)
          this.setMuDialogText('请把资料填写完整再提交')
          this.setMuDialogUrl('')
        } else {
          let self = this
          this.axios.post('/api/user/experts', this.preference)
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              self.setMuDialog(true)
              self.setMuDialogText('资料已提交，等待审核中，回首页')
              self.setMuDialogUrl('/home')
            } else {
              self.setMuDialog(true)
              self.setMuDialogText(response.data.msg)
              self.setMuDialogUrl('/home')
            }
          })
        }
      },
      back () {
        this.$router.back()
      },
      ...mapMutations({             // 设置
        setMuDialog: 'SET_MUDIALOG',
        setMuDialogText: 'SET_MUDIALOGTEXT',
        setMuDialogUrl: 'SET_MUDIALOGURL'
      })
    },
    components: {
      AlloyScroll,
      mobileTearSheet
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .fixed-wrapp {
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
    .title {
      margin: 16px 0 0 0;
      padding: 0 16px;
      font-size: 16px;
    }
    .mobile-tear-sheet {
      margin: 16px auto 0 auto;
      .mobile-wrap {
        padding: 10px 16px;
        .border-b {
          padding-bottom: 10px;
          @include border(b);
        }
        .topic {
          margin: 0;
          font-size: 16px;
          color: #333;
        }
        .demo-radio,
        .demo-checkbox {
          margin-top: 10px;
        }
        .info-li {
          display: flex;
          align-items: center;
          margin-top: 6px;
          .desc {
            margin-right: 16px;
          }
          .mu-text-field.full-width {
            flex: 1;
          }
          .mu-text-field {
            margin: 0;
          }
        }
        .mobile-flex {
          display: flex;
          align-items: center;
          .head {
            padding-right: 10px;
            color: #666;
          }
          .flex-1 {
            flex: 1;
          }
          .line {
            padding: 0 12px;
            font-size: 40px;
            color: $color-background;
          }
          .ten {
            padding-left: 12px;
            font-size: 16px;
            color: $color-background;
          }
        }
        .revenue {
          position: relative;
        }
      }
    }
    .submit {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
