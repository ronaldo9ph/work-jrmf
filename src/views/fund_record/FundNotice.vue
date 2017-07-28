<template lang="html">
  <div>
    <ul class="fundNotice" v-if="fundAnnounceList">
        <li v-for="item in fundAnnounceList">
          <router-link :to="{ name: 'noticedetail', params: {fundid:fundid,code:innercode,id:item.disc_id} }">
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
      fundid: '',
      innercode: ''
    }
  },
  created: async function () {
    const res = await this.$http.post('/h5fund/fundtrade/fundRecord/announcementListReturn.html',{'fundid': this.$route.params.id, 'innercode': this.$route.params.code})
    if(res.data){
      this.fundid = res.data.fundid
      this.innercode = res.data.innercode
      this.fundAnnounceList = []
      for (var i = 0; i < res.data.fundAnnounceList.length; i++) {
        this.fundAnnounceList[i] = res.data.fundAnnounceList[i]
      }
    }
  }
}

</script>
