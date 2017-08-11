import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MyHold from '@/views/MyHold'
import Setting from '@/views/setting/Index'
import RiskTest from '@/views/setting/RiskTest'
import RiskQuestion from '@/views/setting/RiskQuestion'
import RiskResult from '@/views/setting/RiskResult'
import Password from '@/views/setting/Password'
import ResetPas from '@/views/setting/ResetPas'
import ResetPas2 from '@/views/setting/ResetPas2'
import ModifyPas from '@/views/setting/ModifyPas'
import Bank from '@/views/setting/Bank'
import OpenFundAccount from '@/views/setting/OpenFundAccount'
import OpenAccountInfo from '@/views/setting/OpenAccountInfo'
import FundIndex from '@/views/FundIndex'
import ChartTest from '@/views/ChartTest'
import FundThemes from '@/views/FundThemes'
import FundSearch from '@/views/FundSearch'
import Fundlist from '@/views/AllFundList'
import FundDetail from '@/views/FundDetail'
import BuySuccess from '@/views/BuySuccess'
import FundOrder from '@/views/Order'
import FundRedeem from '@/views/Redeem'
import RedeemSuccess from '@/views/RedeemSuccess'
import Traderule from '@/views/fund_rule/FundRule'
import mrRule from '@/views/fund_rule/Mrgz'
import mcRule from '@/views/fund_rule/Mcgz'
import Detailhistory from '@/views/DetailHistory'
import FundRecord from '@/views/fund_record/FundRecord'
import FundInfo from '@/views/fund_record/FundInfo'
import FundNotice from '@/views/fund_record/FundNotice'
import FundHold from '@/views/fund_record/FundHold'
import ChargeList from '@/views/fund_charge/ChargeList'
import ChargeIng from '@/views/fund_charge/ChargeIng'
import ChargeHistory from '@/views/fund_charge/ChargeHistory'
import DetailProfit from '@/views/DetailProfit'
import FundAssets from '@/views/fund_assets/FundAssets'
import FundFh from '@/views/fund_record/FundFh'
import FundType from '@/views/fund_record/FundType'
import NoticeDetail from '@/views/fund_record/NoticeDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/fundindex', // 基金首页
      name: 'fundindex',
      component: FundIndex
    },
    {
      path: '/charttest', // charttest
      name: 'charttest',
      component: ChartTest
    },
    {
      path: '/fundthemes/:id', // 基金主题详情页
      name: 'fundthemes',
      component: FundThemes
    },
    {
      path: '/fundsearch', // 基金搜索
      name: 'fundsearch',
      component: FundSearch
    },
    {
      path: '/myhold', // 基金持有
      name: 'myhold',
      component: MyHold
    },
    {
      path: '/setting', // 设置
      name: 'setting',
      component: Setting
    },
    {
      path: '/risktest', // 风险测试
      name: 'risktest',
      component: RiskTest
    },
    {
      path: '/riskquestion', // 风险测试问题
      name: 'riskquestion',
      component: RiskQuestion
    },
    {
      path: '/riskresult', // 风险测试结果
      name: 'riskresult',
      component: RiskResult
    },
    {
      path: '/password', // 支付密码
      name: 'password',
      component: Password
    },
    {
      path: '/resetpas/', // 重置支付密码1
      name: 'resetpas',
      component: ResetPas
    },
    {
      path: '/resetpas2/:from', // 重置支付密码2
      name: 'resetpas2',
      component: ResetPas2
    },
    {
      path: '/modifypas', // 修改支付密码
      name: 'modifypas',
      component: ModifyPas
    },
    {
      path: '/bank', // 基金银行卡
      name: 'bank',
      component: Bank
    },
    {
      path: '/openfundaccount', // 基金开户1
      name: 'openfundaccount',
      component: OpenFundAccount
    },
    {
      path: '/openaccountinfo/:realname/:identityno/:profession/:address/:email', // 基金开户2
      name: 'openaccountinfo',
      component: OpenAccountInfo
    },
    {
      path: '/detailprofit', // 基金持有收益明细
      name: 'detailprofit',
      component: DetailProfit
    },
    {
      path: '/fundassets/:id/', // 基金资产详情页
      name: 'fundassets',
      component: FundAssets
    },
    {
      path: '/fundlist', // 基金列表页
      name: 'fundlist',
      component: Fundlist
    },
    {
      path: '/funddetail/:id', // 基金详情页
      name: 'funddetail',
      component: FundDetail
    },
    {
      path: '/order/:id', // 基金购买
      name: 'order',
      component: FundOrder
    },
    {
      path: '/buysuccess/:id', // 基金购买成功
      name: 'buysuccess',
      component: BuySuccess
    },
    {
      path: '/redeem/:id', // 基金赎回
      name: 'redeem',
      component: FundRedeem
    },
    {
      path: '/redeemsuccess/:id', // 基金赎回成功
      name: 'redeemsuccess',
      component: RedeemSuccess
    },
    {
      path: '/chargelist', // 基金交易记录
      component: ChargeList,
      name: 'chargelist',
      children: [
        { path: 'ing',
          name: 'chargelist/ing', // 全部
          component: ChargeIng
        },
        { path: 'history',
          name: 'chargelist/history', // 待确认
          component: ChargeHistory
        }
      ]
    },
    {
      path: '/fundrecord/:id', // 基金档案
      component: FundRecord,
      name: 'fundrecord',
      children: [
        { path: 'info',
          name: 'fundrecord/info', // 基金概况
          component: FundInfo
        },
        { path: 'notice',
          name: 'fundrecord/notice', // 基金公告列表
          component: FundNotice
        },
        { path: 'hold',
          name: 'fundrecord/hold', // 基金持仓
          component: FundHold
        },
        { path: 'type',
          name: 'fundrecord/type', // 基金行业
          component: FundType
        },
        { path: 'fh',
          name: 'fundrecord/fh', // 基金分红配送
          component: FundFh
        }
      ]
    },
    {
      path: '/traderule/:id', // 基金交易规则
      component: Traderule,
      name: 'traderule',
      children: [
        { path: 'mrgz',
          name: 'traderule/mrgz',
          component: mrRule
        },
        { path: 'mcgz',
          name: 'traderule/mcgz',
          component: mcRule
        }
      ]
    },
    {
      path: '/detailhistory/:id', // 基金历史净值
      name: 'detailhistory',
      component: Detailhistory
    },
    { path: '/notice/:id/:disc_id',
      name: 'noticedetail', // 基金公告详情
      component: NoticeDetail
    }
  ]
})
