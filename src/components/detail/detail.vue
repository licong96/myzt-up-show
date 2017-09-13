<template lang="html">
  <section class="detail" ref="wrapper">
    <div ref="head">
      <header class="header">
        <mu-appbar title="项目详情">
          <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
          <mu-icon-button icon="menu" slot="right" @click="openSlideout"/>
        </mu-appbar>
      </header>
      <div class="image-wrap">
        <img class="image" :src="data.url" @load="loadImage" ref="scaleImg">
      </div>
    </div>
    <!-- 滚动区域 -->
    <div class="scroller" ref="scroller">
      <section class="top">
        <div class="collec">
          <h3 class="name">{{data.itemName}}</h3>
          <mu-checkbox :label="collectText" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" :value="collect" @change="changeCollect"/>
        </div>
        <p class="introduce">{{data.introduce}}</p>
        <p class="city"><mu-icon class="room" value="room"/>{{data.cityvalue}}</p>
      </section>
      <section class="classify">
        <mu-list-item class="item">
          <span class="title">项目分类：</span>
          <span class="list">{{data.cname}}</span>
        </mu-list-item>
        <mu-list-item class="item">
          <span class="title">项目阶段：</span>
          <span class="list">{{data.sname}}</span>
        </mu-list-item>
      </section>
      <section class="img-txt">
        <p class="txt">{{data.general}}</p>
        <!-- <img class="image" :src="data.url" @load="loadImage"> -->
      </section>
      <section class="business">
        <div class="inline-block" @click="download" v-if="data.pptid">
          <mu-float-button icon="file_download" class="demo-float-button"/>
          <p class="desc">下载商业计划书</p>
        </div>
      </section>
    </div>
    <!-- 关注 -->
    <section class="attention" @click="attentionBtn">
      <mu-list-item>{{attentionText}}</mu-list-item>
    </section>
    <!-- 关注填写信息 -->
    <div class="attention-dialog">
      <mu-dialog :open="dialog" title="请填写信息">
        <mu-text-field hintText="请输入您的名字" type="text" v-model="inputData.linkman" :errorText="inputMsg.linkmanErrorText" @input="linkmanOverflow" :maxLength="6" errorColor="#4caf50" fullWidth />
        <mu-text-field hintText="请输入您的手机号" type="number" v-model="inputData.phone" :errorText="inputMsg.phoneErrorText" @input="verifyPhone" :maxLength="11" errorColor="#4caf50" fullWidth />
        <mu-flat-button slot="actions" @click="dialogClose" label="取消"/>
        <mu-flat-button slot="actions" primary @click="dialogAffirm" label="确定"/>
      </mu-dialog>
    </div>
    <!-- 加载中 -->
    <article class="fixed-loading" v-show="loadings">
      <loading></loading>
    </article>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'
  import Loading from '@/base/loading/loading'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        data: {},               // 页面数据
        collect: false,         // 收藏
        attention: false,       // 关注
        dialog: false,          // 关注弹出输入
        every: true,        // 阻止多次提交
        inputData: {        // 弹出框，要发送的信息
          linkman: '',
          phone: '',
          id: 0
        },
        inputMsg: {         // 提示文字
          linkmanErrorText: '',
          phoneErrorText: ''
        },
        pass: {
          linkman: false,
          phone: false
        },
        loadings: true
      }
    },
    created() {
      this.detailAlloyTouch = null
      this.phoneReg = /^1(3|4|5|7|8)\d{9}$/    // 手机号验证
      this.getData()        // 获取数据
    },
    mounted() {
      setTimeout(() => {
        this.head = this.$refs.head
        this.scroller = this.$refs.scroller   // 保存全局，方便调用
        this.alloy()      // 页面滚动，需要等资源全部加载完成再初始化
      }, 20)
    },
    computed: {
      collectText () {          // 收藏文字
        let text = '收藏'
        this.collect ? text = '已收藏' : text = '收藏'
        return text
      },
      attentionText () {        // 关注文字
        let text = '关注'
        this.attention ? text = '已关注' : text = '关注'
        return text
      },
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      getData () {          // 获取数据
        let self = this
        // console.log(this.$route.params.id)
        let id = this.$route.params.id
        this.inputData.id = id            // 保存项目id
        this.axios.post('/api/index/detail', {id: id})
          .then(function (response) {
            console.log(response)
            self.data = response.data
            // 改变收藏和关注
            self.data.collection ? self.collect = true : self.collect = false
            self.data.follow ? self.attention = true : self.attention = false
            self.loadings = false
          })
      },
      alloy() {
        let self = this
        let touch = this.$refs.wrapper
        let scaleImg = this.$refs.scaleImg    // 图片放大
        let percent = 0           // 放大scale and 偏移大小 size
        // 内容高度
        Transform(this.scroller, true)   // true代表关闭透视投影，因为scroller里面是有文本，防止文本在IOS中模糊
        Transform(scaleImg)
        this.detailAlloyTouch = new AlloyTouch({
          touch: touch,
          vertical: true,
          target: self.scroller,
          property: 'translateY',
          sensitivity: 0.8, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
          factor: 0.8, // 不必需,表示触摸位移与被运动属性映射关系，默认值是1
          min: Math.min(window.innerHeight - self.scroller.clientHeight - self.head.clientHeight, 0),
          max: 0,
          change: function (value) {
            percent = Math.abs(value / self.head.clientHeight)
            if (value > 0) {      // 下拉放大
              percent += 1
              scaleImg.scaleX = scaleImg.scaleY = percent
              scaleImg.translateY = 0
            } else {
              percent *= 100
              scaleImg.translateY = -percent
            }
          },
          touchStart: function () {
          }
        })
      },
      loadImage () {        // 图片加载完成再计算高度
        if (this.detailAlloyTouch) {
          this.$nextTick(() => {
            this.detailAlloyTouch.min = window.innerHeight - this.scroller.clientHeight - this.head.clientHeight
          })
        }
      },
      linkmanOverflow () {            //  验证用户名
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
      attentionBtn () {       // 关注
        if (!this.attention) {
          this.dialog = true
        }
      },
      dialogClose () {      // 关闭弹出框
        this.dialog = false
      },
      dialogAffirm () {     // 弹出框确认，关注
        let self = this
        console.log(this.attention)
        if (this.pass.linkman && this.pass.phone && !this.attention) {
          this.axios.post('/api/index/follow', this.inputData)
            .then(function (response) {
              console.log(response)
              if (response.data.code === 1) {
                self.attention = true
                self.attentionTxt = '已关注'
                self.dialog = false
              }
            })
        }
      },
      download () {       // 下载商业计划书
        this.axios.post('/api/project/getppt', {id: this.data.pptid})
        .then(function (response) {
          if (response.data.code === 1) {
            window.location.href = response.data.url
          }
        })
      },
      changeCollect () {      // 收藏
        let self = this
        if (this.userInfo.user_id) {     // 判断是否登录再执行
          if (this.every) {          // 只执行一次
            this.every = false
            this.axios.post('/api/index/collection', {id: this.inputData.id})
            .then(function (response) {
              self.collect = !self.collect
              self.every = true
            })
          }
        } else {
          this.setLoginLink({loginLink: `/home/detail/${this.inputData.id}`})          // 保存到全局去，登录完后跳到回来
          this.setDialog({muDialog: true})
          this.setDialogText({muDialogText: '您还没有登陆'})
          this.setDialogUrl({muDialogUrl: '/account/login'})
        }
      },
      openSlideout () {     // 打开侧边栏导航
        window.slideNav.toggle()
      },
      back() {
        this.$router.back()
      },
      ...mapActions([
        'setDialog',
        'setDialogText',
        'setDialogUrl',
        'setLoginLink'
      ])
    },
    watch: {
      data () {         // 监听数据变化
        this.loadImage()
      },
      $route () {         // 如果路由有变化，会再次执行该方法
        this.getData()
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="scss" scoped>
  @import "~common/sass/mini";
  @import "~common/sass/colour";

  .detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    min-height: 100vh;
    background-color: #fff;
    .header {
      position: relative;
      z-index: 3;
    }
    .image-wrap {
      width: 100%;
      .image {
        display: block;
        width: 100%;
      }
    }
    // 滚动内容
    .scroller {
      padding-top: 16px;
      padding-bottom: 40px;
      background-color: #fff;
      .top {
        padding: 0 16px;
        @include border(b);
        .collec {
          display: flex;
          .name {
            flex: 1;
            padding-right: 15px;
            margin: 0;
            font-size: 16px;
            color: #333;
          }
        }
        .introduce {
          margin: 15px 0 0 0;
          font-size: 14px;
          color: #666;
        }
        .city {
          margin: 5px 0 0 0;
          padding-bottom: 10px;
          text-align: right;
          font-size: 14px;
          color: $color-background;
          .room {
            font-size: 20px;
            vertical-align: middle;
          }
        }
      }
      .mu-list {
        padding: 0;
        @include border(b);
        .desc {
          display: block;
          margin-top: 5px;
        }
      }
    }
    // 标签
    .classify {
      .item {
        @include border(b);
        .title {
          font-size: 14px;
          color: #333;
        }
        .list {
          color: #666;
        }
      }
      .label {
        display: inline-block;
        margin-bottom: 6px;
        padding: 2px 6px;
        min-width: 70px;
        border-radius: 26px;
        background-color: #e57373;
        color: #fff;
        font-size: 12px;
        .chip-icon {
          vertical-align: middle;
          font-size: 15px;
        }
      }
      .flex-item {
        display: flex;
        flex-wrap: wrap;
        .flex-1 {
          flex: 1;
        }
      }
    }
    // 图文混排
    .img-txt {
      padding: 0 16px;
      @include border(b);
      .txt {
        margin: 0;
        padding: 15px 0;
        font-size: 16px;
        line-height: 1.8;
      }
      .image {
        display: block;
        width: 100%;
      }
    }
    .business {
      padding: 20px;
      text-align: center;
      .inline-block {
        display: inline-block;
      }
      .desc {
        margin: 0;
        padding-top: 5px;
        font-size: 14px;
        color: $color-background;
      }
    }
  }
  // 关注
  .attention {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    z-index: 9;
    background-color: $color-background;
    .mu-item {
      padding: 0;
      color: #fff;
    }
  }
  // 加载中
  .fixed-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    margin-top: 56px;
    background-color: #fff;
  }
</style>
