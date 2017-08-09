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
export default {
  data () {
    return {
      fundid: '',
      title: '',
      txt_content: '',
      declaredate: '',
      source: ''
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/announcements/' + this.$route.params.disc_id)
    if (res.data.fstat) {
      this.fundid = res.data.fundid
      this.title = res.data.fundAnnounceDetail.title
      this.txt_content = res.data.fundAnnounceDetail.txt_content
      this.declaredate = res.data.fundAnnounceDetail.declaredate
      this.source = res.data.fundAnnounceDetail.source
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
