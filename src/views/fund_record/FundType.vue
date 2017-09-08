<template lang="html">
    <div class="fund-hold" v-if="querInduSumConfList.length>0">
        <table class="tb">
            <tr>
                <td class="text-left" colspan="2" v-if="sourceReport">{{sourceReport}}</td>
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
export default {
  data () {
    return {
      sourceReport: '', // 季度
      querInduSumConfList: [] // 行业列表
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/fund-industries')
    if (res.data.fstat === 1) {
      this.sourceReport = res.data.sourceReport
      this.querInduSumConfList = []
      for (let i = 0; i < res.data.querInduSumConfList.length; i++) {
        this.querInduSumConfList[i] = res.data.querInduSumConfList[i]
      }
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  }
}

</script>
