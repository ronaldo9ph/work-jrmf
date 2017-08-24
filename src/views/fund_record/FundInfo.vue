<template lang="html">
    <div class="fundSum">
        <div class="box fund-info">
            <h3 class="title">基金信息</h3>
            <div class="con">
                <ul class="item">
                    <li><label class="t">基金全称</label>{{fundname}}</li>
                    <li><label class="t">基金代码</label>{{fund_CODE}}</li>
                    <li><label class="t">成立日期</label>{{estab_date}}</li>
                    <li><label class="t">资产规模（亿元）</label>{{merge_equity}}</li>
                    <li><label class="t">基金管理人</label>{{mana_NAME}}</li>
                    <li><label class="t">基金托管人</label>{{trup_name}}</li>
                </ul>
            </div>
        </div>
        <div class="box fund-wgt">
            <h3 class="title">基金经理</h3>
            <div class="con" id="fundManager">
                <p v-for="item in fundManager">{{item.resume}}</p>
            </div>
            <div class="more text-right">
                <a href="javascript:void(0)" @click="showMore($event,'fundManager')" class="text-red">查看更多</a>
            </div>
        </div>
        <div class="box fund-wgt">
            <h3 class="title">投资理念</h3>
            <div class="con auto">
                <p v-html="invst_target"></p>
            </div>
        </div>
        <div class="box fund-wgt">
            <h3 class="title">投资策略</h3>
            <div class="con" id="investClue">
                <p v-html="invst_stra"></p>
            </div>
            <div class="more text-right">
                <a href="javascript:void(0)" @click="showMore($event,'investClue')" class="text-red">查看更多</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fundname: '', // 基金全称
      fund_CODE: '', // 基金代码
      estab_date: '', // 成立日期
      merge_equity: '', // 资产
      mana_NAME: '', // 管理者名称
      trup_name: '', // 托管人
      fundManager: [], // 基金经理
      invst_target: '', // 投资理念
      invst_stra: '' // 投资策略
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/records/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fundname = res.data.fundInfo.fundname
      this.fund_CODE = res.data.fundInfo.fund_CODE
      this.estab_date = res.data.fundInfo.estab_date
      this.total_assets = res.data.fundInfo.total_assets
      this.merge_equity = res.data.fundInfo.merge_equity
      this.mana_NAME = res.data.fundInfo.mana_NAME
      this.trup_name = res.data.fundInfo.trup_name
      this.invst_target = res.data.fundBasicInfo.invst_target
      this.invst_stra = res.data.fundBasicInfo.invst_stra
      this.fundManager = []
      for (let i = 0; i < res.data.fundManager.length; i++) {
        this.fundManager[i] = res.data.fundManager[i]
      }
    }
  },
  methods: {
    showMore: function (event, id) {
      if (event.currentTarget.innerText === '收起') {
        document.getElementById(id).style.height = '120px'
        event.currentTarget.innerText = '查看更多'
      } else {
        document.getElementById(id).style.height = 'auto'
        event.currentTarget.innerText = '收起'
      }
    }
  }
}

</script>
