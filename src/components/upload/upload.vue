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
          @errorhandle="errorhandle"
          :max-file-size="2097152"
          :isXhr="true"
          url="/api/upload/img"
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
              <mu-text-field hintText="联系人" type="text" v-model="inputData.linkman" :errorText="inputMsg.linkmanErrorText" @input="linkmanOverflow" :maxLength="6" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                手机号<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field hintText="手机号" type="number" v-model="inputData.phone" @input="verifyPhone" :errorText="inputMsg.phoneErrorText" :maxLength="11" errorColor="#4caf50" fullWidth />
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
              <mu-text-field hintText="项目名称" type="text" v-model="inputData.itemName" errorColor="#4caf50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                项目介绍<mu-icon value="*" class="asterisk"/>
              </span>
              <mu-text-field label="简要描写项目（50字以内）" type="text" labelFloat v-model="inputData.introduce" errorColor="#4caf50" multiLine :rows="2" :rowsMax="2" @textOverflow="introduceOverflow" :errorText="inputMsg.introduceErrorText" :maxLength="50" fullWidth />
            </li>
            <li class="info-li">
              <span class="desc">
                项目分类<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1">
                <mu-select-field v-model="inputData.industry" :labelFocusClass="['label-foucs']" label="选择项目分类" :maxHeight="300">
                  <mu-menu-item v-for="text in industryList" :key="text.id" :value="text.id" :title="text.cname" />
                </mu-select-field>
              </div>
            </li>
            <li class="info-li">
              <span class="desc">
                项目阶段<mu-icon value="*" class="asterisk"/>
              </span>
              <div class="flex-1">
                <mu-select-field v-model="inputData.stage" :labelFocusClass="['label-foucs']" label="选择项目阶段" :maxHeight="300">
                  <mu-menu-item v-for="text in stageList" :key="text.id" :value="text.id" :title="text.sname" />
                </mu-select-field>
              </div>
            </li>
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
              <span class="desc business">
                商业计划书
              </span>
              <mu-raised-button class="demo-raised-button" :label="fileTxt" icon="cloud_upload" primary>
                <input type="file" class="file-button" name="file" accept="application/vnd.ms-powerpoint,application/vnd.ms-works,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation" @change="uploadFile" ref="file">
              </mu-raised-button>
            </li>
          </ul>
        </section>
        <mu-divider />
        <!-- 同意协议，并且提交 -->
        <section class="food-btn">
          <div class="consent">
            <mu-checkbox label="我已阅读并且同意" class="demo-checkbox" :value="inputData.greement" @input="changeGreement"/>
            <span class="open-link">《协议》</span>
          </div>
          <div class="submit">
            <mu-raised-button class="demo-raised-button" label="提交" primary @click="submit"/>
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
      <!-- 提示消息 -->
      <mu-dialog :open="dialog" title="提示">
        {{dialogText}}
        <mu-flat-button label="确定" slot="actions" primary @click="dialogClose"/>
      </mu-dialog>
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
          image: '',             // 只做图片展示，不传后台
          url: '',               // 图片地址
          linkman: '',           // 联系人
          phone: '',             // 手机号
          mail: '',             // 邮箱
          wechat: '',           // 微信
          itemName: '',        // 项目名称
          introduce: '',       // 项目介绍
          industry: 0,        // 项目分类
          stage: 0,           // 项目阶段
          cityvalue: '北京 / 北京',  // 地区
          general: '',          // 项目概况
          pptid: 0,              // 商业计划书
          greement: true        // 默认同意协议书
        },
        inputMsg: {
          linkmanErrorText: '',      // 联系人输入错误提示
          phoneErrorText: '',       // 手机号输入错误提示
          mailErrorText: '',        // 邮箱输入错误提示
          wechatErrorText: '',      // 微信输入错误提示
          introduceErrorText: ''    // 项目简介
        },
        pass: {                 // 用来验证填写是否合格
          linkman: false,
          phone: false,
          mail: false,
          wechat: true,         // 微信号不是必填，所以是 true
          introduce: true       // 项目介绍，初始值为 true
        },
        industryList: [],    // 项目分类
        stageList: [],   // 项目阶段
        bottomPopup: false,   // 打开关闭底部popup，选择城市
        fileTxt: '请选择文件',        // 商业计划书，文字显示
        dialog: false,            // 提示框
        dialogText: '',           // 提示文字
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
        scrollValue: true,         // 传给滚动页面，返回value
        editID: 0               // 通过这个判断是上传还是编辑
      }
    },
    created() {
      this.editID = parseInt(this.$route.params.id)         // 获取到的id是个字符串
      this.getIndustryList()        // 获取项目分类数据，和阶段
      this.phoneReg = /^1(3|4|5|7|8)\d{9}$/    // 手机号验证
      this.mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/     // 邮箱地址
      this.wechatReg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/         // 微信
    },
    mounted() {
      this.$nextTick(() => {
        this.coreImg = document.getElementsByClassName('g-core-image-corp-container')[0]
        Transform(this.coreImg, true)
        // -------------------------------分割线------------------------------
        // textarea内容超出滑动，和页面滑动起冲突了，所以在里面阻止掉
        window.addEventListener('touchmove', function(e) {
          var target = e.target
          if (target && target.tagName === 'TEXTAREA') {     // textarea阻止冒泡
            e.stopPropagation()
          }
        }, true)
        window.addEventListener('touchend', function(e) {
          var target = e.target
          if (target && target.tagName === 'TEXTAREA') {     // textarea阻止冒泡
            e.stopPropagation()
          }
        }, true)
      })
    },
    methods: {
      getEdit (id) {              // 能走到这一步，已不再是上传，而是编辑了
        let self = this
        this.axios.get('/api/project/edit?id=' + id)
          .then(function (response) {
            // console.log(response)
            if (response.data.code === 1) {
              self.inputData = response.data.result
              self.inputData.image = self.inputData.url
              self.inputData.greement = true
              if (self.inputData.pptid) {
                self.fileTxt = '文件已上传成功'
              }
            }
          })
      },
      getIndustryList () {        // 获取项目分类，和阶段
        let self = this
        this.axios.get('/api/project/getaddinfo')
        .then(function (response) {
          self.industryList = response.data.industry
          self.stageList = response.data.stage
          // 判断是否有id，以此区分是上传还是编辑
          if (self.editID) {
            console.log(self.editID)        // 不为0，表示编辑
            self.getEdit(self.editID)          // 只有先获取到分类和阶段之后，才能完整显示
          }
        })
      },
      imageuploaded (res) {   // 图片上传，后台返回
        if (res.code === 1) {
          this.inputData.url = res.url
        } else {
          this.dialog = true
          this.dialogText = '图片上传失败！请重试或刷新页面'
        }
      },
      imagechanged (res) {    // 图片改变
        this.$refs.scrolls.to(0, 0)          // 滑动回到 0
        this.inputData.image = res
      },
      errorhandle (res) {     // 错误提示
        this.dialog = true
        this.dialogText = '图片不能超过2M'
      },
      scroll (obj) {        // 图片裁切页的滑动距离和页面保持一致，这是奇招
        this.coreImg.translateY = -obj.value
      },
      linkmanOverflow () {    // 联系人验证
        this.inputMsg.linkmanErrorText = ''
        if (this.inputData.linkman.length > 6 || this.inputData.linkman.length < 2) {
          this.pass.linkman = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            if (!this.pass.linkman) {
              this.inputMsg.linkmanErrorText = '这个名字不靠谱'
            }
          }, 1000)
        } else {
          this.pass.linkman = true
          this.inputMsg.linkmanErrorText = ''
        }
      },
      verifyPhone () {      // 验证手机号是否合格
        this.inputMsg.phoneErrorText = ''
        if (!this.phoneReg.test(this.inputData.phone)) {
          this.pass.phone = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            if (!this.pass.phone) {
              this.inputMsg.phoneErrorText = '手机号码有误'
            }
          }, 1000)
        } else {
          this.pass.phone = true
          this.inputMsg.phoneErrorText = ''
        }
      },
      verifyMail () {     // 验证邮箱地址
        this.inputMsg.mailErrorText = ''
        if (!this.mailReg.test(this.inputData.mail)) {
          this.pass.mail = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            if (!this.pass.mail) {
              this.inputMsg.mailErrorText = '邮箱号码有误'
            }
          }, 1000)
        } else {
          this.pass.mail = true
          this.inputMsg.mailErrorText = ''
        }
      },
      verifyWechat () {     // 验证微信
        this.inputMsg.wechatErrorText = ''
        if (!this.wechatReg.test(this.inputData.wechat)) {
          this.pass.wechat = false
          // 用延迟的方式显示文字提示，有助于提升输入体验
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            if (!this.pass.wechat) {
              this.inputMsg.wechatErrorText = '微信号码有误'
            }
          }, 1000)
        } else {
          this.pass.wechat = true
          this.inputMsg.wechatErrorText = ''
        }
      },
      introduceOverflow (isOverflow) {    // 项目介绍
        this.pass.introduce = !isOverflow
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
      uploadFile () {               // 商业计划书上传
        let self = this
        let file = this.$refs.file.files[0]
        if (file) {
          if (file.size > 31457280) {           // 不能大于30mb
            self.dialog = true
            self.dialogText = '文件大小不能超过30MB'
          } else {
            self.fileTxt = file.name
            let formData = new FormData()
            formData.append('file', file)
            this.axios.post('/api/upload/ppt', formData)
            .then(function (response) {
              console.log(response)
              if (response.data.code === 1) {
                self.inputData.pptid = response.data.fileid
              } else {
                self.dialog = true
                self.dialogText = '文件上传失败！'
                self.fileTxt = '请选择文件'
              }
            })
          }
        }
      },
      changeGreement () {       // 同意协议
        this.inputData.greement = !this.inputData.greement
      },
      submit () {           //  提交
        if (!this.inputData.url) {
          this.dialog = true
          this.dialogText = '请上传LOGO或者图片'
        } else if (!this.pass.linkman) {
          this.dialog = true
          this.dialogText = '联系人的姓名不靠谱'
        } else if (!this.pass.phone) {
          this.dialog = true
          this.dialogText = '手机号有误'
        } else if (!this.pass.mail) {
          this.dialog = true
          this.dialogText = '邮箱号有误'
        } else if (!this.pass.wechat && this.inputData.wechat) {      // 并且输入了微信号
          this.dialog = true
          this.dialogText = '微信号有误'
        } else if (this.inputData.itemName === '') {
          this.dialog = true
          this.dialogText = '项目名称不能为空'
        } else if (this.inputData.introduce === '') {
          this.dialog = true
          this.dialogText = '请输入项目介绍'
        } else if (!this.pass.introduce) {
          this.dialog = true
          this.dialogText = '项目介绍文字不能超过最大限制'
        } else if (this.inputData.industry === 0) {
          this.dialog = true
          this.dialogText = '请选择项目分类'
        } else if (this.inputData.stage === 0) {
          this.dialog = true
          this.dialogText = '请选择项目阶段'
        } else if (this.inputData.general === '') {
          this.dialog = true
          this.dialogText = '请输入项目概况'
        } else if (!this.inputData.greement) {
          this.dialog = true
          this.dialogText = '您需要勾选同意协议，才能提交'
        } else {
          let self = this
          // 判断是否有id，以此区分是上传还是编辑
          if (self.editID) {
            this.axios.post('/api/project/edit', this.inputData)
              .then(function (response) {
                // console.log(response)
                if (response.data.code === 1) {
                  self.$router.push({
                    path: '/my/myUpload'
                  })
                } else {
                  self.dialog = true
                  self.dialogText = response.data.msg
                }
              })
          } else {
            this.axios.post('/api/project/add', this.inputData)
            .then(function (response) {
              // console.log(response)
              if (response.data.code === 1) {
                self.$router.push({
                  path: '/my/myUpload'
                })
              } else {
                self.dialog = true
                self.dialogText = response.data.msg
              }
            })
          }
        }
      },
      dialogClose () {      // 关闭提示对话框
        this.dialog = false
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
    padding-bottom: 40px;
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
        .business {
          margin-right: 16px;
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
  // 上传按钮样式
  .file-button{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
</style>
