<template lang="html">
  <div>
    {{somebody}}说,我{{age}}了<br />
    <test :girls="aGirls" @introduce="introduceSelf" :noticeGirl="noticeGirl"></test>
  </div>
</template>

<script>
import Test from '../components/Test.vue'
export default {
  data () {
    return {
      aGirls: [{
        name: '小丽',
        age: 22
      }, {
        name: '小美',
        age: 21
      }, {
        name: '小荷',
        age: 24
      }],
      somebody: '',
      age: 0,
      noticeGirl: ''
    }
  },
  methods: {
    introduceSelf: function (opt) {
      this.somebody = opt.name
      this.age = opt.age
      this.noticeGirl = opt.name
    }
  },
  components: {
    Test
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
