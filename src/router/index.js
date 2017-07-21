import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MyHold from '@/views/MyHold'
import FundIndex from '@/views/FundIndex'
import FundThemes from '@/views/FundThemes'
import FundSearch from '@/views/FundSearch'
import Fundlist from '@/views/AllFundList'
import Funddetail from '@/views/FundDetail'
import Traderule from '@/views/fund_rule/FundRule'
import mrRule from '@/views/fund_rule/Mrgz'
import mcRule from '@/views/fund_rule/Mcgz'
import Detailhistory from '@/views/DetailHistory'
import FundRecord from '@/views/fund_record/FundRecord'
import FundInfo from '@/views/fund_record/FundInfo'
import FundNotice from '@/views/fund_record/FundNotice'
import FundHold from '@/views/fund_record/FundHold'
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
      path: '/fundlist', // 基金列表页
      name: 'fundlist',
      component: Fundlist
    },
    {
      path: '/funddetail/:id', // 基金详情页
      name: 'funddetail',
      component: Funddetail
    },
    {
      path: '/fundrecord/:id/:code', // 基金档案
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
      path: '/traderule/:id/:code', // 基金交易规则
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
      path: '/detailhistory/:id/:code', // 基金历史净值
      name: 'detailhistory',
      component: Detailhistory
    },
    { path: '/notice/:fundid/:code/:id',
      name: 'noticedetail', // 基金公告详情
      component: NoticeDetail
    }
  ]
})
