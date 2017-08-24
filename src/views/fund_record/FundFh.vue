<template lang="html">
<div class="fhPage">
    <ul class="fund-fh" v-if="queryFundDivList.length!=0">
        <li v-for="item in queryFundDivList">
            <div class="clearfix">
                <span class="pull-left">除息日：{{item.ex_div_date}}</span>
                <span class="pull-right">红利发放日：{{item.pay_date}}</span>
            </div>
            <p>分红方式：<span class="text-red">10派{{item.div_remv_tax}}元</span></p>
        </li>
    </ul>
    <p class="text-gray tips" v-else>暂无分红！</p>
</div>
</template>

<script>
export default {
  data () {
    return {
      queryFundDivList: []
    }
  },
  created: async function () {
    this.$vux.loading.show({
      text: '加载中'
    })
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/fund-dividends')
    if (res.data.fstat) {
      this.queryFundDivList = []
      for (let i = 0; i < res.data.queryFundDivList.length; i++) {
        this.queryFundDivList[i] = res.data.queryFundDivList[i]
      }
    }
    this.$vux.loading.hide()
  }
}

</script>
