<template lang="html">
<div>
    <div class="box mrlc">
        <h3 class="title">买入流程</h3>
        <div class="procon">
            <div class="line"></div>
            <table class="tb">
                <tr>
                    <td>买入提交</td>
                    <td>确认份额</td>
                    <td class="text-right">查看盈亏</td>
                </tr>
                <tr>
                    <td><span class="circle"></span></td>
                    <td><span class="circle"></span></td>
                    <td class="text-right"><span class="circle"></span></td>
                </tr>
                <tr>
                    <td>T日</td>
                    <td>1~2个交易日</td>
                    <td class="text-right">T确认份额当日净值更新后</td>
                </tr>
            </table>
        </div>
        <p class="b des">T日申请，将按T日基金净值确认份额。份额确认当日，基金净值更新后即可查看首笔盈亏，确认后下一个T日可卖出。</p>
    </div>
    <div class="box mrfl">
        <h3 class="title">认购费率</h3>
        <table class="tb">
            <tr>
                <th class="text-left">金额</th>
                <th>&nbsp;</th>
                <th>优惠费率</th>
            </tr>
            <tr v-for="item in fundChagRateList" v-if="item.max_term_name == '认购费'">
                <td class="text-left" v-if="item.cond_rela_name==null">--</td>
                <td class="text-left" v-else-if="item.cond_rela_name=='<X'||item.cond_rela_name=='<=X'">大于{{item.pert_val_low_lim }}{{item.val_unit_name }}</td>
                <td class="text-left" v-else-if="item.cond_rela_name=='X<'||item.cond_rela_name=='X<='">小于{{item.pert_val_up_lim }}{{item.val_unit_name }}</td>
                <td class="text-left" v-else>{{item.pert_val_low_lim }}{{item.val_unit_name }}至{{item.pert_val_up_lim }}{{item.val_unit_name }}</td>
                <td><s>{{item.fund_rate}}{{item.rate_unit_name }}</s></td>
                <td class="text-red">{{item.chag_rate_up_lim}}{{item.rate_unit_name }}</td>
            </tr>
        </table>
    </div>
    <div class="box mrfl">
        <h3 class="title">申购费率</h3>
        <table class="tb">
            <tr>
                <th class="text-left">金额</th>
                <th>&nbsp;</th>
                <th>优惠费率</th>
            </tr>
            <tr v-for="item in fundChagRateList" v-if="item.max_term_name == '申购费' && item.chng_min_term_mark=='日常申购费' ">
                <td class="text-left" v-if="item.cond_rela_name==null">--</td>
                <td class="text-left" v-else-if="item.cond_rela_name=='<X'||item.cond_rela_name=='<=X'">大于{{item.pert_val_low_lim }}{{item.val_unit_name }}</td>
                <td class="text-left" v-else-if="item.cond_rela_name=='X<'||item.cond_rela_name=='X<='">小于{{item.pert_val_up_lim }}{{item.val_unit_name }}</td>
                <td class="text-left" v-else>{{item.pert_val_low_lim }}{{item.val_unit_name }}至{{item.pert_val_up_lim }}{{item.val_unit_name }}</td>
                <td><s>{{item.fund_rate}}{{item.rate_unit_name }}</s></td>
                <td class="text-red">{{item.chag_rate_up_lim}}{{item.rate_unit_name }}</td>
            </tr>
        </table>
    </div>
    <div class="box mrlc">
        <h3 class="title">申购计算：</h3>
        <div class="des">
            <p>净申购金额=申购金额/（1+申购费率）</p>
            <p>申购费用=申购金额-净申购金额</p>
            <p>申购份额=净申购金额/T日基金份额净值</p>
        </div>
    </div>
    <div class="box mrfl">
        <h3 class="title">运作规则</h3>
        <h4 class="h4t">运作费率</h4>
        <table class="tb">
            <tr>
                <th class="text-left">费用类别</th>
                <th>费率</th>
            </tr>
            <tr v-for="(item, index) in fundChagRateList" v-if="item.max_term_name=='基金管理费'">
                <td class="text-left">管理费</td>
                <td>{{item.chag_rate_up_lim}}{{item.rate_unit_name}}（每年）</td>
            </tr>
            <tr v-for="item in fundChagRateList"  v-if="item.max_term_name=='基金托管费'">
                <td class="text-left">托管费</td>
                <td>{{item.chag_rate_up_lim}}{{item.rate_unit_name}}（每年）</td>
            </tr>
            <tr>
                <td class="text-left">销售服务费</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
    <p class="w">
        基金管理费、托管费、销售服务费从基金资产中美日计提，每个工作日公告的基金净值已扣除相应费用，无需投资者在每笔交易中另行支付，运作费用详细信息请参考基金招募说明书。
    </p>
</div>
</template>

<script>
export default{
  data () {
    return {
      fundChagRateList: []
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/chag-rates/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fundChagRateList = []
      for (var i = 0; i < res.data.fundChagRateList.length; i++) {
        this.fundChagRateList[i] = res.data.fundChagRateList[i]
      }
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  }
}

</script>
