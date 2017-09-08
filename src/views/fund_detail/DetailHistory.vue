<template lang="html">
  <div class="detailHistory" v-if="isShow">
      <table class="tb" v-if="list.length!=0 && fundtype=='货币型'" cellspacing="0" cellpadding="0">
          <tr v-if="list.length!=0">
              <th>日期</th>
              <th>万份收益</th>
              <th>七日年化</th>
          </tr>
          <tr v-for="item in list">
              <td>{{item.tradedate}}</td>
              <td>{{item.string_UNIT_NET}}</td>
              <td>{{item.string_accum_NET}}%</td>
          </tr>
      </table>
      <table class="tb" v-else cellspacing="0" cellpadding="0">
          <tr v-if="list.length!=0">
              <th>日期</th>
              <th>单位净值</th>
              <th>累计净值</th>
              <th>日涨幅</th>
          </tr>
          <tr v-for="item in list">
              <td>{{item.tradedate}}</td>
              <td>{{item.string_UNIT_NET}}</td>
              <td>{{item.string_accum_NET}}</td>
              <td :class="item.string_UNIT_NET_CHNG_PCT>=0?'text-red':'text-green'"><span v-if="item.string_UNIT_NET_CHNG_PCT>=0">+</span>{{item.string_UNIT_NET_CHNG_PCT}}%</td>
          </tr>
      </table>
      <div class="padbox text-center text-gray" v-if="list.length==0">暂无数据！</div>
      <div class="padbox text-center" v-if="hasNext">
          <a href="javascript:void(0)" class="more text-gray" @click="loadData">点击加载更多&gt;&gt;</a>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      hasNext: false,
      pageSize: 20,
      pageIndex: 1,
      fundtype: '',
      isShow: false
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: async function () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/fund-navcalcs/histories', {'page_size': this.pageSize, 'page_index': this.pageIndex})
      if (res.data.fstat === 1) {
        if (res.data.fundHistoryInfo.length > 0) {
          if (this.pageIndex === 1) {
            this.list = []
          }
          let array = this.list.concat(res.data.fundHistoryInfo)
          this.list = array
          this.fundtype = res.data.fundInfo.invst_TYPE_MARK
          this.hasNext = res.data.hasNext
          this.pageIndex++
        } else {
          this.list = []
          this.hasNext = false
        }
      }
      this.isShow = true
      this.$vux.loading.hide()
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
