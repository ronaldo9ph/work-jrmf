<template lang="html">
  <div class="noticeDetail">
    <h1 class="title">{{title}}</h1>
    <div class="w clearfix text-gray text-small">
      <span class="pull-left">{{source}}</span>
      <span class="pull-right">{{declaredate}}</span>
    </div>
    <div class="con" v-html="txt_content"></div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      fundid: '',
      title:'',
      txt_content:'',
      declaredate:'',
      source:''
    }
  },
  created: function () {
    var url = '/h5fund/fundtrade/fundRecord/announcementDetailReturn.html'
    axios.post(url, qs.stringify({'fundid': this.$route.params.id, 'innercode': this.$route.params.code, 'disc_id': this.$route.params.disc_id}))
      .then((res) => {
        this.fundid = res.data.fundid
        this.title=res.data.fundAnnounceDetail.title
        this.txt_content=res.data.fundAnnounceDetail.txt_content
        this.declaredate=res.data.fundAnnounceDetail.declaredate
        this.source=res.data.fundAnnounceDetail.source
      })
      .catch(function (err) {
        console.error(err)
      })
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
