<template lang="html">
  <div class="chargePage" v-if="isShow">
    <div v-if="list.length>0">
      <div class="item" v-for="item in list">
        <table class="tb">
          <tr>
            <td colspan="3">
              <p class="t pull-left">{{item.fundname}}({{item.fundcode}})</p>
              <span class="pull-right text-gray">{{item.transactiondate}}</span>
            </td>
          </tr>
          <tr v-if="item.businessname=='赎回确认'">
            <th class="text-gray">赎回份额</th>
            <th class="text-gray">确认金额</th>
            <th class="text-gray">赎回确认</th>
          </tr>
          <tr v-if="item.businessname=='赎回确认'">
            <td class="text-red">{{item.applicationvol}}份</td>
            <td class="text-red">{{item.confirmedamount}}元</td>
            <td class="text-red" v-if="item.applystname!='确认成功'">交易失败</td>
            <td class="text-red" v-else>{{item.applystname}}</td>
          </tr>
          <tr v-if="item.businessname=='申购确认'">
            <th class="text-gray">申购金额</th>
            <th class="text-gray">确认份额</th>
            <th class="text-gray">申购确认</th>
          </tr>
          <tr v-if="item.businessname=='申购确认'">
            <td class="text-red">{{item.applicationamount}}元</td>
            <td class="text-red">{{item.confirmedvol}}份</td>
            <td class="text-red" v-if="item.applystname!='确认成功'">交易失败</td>
            <td class="text-red" v-else>{{item.applystname}}</td>
          </tr>
          <tr v-if="item.businessname=='定时定额投资确认'">
            <th class="text-gray">定投金额</th>
            <th class="text-gray">确认份额</th>
            <th class="text-gray">定投确认</th>
          </tr>
          <tr v-if="item.businessname=='定时定额投资确认'">
            <td class="text-red">{{item.applicationamount}}元</td>
            <td class="text-red">{{item.confirmedvol}}份</td>
            <td class="text-red" v-if="item.applystname!='确认成功'">交易失败</td>
            <td class="text-red" v-else>{{item.applystname}}</td>
          </tr>
          <tr v-if="item.businessname=='基金转换确认'">
            <th class="text-gray">转换份额</th>
            <th class="text-gray">目标基金</th>
            <th class="text-gray">基金转换</th>
          </tr>
          <tr v-if="item.businessname=='基金转换确认'">
            <td class="text-red">{{item.applicationvol}}元</td>
            <td class="text-red">{{item.targetdistributorname}}</td>
            <td class="text-red" v-if="item.applystname!='确认成功'">交易失败</td>
            <td class="text-red" v-else>{{item.applystname}}</td>
          </tr>
          <tr v-if="item.businessname=='红利发放'">
            <th class="text-gray" v-if="item.confirmedvol>0">红利再投资</th>
            <th class="text-gray" v-else>现金分红</th>
            <th class="text-gray">&nbsp;</th>
            <th class="text-gray">红利发放</th>
          </tr>
          <tr v-if="item.businessname=='红利发放'">
            <td class="text-red" v-if="item.confirmedvol>0">{{item.confirmedvol}}份</td>
            <td class="text-red" v-else>{{item.confirmedamount}}元</td>
            <td class="text-red">&nbsp;</td>
            <td class="text-red" v-if="item.applystname!='确认成功'">交易失败</td>
            <td class="text-red" v-else>{{item.applystname}}</td>
          </tr>
          <tr>
            <td colspan="3" class="bt">
              <span class="reason pull-left text-gray text-normal" v-if="item.applystname!='确认成功'">失败原因：{{item.applystname}}</span>
              <span class="pull-right text-gray text-normal" v-if="item.charge==''">手续费：无</span>
              <span class="pull-right text-gray text-normal" v-else>手续费：{{item.charge}}元</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <p class="text-center text-gray padbox" v-else>暂无数据！</p>
    <div class="pad text-center" v-show="hasnext" style="display:none">
      <a href="javascript:void(0)" class="text-gray" @click="loadData()">点击加载更多</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      isShow: false,
      pageIndex: 1,
      page_size: 5,
      hasnext: false
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
      const res = await this.$http.get('api/v1/funds/holdings/trade-histories', {'page_no': this.pageIndex, 'page_size': this.page_size})
      if (res.data.fstat === 1) {
        if (this.pageIndex === 1) {
          this.list = []
        }
        if (res.data.fundHistoryLists.length > 0) {
          let array = this.list.concat(res.data.fundHistoryLists)
          this.list = array
          this.pageIndex++
          this.hasnext = res.data.hasNext
        } else {
          this.list.length = 0
          this.hasnext = false
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
@import '../../styles/index.less';
</style>
