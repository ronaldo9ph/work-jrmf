<template lang="html">
<div class="searchPage">
  <div class="searchBox">
      <input type="text" class="txt" placeholder="请输入基金名称或代码" id="txt" />
      <input type="button" class="search-btn" value="搜索" @click="searchFund()" />
  </div>
  <div class="search-history" v-show="isEmpty" style="display:none">
    <div class="top clearfix">
      <span class="title pull-left">历史搜索</span>
      <a href="javascript:void(0)" class="pull-right text-red" @click="clearRecord()">清空记录</a>
    </div>
    <div class="con">
      <a href="javascript:void(0)" v-for="item in setData" @click="searchVal(item.key)">{{item.key}}</a>
    </div>
  </div>
  <div class="fundResult" v-if="recommandProductsFund">
    <table class="tb" v-for="item in recommandProductsFund" @click="locHref(item.fundcode)">
      <tr>
        <td colspan="3" class="text-left name">{{item.name}}（{{item.fundcode}}）<span class="tag">{{item.fundtype}}</span></td>
      </tr>
      <tr>
        <th class="text-gray" width="120">{{item.chng_name}}</th>
        <th class="text-gray" width="120">手续费</th>
        <td rowspan="2"><button class="btn btn-red">投</button></td>
      </tr>
      <tr>
        <td class="text-red num">{{item.chng_pic}}</td>
        <td class="text-gray num">{{item.cur_fund_rate}}</td>
      </tr>
    </table>
    <div class="pad text-center" v-show="hasnext" style="display:none">
      <a href="javascript:void(0)" class="text-gray" @click="searchFund()">点击加载更多</a>
    </div>
  </div>
  <p v-else class="pad text-center text-gray">没找到，请输入基金全名或代码试试</p>
  <h3 class="hot-title" v-show="isHotShow" style="display:none">热门搜索</h3>
  <ul class="hot-list" v-show="isHotShow" style="display:none">
    <li v-for="item in recommandList">
      <router-link :to="{ name: 'funddetail', params: {id:item.fundcode} }">{{item.name}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default{
  data () {
    return {
      recommandList: [], // 热门推荐列表
      isEmpty: false, // 历史记录是否为空
      setData: [], // 历史搜索tag
      recommandProductsFund: [], // 搜索结果列表
      hasnext: false, // 是否有下一页
      pageSize: 10, // 每页显示多少
      pageIndex: 1, // 当前页码
      isHotShow: true // 热门搜索是否显示
    }
  },
  created: async function () {
    const res = await this.$http.post('/h5fund/index/searchListPage/searchRecommand.html')
    if (res.data) {
      this.recommandList = []
      for (let i = 0; i < res.data.recommandList.length; i++) {
        this.recommandList[i] = res.data.recommandList[i]
      }
    }
  },
  methods: {
    clearRecord: async function () {
      const res = await this.$http.post('/h5fund/index/searchListPage/cleanHistory.html')
      if (res.data) {
        this.isEmpty = true
      }
    },
    searchFund: async function () {
      var obj = document.getElementById('txt').value
      if (obj) {
        const res = await this.$http.post('/h5fund/index/searchListPage/return.html', {'pageSize': this.pageSize, 'pageIndex': this.pageIndex, 'key': obj})
        if (res.data) {
          if (res.data.recommandProductsFund.length>0) {
            this.isHotShow = false
            this.isEmpty = false
            if(this.pageIndex==1){
              this.recommandProductsFund=[]
            }
            alert(this.pageIndex)
            for (let i = 0; i < res.data.recommandProductsFund.length; i++) {
              this.recommandProductsFund.push(res.data.recommandProductsFund[i])
            }
            console.log(this.recommandProductsFund);
            this.pageIndex++
            this.hasnext = res.data.hasnext
          }
          this.setData = []
          for (let i = 0; i < res.data.setData.length; i++) {
            this.setData[i] = res.data.setData[i]
          }
        }
      } else {
        tishi('请输入基金简称或者代码')
        return false
      }
    },
    searchVal: async function(obj){

    },
    locHref: function (id) {
      this.$router.push({ name: 'funddetail', params: { id: id }})
    }
  }
}

</script>

<style lang="less">
@import '../styles/index.less';
</style>
