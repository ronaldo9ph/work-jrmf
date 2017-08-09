<template lang="html">
<div class="fundThemes">
  <tab :line-width=2 active-color='#fc378c' v-model="index">
    <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list2" @click="selected = item" @on-item-click="onItemClick(item)" :key="index">{{item}}</tab-item>
  </tab>
  <swiper v-model="index" height="auto" :show-dots="false">
    <swiper-item v-for="(item, index) in list2" :key="index">
      <table class="tb">
        <tr>
          <th class="text-left">基金名称</th>
          <th class="text-right">涨跌幅</th>
        </tr>
        <tr v-for="item in list">
          <td class="text-left">
            <p class="name">{{item.fundname}}</p>
            <p class="text-gray num">{{item.fund_CODE}}</p>
          </td>
          <td class="text-right text-red num" v-if="order_by=='1week'">{{item.unit_NET_CHNG_PCT_1_WEEK}}%</td>
          <td class="text-right text-red num" v-if="order_by=='1mon'">{{item.unit_NET_CHNG_PCT_1_MON}}%</td>
          <td class="text-right text-red num" v-if="order_by=='3mon'">{{item.unit_NET_CHNG_PCT_3_MON}}%</td>
        </tr>
      </table>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const list = () => ['近一周', '近一月', '近三月']
export default{
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      list: [], // 列表
      active: 0,
      list2: list(),
      selected: '近一周',
      index: 0
    }
  },
  created: function () {
    this.onItemClick('近一周')
  },
  methods: {
    splitTag: function (value) {
      var arr = value.split(',')
      var _html = ''
      for (let i = 0; i < arr.length; i++) {
        _html += '<span class="it">' + arr[i] + '</span>'
      }
      return _html
    },
    fundDetail: function (id) {
      this.$router.push({path: '/funddetail/' + id})
    },
    onItemClick: async function (id) {
      if (id === '近一周') {
        this.order_by = '1week'
      }
      if (id === '近一月') {
        this.order_by = '1mon'
      }
      if (id === '近三月') {
        this.order_by = '3mon'
      }
      const res = await this.$http.get('api/v1/fund/themes/' + this.$route.params.id, {'order_by': this.order_by})
      if (res.data.fstat) {
        let arr = this.list.concat(res.data.fundList)
        this.list = arr
      }
    }
  }
}

</script>

<style lang="less">
@import '../styles/index.less';
.fundThemes .vux-tab .vux-tab-item.vux-tab-selected{
  color: #ef5643;
  border-bottom-color: #ef5643;
}
.fundThemes .vux-tab-ink-bar{
  background-color: #ef5643;
}
</style>
