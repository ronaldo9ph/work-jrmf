<template lang="html">
<div class="chargePage">
  <div class="item" v-for="item in list">
    <table class="tb">
      <tr>
        <td colspan="3">
          <p class="t pull-left">{{item.fundname}}({{item.fundcode}})</p>
          <span class="pull-right text-gray">{{item.createtime}}</span>
        </td>
      </tr>
      <tr v-if="item.businessname=='赎回申请'">
        <th class="text-gray">赎回份额</th>
        <th class="text-gray">确认金额</th>
        <th class="text-gray">赎回申请</th>
      </tr>
      <tr v-if="item.businessname=='赎回申请'">
        <td class="text-red">{{item.applicationvol}}份</td>
        <td class="text-red">--</td>
        <td class="text-red">待确认</td>
      </tr>
      <tr v-if="item.businessname=='申购申请'">
        <th class="text-gray">申购金额</th>
        <th class="text-gray">确认份额</th>
        <th class="text-gray">申购申请</th>
      </tr>
      <tr v-if="item.businessname=='申购申请'">
        <td class="text-red">{{item.applicationamount}}元</td>
        <td class="text-red">--</td>
        <td class="text-red">待确认</td>
      </tr>
      <tr v-if="item.businessname=='基金转换申请'">
        <th class="text-gray">转换份额</th>
        <th class="text-gray">目标基金</th>
        <th class="text-gray">转换申请</th>
      </tr>
      <tr v-if="item.businessname=='基金转换申请'">
        <td class="text-red">{{item.applicationvol}}元</td>
        <td class="text-red">{{item.targetdistributorname}}</td>
        <td class="text-red">待确认</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/holdings/trade-histories/going')
    if (res.data.fstat) {
      this.list = []
      for (let i = 0; i < res.data.dayOrderList.length; i++) {
        this.list[i] = res.data.dayOrderList[i]
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/index.less';
</style>
