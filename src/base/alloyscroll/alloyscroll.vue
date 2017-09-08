<template lang="html">
  <section ref="wrapper">
    <div ref="targe" class="minHeight">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  import Transform from 'css3transform'
  import AlloyTouch from 'alloytouch'
  export default {
    props: {
      data: {
        type: Array,
        default: null
      },
      scrollValue: {            // 是否返回滚动的位置，value
        type: Boolean,
        default: false
      },
      scrollHead: {           // min要减去的额外高度
        type: Number,
        default: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this.touch = this.$refs.wrapper
        this.targe = this.$refs.targe
        this.alloy()      // 页面滚动，需要等资源全部加载完成再初始化
      }, 20)
    },
    methods: {
      alloy() {
        let self = this
        Transform(this.targe, true)   // true代表关闭透视投影，因为targe里面是有文本，防止文本在IOS中模糊
        this.alloyTouch = new AlloyTouch({
          touch: this.touch,
          vertical: true,
          target: self.targe,
          property: 'translateY',
          sensitivity: 0.8, // 不必需,触摸区域的灵敏度，默认值为1，可以为负数
          factor: 0.8, // 不必需,表示触摸位移与被运动属性映射关系，默认值是1
          min: window.innerHeight - self.targe.clientHeight - this.scrollHead,
          max: 0,
          change: function (value) {
            if (self.scrollValue) {     // 返回滚动位置
              self.$emit('scroll', {
                value: value,
                min: this.min
              })
            }
            if (!value && value !== 0) {      // 如果是NaN那么就从新执行
              console.log('糟了，是NaN')
              location.reload()
            }
          },
          touchStart: function () {
          }
        })
      },
      countHeight (tophead) {            // 图片加载完成再计算高度
        setTimeout(() => {
          this.alloyTouch.min = window.innerHeight - this.targe.clientHeight - tophead
        }, 20)
      },
      stop () {                   // 停止
        this.alloyTouch.stop()
      },
      to (value, time, ease) {      // 到某个位置
        this.alloyTouch.to(value, time, ease)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.countHeight()
        }, 20)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .minHeight {
    min-height: 100vh;
  }
</style>
