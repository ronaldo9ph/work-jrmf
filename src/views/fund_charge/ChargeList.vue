<template lang="html">
<div class="chargelist">
  <div class="tab clearfix">
    <router-link :to="{name:'chargelist/all'}">全部</router-link>
    <router-link :to="{name:'chargelist/wait'}">待确认</router-link>
    <dl class="sort">
      <dt @click="sortTriger()">分类<i></i></dt>
      <dd style="display:none" v-show="isShow">
        <span class="arrow"></span>
        <router-link :to="{name:'chargelist/mr'}">买入</router-link>
        <router-link :to="{name:'chargelist/mc'}">卖出</router-link>
        <router-link :to="{name:'chargelist/fh'}">分红</router-link>
        <router-link :to="{name:'chargelist/else'}">其它</router-link>
      </dd>
    </dl>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data () {
    return {
      isShow:false // 分类是否显示
    }
  },
  methods: {
    sortTriger:function(){
      this.isShow?this.isShow=false:this.isShow=true
    }
  }
}
</script>

<style lang="less">
@import '../../styles/index.less';
</style>
