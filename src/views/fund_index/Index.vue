<template lang="html">
<div class="indexPage">
  <div class="searchBox" v-if="customkey!='guoanshequ'">
    <router-link :to="{ name: 'fundsearch'}">
      <input type="text" class="txt" placeholder="请输入基金名称或代码" />
    </router-link>
    <router-link :to="{ name: 'fundlist'}" class="search-btn">全部</router-link>
  </div>
  <div class="module" v-if="list">
    <h3 class="title">王牌好基<em class="text-gray">选股突出  业绩稳健</em></h3>
    <template v-for="(item,index) in list">
      <div class="wpFund"  @click="fundDetail(item.fund_code)" v-if="index==0">
        <h2 class="t">{{item.fundname}}</h2>
        <p class="fee text-red"><span class="num"><span v-if="item.unit_NET_CHNG_PCT_1_YEAR>0">+</span>{{item.unit_NET_CHNG_PCT_1_YEAR}}</span>%</p>
        <p class="text-gray">近一年收益</p>
        <input type="button"value="立即抢购" class="btn btn-red" />
      </div>
    </template>
  </div>
  <div class="module" v-if="list">
    <h3 class="title">热卖推荐<em class="text-gray">专家推荐  人气好基</em></h3>
    <template v-for="(item,index) in list">
      <dl class="hotRec" @click="fundDetail(item.fund_code)" v-if="index>0">
        <dt>
          <p class="num text-red">{{item.unit_NET_CHNG_PCT_1_YEAR}}%</p>
          <p class="text-gray">近一年收益</p>
        </dt>
        <dd>
          <h3 class="name">{{item.fundname}}</h3>
          <div class="tag" v-html="splitTag(item.lable)"></div>
        </dd>
      </dl>
    </template>
  </div>
  <div class="module" v-if="hotThemeList && customkey!='guoanshequ'">
    <h3 class="title">主题基金<em class="text-gray">紧追热点  发现机遇</em></h3>
    <ul class="main-fund clearfix">
      <li v-for="item in hotThemeList">
        <router-link :to="{ name: 'fundthemes', params: {id:item.theme_id} }">
          <p class="name">{{item.theme_name}}</p>
          <dfn class="per num"><span v-if="item.unit_NET_CHNG_PCT_1_MON>0">+</span>{{item.unit_NET_CHNG_PCT_1_MON}}%</dfn>
          <p class="text-gray">近一个月最高</p>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="fixed-bottom">
    <router-link :to="{ name: 'fundindex'}" class="current"><i class="hot"></i>热门</router-link>
    <router-link :to="{ name: 'myhold'}"><i class="hold"></i>持有</router-link>
  </div>
</div>
</template>

<script>
export default{
  data () {
    return {
      customkey: '',
      hotThemeList: [], // 主题基金
      list: []// 热卖推荐
    }
  },
  created: function () {
    var _self = this
    new Promise(async function (resolve, reject) {
      if (window.sessionStorage.getItem('tokens') === null) {
        let customkey = _self.getParam('customkey')
        let mobiletelno = _self.getParam('mobiletelno')
        let custId = _self.getParam('cust_id')
        let timeStamp = _self.getParam('timeStamp')
        let sign = _self.getParam('sign')
        let redUrl = _self.getParam('redUrl')
        let fundcode = _self.getParam('fundcode')
        window.localStorage.setItem('customkey', customkey)
        const res = await _self.$http.get('api/v1/funds/actions/login', {'cust_id': custId, 'customkey': window.localStorage.getItem('customkey'), 'mobiletelno': mobiletelno, 'sign': sign, 'timeStamp': timeStamp})
        if (res.data.fstat === 1) {
          if (res.data.hasReg) {
            window.sessionStorage.setItem('tokens', res.data.token)
            if (redUrl === 'fundDetail') {
              _self.$router.push({path: '/funddetail/' + fundcode})
            }
            if (redUrl === 'fundhold') {
              _self.$router.push({path: '/myhold'})
            }
          } else {
            _self.$router.push({path: '/Identification/' + mobiletelno + '/' + custId + '/' + customkey})
          }
        }
        if (res.data.fstat === 9) {
          _self.$vux.toast.text(res.data.respmsg, 'middle')
          return false
        }
      }
      setTimeout(resolve, 1)
    }).then(async function () {
      if (window.sessionStorage.getItem('tokens') !== null) {
        _self.customkey = window.localStorage.getItem('customkey')
        _self.loadData()
      }
    })
  },
  methods: {
    splitTag: function (value) {
      var arr = value.split(',')
      var _html = ''
      for (let i = 0; i < arr.length; i++) {
        _html += '<span class="it">' + arr[i] + '</span>'
      }
      return _html
    },
    fundDetail: function (id) {
      this.$router.push({path: '/funddetail/' + id})
    },
    getParam (name) {
      var after = window.location.hash.split('?')[1]
      if (after) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = after.match(reg)
        if (r != null) {
          return decodeURIComponent(r[2])
        } else {
          return null
        }
      }
    },
    loadData: async function () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      let recomfundcode = this.getParam('recomfundcode')
      const res = await this.$http.get('api/v1/funds/recommends', {'recomfundcode': recomfundcode, 'customkey': window.localStorage.getItem('customkey')})
      if (res.data.fstat === 1) {
        this.list = []
        for (let i = 0; i < res.data.list.length; i++) {
          this.list[i] = res.data.list[i]
        }
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
      const result = await this.$http.get('api/v1/funds/themes')
      if (result.data.fstat === 1) {
        this.hotThemeList = []
        for (let i = 0; i < result.data.hotThemeList.length; i++) {
          this.hotThemeList[i] = result.data.hotThemeList[i]
        }
      }
      this.$vux.loading.hide()
      if (result.data.fstat === 9) {
        this.$vux.toast.text(result.data.respmsg, 'middle')
        return false
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/index.less';
</style>
