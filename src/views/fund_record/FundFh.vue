<template lang="html">
    <ul class="fund-fh" v-if="queryFundDivList">
        <li v-for="item in queryFundDivList">
            <div class="clearfix">
                <span class="pull-left">除息日：{{item.ex_div_date}}</span>
                <span class="pull-right">红利发放日：{{item.pay_date}}</span>
            </div>
            <p>分红方式：<span class="text-red">10派{{item.div_remv_tax}}元</span></p>
        </li>
    </ul>
    <p class="text-gray tips" v-else>暂无分红！</p>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      queryFundDivList: []
    }
  },
  created: function () {
    var url = '/h5fund/fundtrade/fundRecord/dividendsReturn.html'
    axios.post(url, qs.stringify({'fundid': this.$route.params.id, 'innercode': this.$route.params.code}))
      .then((res) => {
        this.queryFundDivList=[]
        for(let i=0;i<res.data.queryFundDivList.length;i++){
          this.queryFundDivList[i]=res.data.queryFundDivList[i]
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }
}

</script>
