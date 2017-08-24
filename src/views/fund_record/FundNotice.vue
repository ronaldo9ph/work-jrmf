<template lang="html">
  <div>
    <ul class="fundNotice" v-if="fundAnnounceList.length!=0">
        <li v-for="item in fundAnnounceList">
          <router-link :to="{ name: 'noticedetail', params: {'id':fundid,'disc_id':item.disc_id} }">
            <label class="time">{{item.declaredate}}</label>{{item.title}}
          </router-link>
        </li>
    </ul>
    <p class="pd text-center text-gray" v-else>暂无数据！</p>
    <div class="padbox text-center" v-if="hasNext">
        <a href="javascript:void(0)" class="more text-gray" @click="loadData">点击加载更多&gt;&gt;</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fundAnnounceList: [],
      fundid: '',
      hasNext: false,
      pageSize: 10,
      pageIndex: 1
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: async function () {
      this.$vux.loading.show({
        text: '加载中'
      })
      const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id + '/announcements', {'page_size': this.pageSize, 'page_index': this.pageIndex})
      if (res.data.fstat) {
        this.fundid = res.data.fundid
        if (this.pageIndex === 1) {
          this.fundAnnounceList = []
        }
        for (var i = 0; i < res.data.fundAnnounceList.length; i++) {
          this.fundAnnounceList.push(res.data.fundAnnounceList[i])
        }
        this.hasNext = res.data.hasNext
        this.pageIndex++
      }
      this.$vux.loading.hide()
    }
  }
}

</script>
