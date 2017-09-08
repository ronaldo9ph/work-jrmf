<template lang="html">
    <div class="fund-hold">
        <div class="box clearfix" v-if="sourceReport">{{sourceReport}}</div>
        <div class="box clearfix">
            <label class="pull-left">股票</label>
            <span class="pull-right">{{stk_val_asset_prop}}%</span>
        </div>
        <table class="tb">
            <tr>
                <th class="text-left">重仓股票</th>
                <th class="text-right">占净值比</th>
            </tr>
            <tr v-for="item in fundStkDetailList">
                <td class="text-left">
                    <p class="t">{{item.fundsname}}</p>
                    <p>{{item.stockcode}}</p>
                </td>
                <td class="text-right">{{item.tot_val_prop}}%</td>
            </tr>
        </table>
        <div class="box clearfix">
            <label class="pull-left">债券</label>
            <span class="pull-right">{{bnd_val_asset_prop}}%</span>
        </div>
        <div class="box clearfix">
            <label class="pull-left">银行存款</label>
            <span class="pull-right">{{dep_reck_up_asset_up}}%</span>
        </div>
        <div class="box clearfix">
            <label class="pull-left">其他</label>
            <span class="pull-right">{{oth_asset_val_tot_prop}}%</span>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sourceReport: '', // 季度
      bnd_val_asset_prop: '', // 债券百分比
      dep_reck_up_asset_up: '', // 现金百分比
      oth_asset_val_tot_prop: '', // 其它百分比
      fundStkDetailList: [], // 股票列表
      stk_val_asset_prop: '' // 股票占比
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/fund-holdings')
    if (res.data.fstat === 1) {
      this.sourceReport = res.data.sourceReport
      this.fundAsset = res.data.fundAsset
      this.bnd_val_asset_prop = res.data.fundAsset.bnd_val_asset_prop
      this.dep_reck_up_asset_up = res.data.fundAsset.dep_reck_up_asset_up
      this.oth_asset_val_tot_prop = res.data.fundAsset.oth_asset_val_tot_prop
      this.fundStkDetailList = []
      this.stk_val_asset_prop = res.data.fundAsset.stk_val_asset_prop
      for (let i = 0; i < res.data.fundStkDetailList.length; i++) {
        this.fundStkDetailList[i] = res.data.fundStkDetailList[i]
      }
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  }
}
</script>
