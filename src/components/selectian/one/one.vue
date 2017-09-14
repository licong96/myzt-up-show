<template lang="html">
  <!-- 投资人 -->
  <section class="fixed-wrapp">
    <header class="header">
      <mu-appbar title="我要投资/查看项目(投资人)">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      </mu-appbar>
    </header>
    <alloy-scroll ref="scrolls" :scroll-head="scrollHead">
      <!-- 投资人问卷调查 -->
      <article class="survey-wrap" v-show="showNext">
        <section class="survey">
          <h4 class="title">合格投资人问卷调查</h4>
          <p class="message">若由于填写信息不实，账号转借或被盗用等情况所产生的任何法律后果将由您本人承担，且蚂蚁众投有权取消你因此取得的合格投资人资格</p>
          <mobile-tear-sheet>
            <div class="mobile-wrap">
              <p class="topic">1.您近三年个人年均收入情况：</p>
              <mu-radio label="5万—20万" name="revenue" nativeValue="1" v-model="survey.revenue" class="demo-radio"/><br/>
              <mu-radio label="20万—50万" name="revenue" nativeValue="2" v-model="survey.revenue"  class="demo-radio"/><br/>
              <mu-radio label="50万—100万" name="revenue" nativeValue="3" v-model="survey.revenue"  class="demo-radio"/><br/>
              <mu-radio label="100万以上" name="revenue" nativeValue="4" v-model="survey.revenue"  class="demo-radio"/><br/>
            </div>
          </mobile-tear-sheet>
          <mobile-tear-sheet>
            <div class="mobile-wrap">
              <p class="topic">2.您预计投资股权融资的资产占您总资产的比例：</p>
              <mu-radio label="1%—5%" name="accounted" nativeValue="1" v-model="survey.accounted" class="demo-radio"/><br/>
              <mu-radio label="5%—10%" name="accounted" nativeValue="2" v-model="survey.accounted"  class="demo-radio"/><br/>
              <mu-radio label="10%—20%" name="accounted" nativeValue="3" v-model="survey.accounted"  class="demo-radio"/><br/>
              <mu-radio label="50%" name="accounted" nativeValue="4" v-model="survey.accounted"  class="demo-radio"/><br/>
            </div>
          </mobile-tear-sheet>
          <mobile-tear-sheet>
            <div class="mobile-wrap">
              <p class="topic">3.您的金融资产情况：</p>
              <mu-radio label="5万—100万" name="financial" nativeValue="1" v-model="survey.financial" class="demo-radio"/><br/>
              <mu-radio label="100万—300万" name="financial" nativeValue="2" v-model="survey.financial"  class="demo-radio"/><br/>
              <mu-radio label="300万—500万" name="financial" nativeValue="3" v-model="survey.financial"  class="demo-radio"/><br/>
              <mu-radio label="500万以上" name="financial" nativeValue="4" v-model="survey.financial"  class="demo-radio"/><br/>
            </div>
          </mobile-tear-sheet>
          <mobile-tear-sheet>
            <div class="mobile-wrap">
              <p class="topic">4.您预计投资的项目数量：</p>
              <mu-radio label="1个—3个" name="itemsnum" nativeValue="1" v-model="survey.itemsnum" class="demo-radio"/><br/>
              <mu-radio label="3个—5个" name="itemsnum" nativeValue="2" v-model="survey.itemsnum"  class="demo-radio"/><br/>
              <mu-radio label="5个—10个" name="itemsnum" nativeValue="3" v-model="survey.itemsnum"  class="demo-radio"/><br/>
              <mu-radio label="10个以上" name="itemsnum" nativeValue="4" v-model="survey.itemsnum"  class="demo-radio"/><br/>
            </div>
          </mobile-tear-sheet>
          <div class="next">
            <mu-raised-button label="下一步" primary @click="next"/>
          </div>
        </section>
      </article>
      <!-- 投资偏好 -->
      <transition name="tranx">
          <article class="preference" v-show="!showNext">
            <h4 class="title">填写投资偏好</h4>
            <p class="message">为更好的提供服务，请完善您在平台的身份信息</p>
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
                <p class="topic">关注阶段：</p>
                <div v-for="list in stageList">
                  <mu-checkbox name="group" :nativeValue="list.id" v-model="preference.stage" :label="list.sname" class="demo-checkbox" />
                </div>
              </div>
            </mobile-tear-sheet>
            <mobile-tear-sheet>
              <div class="mobile-wrap">
                <p class="topic">单个项目可投金额（范围）：</p>
                <div class="mobile-flex">
                  <mu-text-field hintText="最低（万元）" type="number" v-model="preference.min" class="flex-1"/>
                  <mu-icon value="trending_flat" class="line"/>
                  <mu-text-field hintText="最高（万元）" type="number" v-model="preference.max" class="flex-1"/>
                  <span class="ten">万元</span>
                </div>
              </div>
            </mobile-tear-sheet>
            <div class="submit">
              <mu-raised-button label="提交" primary @click="submit"/>
            </div>
          </article>
      </transition>
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
        scrollHead: 100,          // 增加滑动距离
        showNext: true,          // 显示下一步
        survey: {                 // 问卷调查
          revenue: '',
          accounted: '',
          financial: '',
          itemsnum: ''
        },
        preference: {           // 投资偏好
          territory: [],
          stage: [],
          min: '',
          max: ''
        },
        industryList: [],     // 项目分类
        stageList: []         // 项目阶段
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
      next () {
        if (this.survey.revenue === '') {
          this.setMuDialog(true)
          this.setMuDialogText('请选择年收入情况')
          this.setMuDialogUrl('')
        } else if (this.survey.accounted === '') {
          this.setMuDialog(true)
          this.setMuDialogText('请选择总资产比例')
          this.setMuDialogUrl('')
        } else if (this.survey.financial === '') {
          this.setMuDialog(true)
          this.setMuDialogText('请选择金融资产情况')
          this.setMuDialogUrl('')
        } else if (this.survey.itemsnum === '') {
          this.setMuDialog(true)
          this.setMuDialogText('请选择预计投资的项目数量')
          this.setMuDialogUrl('')
        } else {
          this.axios.post('/api/user/survey', this.survey)
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              this.showNext = false
              this.$refs.scrolls.to(0)
              this.$refs.scrolls.countHeight(this.scrollHead)
            }
          }.bind(this))
        }
      },
      submit () {
        if (!this.preference.territory.length) {
          this.setMuDialog(true)
          this.setMuDialogText('请选择关注领域')
          this.setMuDialogUrl('')
        } else if (!this.preference.stage.length) {
          this.setMuDialog(true)
          this.setMuDialogText('请选择关注阶段')
          this.setMuDialogUrl('')
        } else if (!this.preference.min || !this.preference.max) {
          this.setMuDialog(true)
          this.setMuDialogText('请输入单个项目可投金额')
          this.setMuDialogUrl('')
        } else if (this.preference.min > this.preference.max) {
          this.setMuDialog(true)
          this.setMuDialogText('最小金额不能大于最大金额')
          this.setMuDialogUrl('')
        } else {
          let self = this
          this.axios.post('/api/user/investors', this.preference)
          .then(function (response) {
            console.log(response)
            if (response.data.code === 1) {
              self.setMuDialog(true)
              self.setMuDialogText('资料已提交，等待审核中，回首页')
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
    .mobile-tear-sheet {
      margin: 16px auto 0 auto;
    }
    // 投资人问卷调查 和 投资偏好
    .survey-wrap,
    .preference {
      .title {
        margin: 16px 0 0 0;
        padding: 0 16px;
        font-size: 16px;
      }
      .message {
        margin: 10px 0 0 0;
        padding: 0 16px;
        font-size: 14px;
        color: #666;
      }
      .mobile-wrap {
        padding: 10px 16px;
        .topic {
          margin: 0;
          font-size: 16px;
          color: #333;
        }
        .demo-radio,
        .demo-checkbox {
          margin-top: 10px;
        }
        .mobile-flex {
          display: flex;
          align-items: center;
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
      }
      .next,
      .submit {
        margin: 20px 0;
        text-align: center;
      }
    }
  }
</style>
