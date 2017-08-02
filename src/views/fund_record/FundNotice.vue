<template lang="html">
  <div>
    <ul class="fundNotice" v-if="fundAnnounceList">
        <li v-for="item in fundAnnounceList">
          <router-link :to="{ name: 'noticedetail', params: {'id':fundid,'disc_id':item.disc_id} }">
            <label class="time">{{item.declaredate}}</label>{{item.title}}
          </router-link>
        </li>
    </ul>
    <p class="pd text-center text-gray" v-else>暂无数据！</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fundAnnounceList: [],
      fundid: ''
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/announcements')
    if (res.data.fstat) {
      this.fundid = res.data.fundid
      this.fundAnnounceList = []
      for (var i = 0; i < res.data.fundAnnounceList.length; i++) {
        this.fundAnnounceList[i] = res.data.fundAnnounceList[i]
      }
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  }
}

</script>
