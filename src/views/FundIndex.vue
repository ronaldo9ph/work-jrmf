<template lang="html">
<div class="indexPage">
  <div class="searchBox">
    <router-link :to="{ name: 'fundsearch'}">
      <input type="text" class="txt" placeholder="请输入基金名称或代码" />
    </router-link>
    <router-link :to="{ name: 'fundlist'}" class="search-btn">全部</router-link>
  </div>
  <div class="module" v-if="list">
    <h3 class="title">热卖推荐</h3>
    <dl class="hotRec" v-for="item in list" @click="fundDetail(item.fund_id)">
      <dt>
        <p class="num text-red">{{item.unit_NET_CHNG_PCT_1_MON}}%</p>
        <p class="text-gray">近一年收益</p>
      </dt>
      <dd>
        <h3 class="name">{{item.fundname}}</h3>
        <div class="tag" v-html="splitTag(item.lable)">
          <!--<span class="it">中盘平衡</span><span class="it">重配资源</span><span class="it">业绩突出</span>-->
        </div>
      </dd>
    </dl>
  </div>
  <div class="module" v-if="hotThemeList">
    <h3 class="title">主题基金</h3>
    <ul class="main-fund clearfix">
      <li v-for="item in hotThemeList">
        <router-link :to="{ name: 'fundthemes', params: {id:item.themeId} }">
          <p class="name">{{item.themeTitle}}</p>
          <dfn class="per num"><span v-if="item. unit_NET_CHNG_PCT_1_MON>0">+</span>{{item. unit_NET_CHNG_PCT_1_MON}}%</dfn>
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
  data(){
    return{
      hotThemeList:[],//主题基金
      list:[]//热卖推荐
    }
  },
  created: async function(){
    const res = await this.$http.get('/lists/recommend_list-theme_list.html')
    if(res.data){
      this.hotThemeList=[]
      this.list=[]
      for(let i=0;i<res.data.hotThemeList.length;i++){
        this.hotThemeList[i]=res.data.hotThemeList[i]
      }
      for(let i=0;i<res.data.list.length;i++){
        this.list[i]=res.data.list[i]
      }
    }
  },
  methods:{
    splitTag:function(value){
      var arr = value.split(',')
      var _html = ''
      for (let i = 0; i < arr.length; i++) {
        _html += '<span class="it">' + arr[i] + '</span>'
      }
      return _html
    },
    fundDetail:function(id){
      this.$router.push({path: '/funddetail/'+id})
    }
  }
}
</script>

<style lang="less">
@import '../styles/index.less';
</style>
