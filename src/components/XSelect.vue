<template lang="html">
<dl class="selectRelbox">
  <dt>
    <a href="javascript:void(0)" v-on:click="showSlide" class="sel">{{myval}}</a>
  </dt>
  <dd v-show="myshow">
    <a href="javascript:void(0)" @click="change(item.key,item.value)" :class="item.key==curkey?'current':''" :value="item.key" v-for="item in options">{{item.value}}</a>
  </dd>
</dl>
</template>

<script>
export default {
  data () {
    return {
      myval: this.val,
      mycurkey: this.curkey,
      myshow: this.show
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    val: String,
    curkey: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    myval (newValue) {
      this.$emit('on-change', newValue)
    },
    show (val) {
      this.myshow = val
    }
  },
  methods: {
    showSlide: function (e) {
      this.$emit('on-showfun')
    },
    change: function (k, v) {
      this.myshow = false
      this.myval = v
      this.mycurkey = k
    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
