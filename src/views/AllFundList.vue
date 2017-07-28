<template lang="html">
<div class="fund-list" id="fund-list">
    <table class="tb">
        <tr>
            <th width="50%">
                <dl class="relbox">
                    <dt>
                        <a href="javascript:void(0)" class="sel" @click="showType">{{typeName}}</a>
                    </dt>
                    <dd v-if="a">
                        <a href="javascript:void(0)" :class="{'current':fundType=='all'}" @click="dataProp('all','a',$event)">全部</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='stock'}" @click="dataProp('stock','a',$event)">股票型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='financial'}" @click="dataProp('financial','a',$event)">理财型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='mix'}" @click="dataProp('mix','a',$event)">混合型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='currency'}" @click="dataProp('currency','a',$event)">货币型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='indexFund'}" @click="dataProp('indexFund','a',$event)">指数型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='bond'}" @click="dataProp('bond','a',$event)">债券型</a>
                        <a href="javascript:void(0)" :class="{'current':fundType=='QDII'}" @click="dataProp('QDII','a',$event)">QDII型</a>
                    </dd>
                </dl>
            </th>
            <th class="text-center">单位净值</th>
            <th class="text-right">
                <dl class="relbox">
                    <dt>
                        <a href="javascript:void(0)" class="sel" @click="showIncrease">{{increaseName}}</a>
                    </dt>
                    <dd v-if="b">
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='1day'}" @click="dataProp('1day','b',$event)">日涨幅</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='1week'}" @click="dataProp('1week','b',$event)">近一周</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='1mon'}" @click="dataProp('1mon','b',$event)">近一月</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='3mon'}" @click="dataProp('3mon','b',$event)">近三月</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='6mon'}" @click="dataProp('6mon','b',$event)">近六月</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='1year'}" @click="dataProp('1year','b',$event)">近一年</a>
                        <a href="javascript:void(0)" :class="{'current':dayIncrease=='tyear'}" @click="dataProp('tyear','b',$event)">今年以来</a>
                    </dd>
                </dl>
            </th>
        </tr>
        <tr v-for="item in fundList" @click="locHref(item.fund_CODE)" v-if="fundList">
            <td>
                <p class="name">{{item.fundsname}}</p>
                <p class="text-gray">{{item.fund_CODE}}</p>
            </td>
            <td class="text-center">{{item.accum_NET}}</td>
            <td :class="item.unit_NET_CHNG_PCT>=0?'text-red text-right text-red':'text-red text-right text-green'" v-if="dayIncrease=='1day'"><span v-if="item.unit_NET_CHNG_PCT>=0">+</span>{{item.unit_NET_CHNG_PCT}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='1week'"><span v-if="item.unit_NET_CHNG_PCT_1_WEEK>=0">+</span>{{item.unit_NET_CHNG_PCT_1_WEEK}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='1mon'"><span v-if="item.unit_NET_CHNG_PCT_1_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_1_MON}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='3mon'"><span v-if="item.unit_NET_CHNG_PCT_3_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_3_MON}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='6mon'"><span v-if="item.unit_NET_CHNG_PCT_6_MON>=0">+</span>{{item.unit_NET_CHNG_PCT_6_MON}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='1year'"><span v-if="item.unit_NET_CHNG_PCT_1_YEAR>=0">+</span>{{item.unit_NET_CHNG_PCT_1_YEAR}}</td>
            <td class="text-red text-right" v-if="dayIncrease=='tyear'"><span v-if="item.unit_NET_CHNG_PCT_TYEAR>=0">+</span>{{item.unit_NET_CHNG_PCT_TYEAR}}</td>
        </tr>
        <tr v-else>
            <td colspan="3" class="mar text-center text-gray">暂无数据！</td>
        </tr>
        <tr>
            <td colspan="3" class="mar">&nbsp;</td>
        </tr>
    </table>
    <div class="padbox text-center text-gray" v-if="loading">正在努力加载中...</div>
    <div class="padbox text-center" v-if="hasNext">
        <a href="javascript:void(0)" class="more text-gray" @click="loadData">点击加载更多&gt;&gt;</a>
    </div>
</div>
</template>

<script>
export default {
  name: 'fundlist',
  data () {
    return {
      pageIndex: 1, // 下一页页码
      fundType: 'all', // 基金类型
      typeName: '全部',
      dayIncrease: '1day', // 日涨幅类型
      increaseName: '日涨幅',
      pageSize: 10, // 每页显示个数
      hasNext: '', // 是否有下一页
      fundList: [], // ajax返回的基金列表
      a: false,
      b: false,
      loading: true
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    showType: function () {
      this.b = false
      this.a ? this.a = false : this.a = true
    },
    showIncrease: function () {
      this.a = false
      this.b ? this.b = false : this.b = true
    },
    dataProp: function (val, obj, event) {
      if (obj === 'a') {
        this.fundType = val
        this.typeName = event.currentTarget.innerText
      } else {
        this.dayIncrease = val
        this.increaseName = event.currentTarget.innerText
      }
      this.fundList = []
      this.pageIndex = 1
      this.a = false
      this.b = false
      this.loadData()
    },
    loadData: async function () {
      const res = await this.$http.post('/apifund/v1/search/all_list.html', {'limit': this.pageSize, 'pageNo': this.pageIndex, 'type': this.fundType, 'orderBy': this.dayIncrease})
      if (res.data) {
        for (var i = 0; i < res.data.fundList.length; i++) {
          this.fundList.push(res.data.fundList[i])
        }
        this.hasNext = res.data.hasNext
        this.pageIndex++
        this.loading = false
      }
    },
    locHref: function (id) {
      this.$router.push({ name: 'funddetail', params: { id: id }})
    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
