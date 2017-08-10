<template lang="html">
<div class="searchPage">
  <div class="searchBox">
      <input type="text" v-model="val" class="txt" placeholder="请输入基金名称或代码" id="txt" />
      <input type="button" class="search-btn" value="搜索" @click="searchFund()" />
  </div>
  <div class="search-history" v-show="isEmpty && setData" style="display:none">
    <div class="top clearfix">
      <span class="title pull-left">历史搜索</span>
      <a href="javascript:void(0)" class="pull-right text-red" @click="clearRecord()">清空记录</a>
    </div>
    <div class="con">
      <a href="javascript:void(0)" v-for="item in setData" @click="searchVal(item)">{{item}}</a>
    </div>
  </div>
  <div>
    <div class="fundResult" v-if="recommandProductsFund">
      <table class="tb" v-for="item in recommandProductsFund" @click="locHref(item.fundcode)">
        <tr>
          <td colspan="3" class="text-left name">{{item.name}}（{{item.fundcode}}）<span class="tag">{{item.typemark}}</span></td>
        </tr>
        <tr>
          <th class="text-gray" width="120">{{item.chng_name}}</th>
          <th class="text-gray" width="120">手续费</th>
          <td rowspan="2"><button class="btn btn-red">投</button></td>
        </tr>
        <tr>
          <td class="text-red num">{{item.chng_pic}}</td>
          <td class="text-gray num">{{item.cur_fund_rate}}<span v-if="item.cur_fund_rate != '0.0'">%</span></td>
        </tr>
      </table>
      <div class="pad text-center" v-show="hasnext" style="display:none">
        <a href="javascript:void(0)" class="text-gray" @click="searchFund()">点击加载更多</a>
      </div>
    </div>
    <p v-else class="pad text-center text-gray">没找到，请输入基金全名或代码试试</p>
  </div>
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
      isHotShow: true, // 热门搜索是否显示
      val: '' // 输入框的值
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/searchs/recommands')
    if (res.data.fstat) {
      this.recommandList = []
      for (let i = 0; i < res.data.recommandList.length; i++) {
        this.recommandList[i] = res.data.recommandList[i]
      }
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
    const restag = await this.$http.post('api/v1/funds/searchs/actions/search')
    if (restag.data) {
      this.setData = []
      for (let i = 0; i < restag.data.setData.length; i++) {
        this.setData[i] = restag.data.setData[i]
      }
      this.isEmpty = true
    } else {
      this.$vux.toast.text(restag.data.respmsg, 'middle')
      return false
    }
  },
  watch: {
    'val': 'queryTrendData'
  },
  methods: {
    queryTrendData: function () {
      this.recommandProductsFund = []
      this.hasnext = false
      this.isEmpty = true
      this.isHotShow = true
    },
    clearRecord: async function () {
      const res = await this.$http.get('api/v1/funds/searchs/actions/clean')
      if (res.data.fstat) {
        this.isEmpty = false
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
      }
    },
    searchFund: async function () {
      if (this.val) {
        const res = await this.$http.post('api/v1/funds/searchs/actions/search', {'page_size': this.pageSize, 'page_index': this.pageIndex, 'key': this.val})
        if (res.data.fstat) {
          if (res.data.recommandProductsFund.length > 0) {
            this.recommandProductsFund = res.data.recommandProductsFund
            this.isHotShow = false
            this.isEmpty = false
            if (this.pageIndex === 1) {
              this.recommandProductsFund = []
            }
            let array = this.recommandProductsFund.concat(res.data.recommandProductsFund)
            this.recommandProductsFund = array
            this.pageIndex++
            this.hasnext = res.data.hasnext
          } else {
            this.recommandProductsFund = []
          }
        } else {
          this.$vux.toast.text(res.data.respmsg, 'middle')
          return false
        }
      }
    },
    searchVal: async function (obj) {
      this.val = obj
      this.pageIndex = 1
      this.searchFund()
    },
    locHref: function (id) {
      this.$router.push({name: 'funddetail', params: { id: id }})
    }
  }
}

</script>

<style lang="less">
@import '../styles/index.less';
</style>
