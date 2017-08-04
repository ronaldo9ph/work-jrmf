<template lang="html">
<div class="riskQuestion">
  <div class="num">
    <em class="cur">{{index+1}}</em>/{{len}}
  </div>
  <div v-for="item in list">
    <h3 class="t">{{item.title}}</h3>
    <ul class="list">
      <li v-for="items in item.sel" @click="selFun(items.key,item.index)">{{items.key}}、{{items.val}}</li>
    </ul>
  </div>
  <div class="padbox">
    <a href="javascript:void(0)" class="btn btn-block" @click="prev()" v-if="index!=0">上一题</a>
  </div>
</div>
</template>

<script>
let arr = [
  {
    index: 0,
    title: '您的主要收入来源是',
    sel: [
      {
        key: 'A',
        val: '工资、劳务报酬'
      },
      {
        key: 'B',
        val: '生产经营所得'
      },
      {
        key: 'C',
        val: '利息、股息、转让等金融性资产收入'
      },
      {
        key: 'D',
        val: '出租、出售房地产等非金融性资产收入'
      },
      {
        key: 'E',
        val: '无固定收入'
      }
    ]
  },
  {
    index: 1,
    title: '您的家庭可支配年收入为（折合人民币）？',
    sel: [
      {
        key: 'A',
        val: '50万元以下'
      },
      {
        key: 'B',
        val: '50—100万元'
      },
      {
        key: 'C',
        val: '100—500万元'
      },
      {
        key: 'D',
        val: '500—1000万元'
      },
      {
        key: 'E',
        val: '1000万元以上'
      }
    ]
  },
  {
    index: 3,
    title: '在您每年的家庭可支配收入中，可用于金融投资（储蓄存款除外）的比例为？',
    sel: [
      {
        key: 'A',
        val: '小于10%'
      },
      {
        key: 'B',
        val: '10%至25%'
      },
      {
        key: 'C',
        val: '25%至50%'
      },
      {
        key: 'D',
        val: '大于50%'
      }
    ]
  },
  {
    index: 4,
    title: '您是否有尚未清偿的数额较大的债务，如有，其性质是',
    sel: [
      {
        key: 'A',
        val: '没有'
      },
      {
        key: 'B',
        val: '有，住房抵押贷款等长期定额债务'
      },
      {
        key: 'C',
        val: '有，信用卡欠款、消费信贷等短期信用债务'
      },
      {
        key: 'D',
        val: '有，亲戚朋友借款'
      }
    ]
  },
  {
    index: 5,
    title: '您的投资知识可描述为：',
    sel: [
      {
        key: 'A',
        val: '有限：基本没有金融产品方面的知识'
      },
      {
        key: 'B',
        val: '一般：对金融产品及其相关风险具有基本的知识和理解'
      },
      {
        key: 'C',
        val: '丰富：对金融产品及其相关风险具有丰富的知识和理解'
      }
    ]
  },
  {
    index: 6,
    title: '您的投资经验可描述为：',
    sel: [
      {
        key: 'A',
        val: '除银行储蓄外，基本没有其他投资经验'
      },
      {
        key: 'B',
        val: '购买过债券、保险等理财产品'
      },
      {
        key: 'C',
        val: '参与过股票、基金等产品的交易'
      },
      {
        key: 'D',
        val: '参与过权证、期货、期权等产品的交易'
      }
    ]
  },
  {
    index: 7,
    title: '您有多少年投资基金、股票、信托、私募证券或金融衍生产品等风险投资品的经验？',
    sel: [
      {
        key: 'A',
        val: '没有经验'
      },
      {
        key: 'B',
        val: '少于2年'
      },
      {
        key: 'C',
        val: '2至5年'
      },
      {
        key: 'D',
        val: '5至10年'
      },
      {
        key: 'E',
        val: '10年以上'
      }
    ]
  },
  {
    index: 8,
    title: '您计划的投资期限是多久？',
    sel: [
      {
        key: 'A',
        val: '1年以下'
      },
      {
        key: 'B',
        val: '1至3年'
      },
      {
        key: 'C',
        val: '3至5年'
      },
      {
        key: 'D',
        val: '5年以上'
      }
    ]
  },
  {
    index: 9,
    title: '您打算重点投资于哪些种类的投资品种？',
    sel: [
      {
        key: 'A',
        val: '债券、货币市场基金、债券基金等固定收益类投资品种'
      },
      {
        key: 'B',
        val: '股票、混合型基金、股票型基金等权益类投资品种'
      },
      {
        key: 'C',
        val: '期货、期权等金融衍生品'
      },
      {
        key: 'D',
        val: '其他产品或者服务'
      }
    ]
  },
  {
    index: 10,
    title: '以下哪项描述最符合您的投资态度？',
    sel: [
      {
        key: 'A',
        val: '厌恶风险，不希望本金损失，希望获得稳定回报'
      },
      {
        key: 'B',
        val: '保守投资，不希望本金损失，愿意承担一定幅度的收益波动'
      },
      {
        key: 'C',
        val: '寻求资金的较高收益和成长性，愿意为此承担有限本金损失'
      },
      {
        key: 'D',
        val: '希望赚取高回报，愿意为此承担较大本金损失'
      }
    ]
  },
  {
    index: 11,
    title: '假设有两种投资：投资A预期获得10%的收益，可能承担的损失非常小；投资B预期获得30%的收益， 但可能承担较大亏损。您会怎么支配您的投资：',
    sel: [
      {
        key: 'A',
        val: '全部投资于收益较小且风险较小的A'
      },
      {
        key: 'B',
        val: '同时投资于A和B，但大部分资金投资于收益较小且风险较小的A'
      },
      {
        key: 'C',
        val: '同时投资于A和B，但大部分资金投资于收益较大且风险较大的B'
      },
      {
        key: 'D',
        val: '全部投资于收益较大且风险较大的B'
      }
    ]
  },
  {
    index: 12,
    title: '您认为自己能承受的最大投资损失是多少？',
    sel: [
      {
        key: 'A',
        val: '10%以内'
      },
      {
        key: 'B',
        val: '10%-30%'
      },
      {
        key: 'C',
        val: '30%-50%'
      },
      {
        key: 'D',
        val: '超过50%'
      }
    ]
  }
]
export default {
  data () {
    return {
      index: 0, // 当前题号
      selectArr: [], // 存入选择题号
      list: [],
      len: ''
    }
  },
  created: async function () {
    this.len = arr.length
    this.showItem(0)
  },
  methods: {
    showItem: async function (index) {
      if (this.index < arr.length) {
        this.list = []
        let array = this.list.concat(arr[index])
        this.list = array
      } else {
        this.list = []
        let array = this.list.concat(arr[index - 1])
        this.list = array
        this.index = index - 1
        const res = await this.$http.get('api/v1/funds/risks/actions/submit', {'arr': this.selectArr})
        if (res.data.fstat) {
          this.$router.push({path: 'riskresult'})
        } else {
          this.$vux.toast.text(res.data.respmsg, 'middle')
          return false
        }
      }
    },
    selFun: function (key, index) {
      this.selectArr[index] = key
      this.index = this.index + 1
      if (this.index <= arr.length) {
        this.showItem(this.index)
      }
    },
    prev: function () {
      this.index = this.index - 1
      this.showItem(this.index)
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
