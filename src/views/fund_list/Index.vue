<template lang="html">
<div class="fund-list" id="fund-list">
    <table class="tb">
        <tr>
            <th width="50%">
                <x-select :options="list1" @on-change="loadData" @on-showfun="showFun(1)" :show="show1" :val="value1" :curkey="key1"></x-select>
            </th>
            <th class="text-center">单位净值</th>
            <th class="text-right">
                <x-select :options="list2" @on-change="loadData" @on-showfun="showFun(2)" :show="show2" :val="value2" :curkey="key2"></x-select>
            </th>
        </tr>
        <tr v-for="item in fundList" @click="locHref(item.fund_CODE)" v-if="fundList">
            <td>
                <p class="name">{{item.fundsname}}</p>
                <p class="text-gray">{{item.fund_CODE}}</p>
            </td>
            <td class="text-center">{{item.chi_spell_2}}</td>
            <td :class="item.unit_NET_CHNG_PCT>=0?'text-red text-right text-red':'text-red text-right text-green'" v-if="key2=='1day'"><span v-if="item.unit_NET_CHNG_PCT>=0">+</span>{{item.unit_NET_CHNG_PCT}}%</td>
            <td class="text-red text-right" v-if="key2=='1week'"><span v-if="item.unit_NET_CHNG_PCT_1_WEEK>=0">+</span>{{item.unit_NET_CHNG_PCT_1_WEEK}}%</td>
            <td class="text-red text-right" v-if="key2=='1mon'"><span v-if="item.unit_NET_CHNG_PCT_1_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_1_MON}}%</td>
            <td class="text-red text-right" v-if="key2=='3mon'"><span v-if="item.unit_NET_CHNG_PCT_3_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_3_MON}}%</td>
            <td class="text-red text-right" v-if="key2=='6mon'"><span v-if="item.unit_NET_CHNG_PCT_6_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_6_MON}}%</td>
            <td class="text-red text-right" v-if="key2=='1year'"><span v-if="item.unit_NET_CHNG_PCT_1_YEAR>=0">+</span>{{item.unit_NET_CHNG_PCT_1_YEAR}}%</td>
            <td class="text-red text-right" v-if="key2=='tyear'"><span v-if="item.unit_NET_CHNG_PCT_TYEAR>=0">+</span>{{item.unit_NET_CHNG_PCT_TYEAR}}%</td>
        </tr>
        <tr v-else>
            <td colspan="3" class="mar text-center text-gray">暂无数据！</td>
        </tr>
        <tr>
            <td colspan="3" class="mar">&nbsp;</td>
        </tr>
    </table>
    <div class="padbox text-center" v-if="hasNext">
        <a href="javascript:void(0)" class="more text-gray" @click="loadData('more')">点击加载更多&gt;&gt;</a>
    </div>
</div>
</template>

<script>
import XSelect from '../../components/XSelect.vue'
export default {
  components: {
    XSelect
  },
  data () {
    return {
      list1: [{key: 'all', value: '全部'}, {key: 'stock', value: '股票型'}, {key: 'financial', value: '理财型'}, {key: 'mix', value: '混合型'}, {key: 'currency', value: '货币型'}, {key: 'indexFund', value: '指数型'}, {key: 'bond', value: '债券型'}, {key: 'QDII', value: 'QDII型'}],
      value1: '全部',
      key1: 'all',
      list2: [{key: '1day', value: '日涨幅'}, {key: '1week', value: '近一周'}, {key: '1mon', value: '近一月'}, {key: '3mon', value: '近三月'}, {key: '6mon', value: '近六月'}, {key: '1year', value: '近一年'}, {key: 'tyear', value: '今年以来'}],
      value2: '日涨幅',
      key2: '1day',
      show1: false,
      show2: false,
      pageIndex: 1, // 下一页页码
      pageSize: 10, // 每页显示个数
      hasNext: '', // 是否有下一页
      fundList: [] // ajax返回的基金列表
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    showFun: function (i) {
      if (i === 1) {
        this.show1 = !this.show1
        this.show2 = false
      } else {
        this.show2 = !this.show2
        this.show1 = false
      }
    },
    loadData: async function (val) {
      if (val !== 'more') {
        for (let i = 0; i < this.list1.length; i++) {
          if (this.list1[i].value === val) {
            this.key1 = this.list1[i].key
          }
        }
        for (let i = 0; i < this.list2.length; i++) {
          if (this.list2[i].value === val) {
            this.key2 = this.list2[i].key
          }
        }
        this.pageIndex = 1
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.hasNext = false
      const res = await this.$http.get('api/v1/funds/searchs/actions/search-all', {'limit': this.pageSize, 'page_no': this.pageIndex, 'type': this.key1, 'order_by': this.key2})
      if (res.data.fstat === 1) {
        if (this.pageIndex === 1) {
          this.fundList.length = 0
        }
        for (var i = 0; i < res.data.fundList.length; i++) {
          this.fundList.push(res.data.fundList[i])
        }
        this.hasNext = res.data.hasNext
        this.pageIndex++
      }
      this.$vux.loading.hide()
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    locHref: function (id) {
      this.$router.push({name: 'funddetail', params: { id: id }})
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
