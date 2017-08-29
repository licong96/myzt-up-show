<template lang="html">
  <alloy-scroll ref="scrolls" :scroll-value="scrollValue" @scroll="scroll">
    <section class="upload">
      <header class="header">
        <mu-appbar title="上传项目">
          <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
          <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
        </mu-appbar>
      </header>
      <!-- 上传图片 -->
      <div class="upload-img">
        <!-- 背景图片 -->
        <div class="blur-bg" :style="blurBg" v-show="inputData.image"></div>
        <mu-paper class="demo-paper" :zDepth="1">
          <img class="show-image" :src="inputData.image" alt="" v-show="inputData.image">
        </mu-paper>
        <vue-core-image-upload
          class="btn btn-primary"
          crop-ratio="1:0.8"
          crop="local"
          :cropBtn="{'ok': '确定', 'cancel': '取消'}"
          @imageuploaded="imageuploaded"
          @imagechanged="imagechanged"
          @imageuploading="imageuploading"
          @errorhandle="errorhandle"
          :max-file-size="2097152"
          :isXhr="true"
          url="wxgroupapi.php?type=uploadimg"
          text="">
          <mu-raised-button class="demo-raised-button" label="上传logo或者图片" icon="cloud_upload" primary />
        </vue-core-image-upload>
      </div>
      <mu-divider />
      <!-- 填写内容 -->
      <div class="message">
        <span class="desc"><mu-icon value="*" class="asterisk"/></span>
        是必填项
      </div>
      <mu-divider />
      <div class="fomr">
        <!-- 个人基本信息 -->
        <section class="basic-info">
          <ul>
            <li class="info-li">
              <span class="desc">
                联系人<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field hintText="联系人" type="text" v-model="inputData.linkman" :errorText="inputMsg.linkmanErrorText" @textOverflow="linkmanOverflow" :maxLength="5" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                手机号<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field hintText="手机号" type="number" v-model="inputData.phone" @input="verifyPhone" :errorText="inputMsg.phoneErrorText" @textOverflow="phoneOverflow" :maxLength="11" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                邮箱号<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field hintText="邮箱号" type="email" v-model="inputData.mail" @input="verifyMail"  :errorText="inputMsg.mailErrorText" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                微信号
              </span>
              <mu-text-field hintText="微信号（选填）" type="text" v-model="inputData.wechat" @input="verifyWechat" :errorText="inputMsg.wechatErrorText" errorColor="#4caf50" fullWidth />
            </li>
          </ul>
        </section>
        <mu-divider />
        <div class="message"></div>
        <mu-divider />
        <!-- 项目信息 -->
        <section class="item-info">
          <ul>
            <li class="info-li">
              <span class="desc">
                项目名称<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field hintText="项目名称" type="text" v-model="inputData.name" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                项目介绍<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field label="简要描写项目（30字以内）" type="text" labelFloat v-model="inputData.introduce" errorColor="#4caf50" multiLine :rows="2" :rowsMax="3" @textOverflow="introduceOverflow" :errorText="inputMsg.introduceErrorText" :maxLength="30" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                项目分类<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1">
                <mu-select-field v-model="inputData.industry" :labelFocusClass="['label-foucs']" label="选择项目产业" :maxHeight="300">
                  <mu-menu-item v-for="(text, index) in industryList" :key="index" :value="index" :title="text" />
                </mu-select-field>
              </div>
            </li>
            <li class="info-li">
              <span class="desc">
                项目阶段<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1">
                <mu-select-field v-model="inputData.stage" :labelFocusClass="['label-foucs']" label="选择项目阶段" :maxHeight="300">
                  <mu-menu-item v-for="(text, index) in stageList" :key="index" :value="index" :title="text" />
                </mu-select-field>
              </div>
            </li>
            <!-- <li class="info-li">
              <span class="desc">
                项目标签<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1">
                <mu-checkbox name="group" nativeValue="value1" v-model="inputData.label" label="标签一" class="demo-checkbox"/>
                <mu-checkbox name="group" nativeValue="value2" v-model="inputData.label" label="标签二" class="demo-checkbox"/>
                <mu-checkbox name="group" nativeValue="value3" v-model="inputData.label" label="标签三" class="demo-checkbox"/>
              </div>
            </li> -->
          </ul>
        </section>
        <mu-divider />
        <div class="message"></div>
        <mu-divider />
        <!-- 地区，项目概况 -->
        <section class="last-info">
          <ul>
            <li class="flex-li">
              <span class="desc">
                所在城市<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1 city">
                <mu-flat-button @click="open('bottom')" class="demo-flat-button" icon="place" primary>
                  {{inputData.cityvalue}}
                </mu-flat-button>
                <mu-divider />
              </div>
            </li>
            <li class="general">
              <span class="desc">
                项目概况<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-divider />
              <mu-text-field label="项目概况" type="text" labelFloat v-model="inputData.general" errorColor="#4caf50" multiLine :rows="6" :rowsMax="6" fullWidth />
            </li>
            <li class="flex-li">
              <span class="desc">
                商业计划书
              </span>
              <mu-raised-button class="demo-raised-button" label="选择文件" icon="cloud_upload" primary>
                <input type="file" class="file-button">
              </mu-raised-button>
            </li>
          </ul>
        </section>
        <mu-divider />
        <!-- 同意协议，并且提交 -->
        <section class="food-btn">
          <div class="consent">
            <mu-checkbox label="我已阅读并且同意" class="demo-checkbox" :value="inputData.greement" />
            <span class="open-link">《协议》</span>
          </div>
          <div class="submit">
            <mu-raised-button class="demo-raised-button" label="提交" primary/>
          </div>
        </section>
      </div>
      <!-- 选择地区 -->
      <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
        <mu-appbar title="滑动选择城市" class="set-header">
          <mu-flat-button slot="right" label="确定" color="white" @click="close('bottom')"/>
        </mu-appbar>
        <mu-content-block>
          <div class="demo-picker-container">
            <mu-picker :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
          </div>
        </mu-content-block>
      </mu-popup>
    </section>
  </alloy-scroll>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload'
  import AlloyScroll from '@/base/alloyscroll/alloyscroll'
  import {address} from '@/common/js/city'
  import Transform from 'css3transform'

  export default {
    data() {
      return {
        inputData: {
          image: '',                // 图片
          linkman: '',            // 联系人
          phone: '',             // 手机号
          mail: '',             // 邮箱
          wechat: '',           // 微信
          name: '',            // 项目名称
          introduce: '',       // 项目描述
          industry: '',        // 项目产业
          stage: '',           // 项目阶段
          label: [],           // 项目标签
          cityvalue: '北京 / 北京',  // 地区
          general: '',          // 项目概况
          greement: true        // 默认同意协议书
        },
        inputMsg: {
          linkmanErrorText: '',      // 联系人输入错误提示
          phoneErrorText: '',       // 手机号输入错误提示
          mailErrorText: '',        // 邮箱输入错误提示
          wechatErrorText: '',      // 微信输入错误提示
          introduceErrorText: ''    // 项目简介
        },
        industryList: ['互联网', '互联网金融', 'O2O', '大数据', '电子游戏', 'VR及3D打印'],    // 项目产业
        stageList: ['概念阶段', '研发中', '产品已发布', '产品已盈利', '其他'],   // 项目阶段
        bottomPopup: false,   // 打开关闭底部popup，选择城市
        addressSlots: [
          {
            width: '100%',
            textAlign: 'right',
            values: Object.keys(address)
          }, {
            width: '100%',
            textAlign: 'left',
            values: ['北京']
          }
        ],
        address: ['北京', '北京'],
        addressProvince: '北京',
        addressCity: '北京',
        scrollValue: true         // 传给滚动页面，返回value
      }
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    methods: {
      imageuploaded (res) {   // 图片上传裁切
        if (res.errcode === 0) {
          this.inputData.image = res.data.src
        }
      },
      imagechanged (res) {
        this.$refs.scrolls.to(0, 0)          // 滑动回到 0
        this.inputData.image = res
      },
      imageuploading () {
        console.log('上传过程中动画')
      },
      errorhandle (res) {
        alert('图片不能超过2M', res, 'error')
      },
      scroll (value) {        // 图片裁切页的滑动距离和页面保持一致
        let core = document.getElementsByClassName('g-core-image-corp-container')[0]
        Transform(core, true)
        core.translateY = -value
      },
      linkmanOverflow (isOverflow) {    // 联系人验证
        this.inputMsg.linkmanErrorText = isOverflow ? '这个名字不靠谱' : ''
      },
      phoneOverflow (isOverflow) {    // 联系人验证
        this.inputMsg.phoneErrorText = isOverflow ? '手机号码有误' : ''
      },
      verifyPhone () {      // 验证手机号是否合格
        this.inputMsg.phoneErrorText = ''
        if (this.phoneTimer) clearTimeout(this.phoneTimer)
        this.phoneTimer = setTimeout(() => {
          let reg = /^1(3|4|5|7|8)\d{9}$/
          if (!reg.test(this.inputData.phone)) {
            this.inputMsg.phoneErrorText = '手机号码有误'
          } else {
            this.inputMsg.phoneErrorText = ''
          }
        }, 1000)
      },
      verifyMail () {     // 验证邮箱地址
        this.inputMsg.mailErrorText = ''
        if (this.mailTimer) clearTimeout(this.mailTimer)
        this.mailTimer = setTimeout(() => {
          let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          if (!reg.test(this.inputData.mail)) {
            this.inputMsg.mailErrorText = '邮箱号码有误'
          } else {
            this.inputMsg.mailErrorText = ''
          }
        }, 1000)
      },
      verifyWechat () {     // 验证微信
        this.inputMsg.wechatErrorText = ''
        if (this.wechatTimer) clearTimeout(this.wechatTimer)
        this.wechatTimer = setTimeout(() => {
          let reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
          if (!reg.test(this.inputData.wechat)) {
            this.inputMsg.wechatErrorText = '微信号码有误'
          } else {
            this.inputMsg.wechatErrorText = ''
          }
          if (!this.inputData.wechat) {
            this.inputMsg.wechatErrorText = ''
          }
        }, 1000)
      },
      introduceOverflow (isOverflow) {    // 项目介绍
        this.inputMsg.introduceErrorText = isOverflow ? '字数已超过最大限制，请精简' : ''
      },
      open (position) {         // 打开popup
        this[position + 'Popup'] = true
      },
      close (position) {        // 关闭popup
        this[position + 'Popup'] = false
      },
      addressChange (value, index) {    // 城市选择
        switch (index) {
          case 0:
            this.addressProvince = value
            const arr = address[value]
            this.addressSlots[1].values = arr
            this.addressCity = arr[0]
            break
          case 1:
            this.addressCity = value
            break
        }
        this.address = [this.addressProvince, this.addressCity]
      },
      openSlideout () {     // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.back()
      }
    },
    computed: {
      blurBg () {
        return `background-image: url(${this.inputData.image})`
      }
    },
    watch: {
      addressProvince () {      // 今天城市选择
        this.inputData.cityvalue = this.addressProvince + ' / ' + this.addressCity
      },
      addressCity () {
        this.inputData.cityvalue = this.addressProvince + ' / ' + this.addressCity
      }
    },
    components: {
      VueCoreImageUpload,
      AlloyScroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/sass/colour";

  .upload {
    margin-bottom: 50px;
    background-color: #fff;
  }
  .upload-img {
    overflow: hidden;
    position: relative;
    padding-bottom: 20px;
    background-color: #fff;
    text-align: center;
    .show-image {
      width: 100%;
      height: 100%;
    }
    .blur-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      filter: blur(20px);
      transform: scale(1.2);
    }
    .demo-paper {
      display: block;
      position: relative;
      z-index: 2;
      margin: 20px auto;
      width: 200px;
      height: 160px;
      background-color: $color-body-bg;
    }
  }
  .message {
    position: relative;
    text-align: right;
    padding:4px 15px;
    background-color: $color-body-bg;
    font-size: 12px;
    color: $color-background;
    .desc {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
    }
    .asterisk {
      position: static;
    }
  }
  // 内容
  .fomr {
    background-color: #fff;
    // 基本信息
    .basic-info,
    .item-info {
      padding: 15px;
      .info-li {
        display: flex;
        align-items: center;
        .desc {
          margin-right: 30px;
        }
        .mu-text-field.full-width {
          flex: 1;
        }
      }
    }
    // 项目内容
    .item-info {
      .mu-text-field{
        width: 100%;
      }
      .flex-1 {
        flex: 1;
      }
      .demo-checkbox {
        margin: 0 30px 15px 0;
      }
    }
    // 项目概况
    .last-info {
      padding: 15px;
      .flex-li {
        display: flex;
        align-items: center;
        .desc {
          margin-right: 30px;
        }
        .city {
          flex: 1;
        }
      }
      .general {
        margin-top: 20px;
      }
    }
  }

  // 底部协议和提交按钮
  .food-btn {
    padding: 15px;
    background-color: $color-body-bg;
    .consent {
      display: flex;
      align-items: center;
      .open-link {
        color: green;
      }
    }
    .submit {
      margin-top: 40px;
      text-align: center;
    }
  }

  // 图片上传
  .btn-primary {
    display: inline-block;
  }

  // 信号必填
  .desc {
    position: relative;
  }
  .asterisk {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 12px;
    height: 12px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 700;
    background: #f44336;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
  }
  // 错误提示
  .phone-toast {
    bottom: 20%;
    left: 50%;
    margin-left: -68px;
    width: 136px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .file-button{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
</style>
