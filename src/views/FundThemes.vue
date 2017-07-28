<template lang="html">
<div class="fundThemes">
  <div class="tab clearfix">
      <a href="javascript:void(0)" :class="{current:active==0}" @click="loadData(0)">近一周</a>
      <a href="javascript:void(0)" :class="{current:active==1}" @click="loadData(1)">近一月</a>
      <a href="javascript:void(0)" :class="{current:active==2}" @click="loadData(2)">近三月</a>
  </div>
  <table class="tb">
    <tr>
      <th class="text-left">基金名称</th>
      <th class="text-right">涨跌幅</th>
    </tr>
    <tr>
      <td class="text-left">
        <p class="name">富国新能源指数升级</p>
        <p class="text-gray num">001004</p>
      </td>
      <td class="text-right text-red num">+8.5%</td>
    </tr>
    <tr>
      <td class="text-left">
        <p class="name">富国新能源指数升级</p>
        <p class="text-gray num">001004</p>
      </td>
      <td class="text-right text-red num">+8.5%</td>
    </tr>
  </table>
</div>
</template>

<script>
export default{
  data(){
    return{
      list:[],//列表
      active:0
    }
  },
  created: async function(){
    const res = await this.$http.post('/h5fund/index/return.html')
    if(res.data){
      this.list=[]
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
