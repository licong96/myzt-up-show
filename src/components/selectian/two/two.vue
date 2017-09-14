<template lang="html">
  <!-- 投资经理 -->
  <section class="fixed-wrapp">
    <header class="header">
      <mu-appbar title="我要领头项目(投资经理)">
        <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      </mu-appbar>
    </header>
    <alloy-scroll ref="scrolls" :scroll-head="scrollHead">
      <h4 class="title">为更好的提供服务，请完善您在平台的身份信息</h4>
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <section class="border-b">
            <p class="topic">您是代表：</p>
            <mu-radio label="个人" name="representative" nativeValue="1" v-model="preference.representative" class="demo-radio"/><br/>
            <mu-radio label="投资机构" name="representative" nativeValue="2" v-model="preference.representative"  class="demo-radio"/><br/>
          </section>
          <section>
            <ul>
              <li class="info-li">
                <span class="desc">公司全称：</span>
                <mu-text-field hintText="请填写任职公司全称" type="text" v-model="preference.companyName" fullWidth />
              </li>
              <li class="info-li">
                <span class="desc">公司简称：</span>
                <mu-text-field hintText="请填写任职公司简称" type="text" v-model="preference.companyBrief" fullWidth />
              </li>
              <li class="info-li">
                <span class="desc">任职职位：</span>
                <mu-text-field hintText="请填写职位" type="text" v-model="preference.companyPost" fullWidth />
              </li>
            </ul>
          </section>
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
      <mobile-tear-sheet>
        <div class="mobile-wrap">
          <p class="topic">对项目是否有营收要求：</p>
          <div class="revenue">
            <mu-radio label="是" name="revenue" nativeValue="1" v-model="revenue" class="demo-radio"/><br/>
            <div class="mobile-flex" v-if="revenue==='1'">
              <span class="head">营业额度范围</span>
              <mu-text-field hintText="最低" type="number" v-model="preference.revenueMin" class="flex-1"/>
              <mu-icon value="trending_flat" class="line"/>
              <mu-text-field hintText="最高" type="number" v-model="preference.revenueMax" class="flex-1"/>
              <span class="ten">万元</span>
            </div>
            <mu-radio label="否" name="revenue" nativeValue="0" v-model="revenue"  class="demo-radio"/><br/><br/>
          </div>
          <!-- 分开 -->
          <p class="topic">对项目是否有利润要求：</p>
          <mu-radio label="是" name="profit" nativeValue="1" v-model="profit" class="demo-radio"/><br/>
          <div class="mobile-flex" v-if="profit==='1'">
            <span class="head">利润额度范围</span>
            <mu-text-field hintText="最低" type="number" v-model="preference.profitMin" class="flex-1"/>
            <mu-icon value="trending_flat" class="line"/>
            <mu-text-field hintText="最高" type="number" v-model="preference.profitMax" class="flex-1"/>
            <span class="ten">万元</span>
          </div>
          <mu-radio label="否" name="profit" nativeValue="0" v-model="profit"  class="demo-radio"/><br/>
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
        scrollHead: 56,
        preference: {
          representative: '1',
          companyName: '',
          companyBrief: '',
          companyPost: '',
          territory: [],
          stage: [],
          min: '',
          max: '',
          revenueMin: '',
          revenueMax: '',
          profitMin: '',
          profitMax: ''
        },
        revenue: '0',
        profit: '0',
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
        if (!this.preference.companyName || !this.preference.companyBrief || !this.preference.companyPost || !this.preference.territory.length || !this.preference.stage.length || !this.preference.min || !this.preference.max) {
          this.setMuDialog(true)
          this.setMuDialogText('请把资料填写完整再提交')
          this.setMuDialogUrl('')
        } else {
          let self = this
          this.axios.post('/api/user/leadinvestors', this.preference)
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
    watch: {
      revenue () {
        this.$refs.scrolls.countHeight(this.scrollHead)
      },
      profit () {
        this.$refs.scrolls.countHeight(this.scrollHead)
      }
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
