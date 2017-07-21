<template lang="html">
    <div class="fund-hold">
        <table class="tb">
            <tr>
                <td class="text-left" colspan="2">{{sourceReport}}</td>
            </tr>
            <tr>
                <th class="text-left">行业</th>
                <th class="text-right">占净值比例</th>
            </tr>
            <tr v-for="item in querInduSumConfList">
                <td class="text-left">{{item.indu_sname}}</td>
                <td class="text-right">{{item.sect_val_prop}}%</td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      sourceReport:'',//季度
      querInduSumConfList:[] //行业列表
    }
  },
  created: function () {
    var url = '/h5fund/fundtrade/fundRecord/industryReturn.html'
    axios.post(url, qs.stringify({'fundid': this.$route.params.id, 'innercode': this.$route.params.code}))
      .then((res) => {
        this.sourceReport=res.data.sourceReport
        this.querInduSumConfList=[]
        for(let i=0; i<res.data.querInduSumConfList.length;i++){
          this.querInduSumConfList[i]=res.data.querInduSumConfList[i]
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }
}

</script>
