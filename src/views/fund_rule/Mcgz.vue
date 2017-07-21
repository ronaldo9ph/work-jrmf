<template lang="html">
<div>
    <div class="box mrlc">
        <h3 class="title">卖出流程</h3>
        <div class="procon">
            <div class="line"></div>
            <table class="tb">
                <tr>
                    <td>卖出提交</td>
                    <td>确认份额</td>
                    <td class="text-right">资金到账</td>
                </tr>
                <tr>
                    <td><span class="circle"></span></td>
                    <td><span class="circle"></span></td>
                    <td class="text-right"><span class="circle"></span></td>
                </tr>
                <tr>
                    <td>T日</td>
                    <td>{{redeemDay}}</td>
                    <td class="text-right">确认份额当天</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="box mrfl">
        <h3 class="title">卖出费率</h3>
        <table class="tb">
            <tr>
                <th class="text-left">持有期限</th>
                <th>费率</th>
            </tr>
            <tr v-for="item in fundChagRateList" v-if="item.max_term_name == '赎回费' && item.chng_min_term_mark=='日常赎回费' ">
                <td class="text-left" v-if="item.term_rela_name==null">--</td>
                <td class="text-left" v-else-if="item.term_rela_name=='<X'||item.term_rela_name=='<=X'">大于{{item.hld_term_low_lim }}{{item.hld_term_unit_mark }}</td>
                <td class="text-left" v-else-if="item.term_rela_name=='X<'||item.term_rela_name=='X<='">小于{{item.hld_term_up_lim }}{{item.hld_term_unit_mark }}</td>
                <td class="text-left" v-else>{{item.hld_term_low_lim }}{{item.hld_term_unit_mark }}至{{item.hld_term_up_lim }}{{item.hld_term_unit_mark }}</td>
                <td class="text-red">{{item.chag_rate_up_lim}}{{item.rate_unit_name }}</td>
            </tr>
        </table>
    </div>
    <p class="w">
        基金卖出费率由基金持有天数（自然日）长短决定，基金卖出时一般按照先进先出规则，实际费用收取以基金公司计算为准。
    </p>
    <div class="box mrlc">
        <h3 class="title">赎回计算：</h3>
        <div class="des">
            <p>赎回总额=赎回数量×T日基金份额净值</p>
            <p>赎回费用=赎回总额×赎回费率</p>
            <p>赎回金额=赎回总额-赎回费用</p>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default{
  data () {
    return {
      redeemDay: '',
      fundChagRateList: []
    }
  },
  created: function () {
    var url = '/h5fund/fundtrade/detailChagRate/return.html'
    axios.post(url, qs.stringify({'fundid': this.$route.params.id, 'innercode': this.$route.params.code}))
        .then((res) => {
          this.fundChagRateList = []
          this.redeemDay = res.data.redeemDay
          for (var i = 0; i < res.data.fundChagRateList.length; i++) {
            this.fundChagRateList[i] = res.data.fundChagRateList[i]
          }
        })
        .catch(function (err) {
          console.error(err)
        })
  }
}
</script>
