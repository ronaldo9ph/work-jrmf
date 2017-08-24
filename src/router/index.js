import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/fundindex', // 基金首页
      name: 'fundindex',
      component: resolve => {
        require.ensure(['@/views/FundIndex'], () => {
          resolve(require('@/views/FundIndex'))
        })
      },
      meta: {
        title: '基金'
      }
    },
    {
      path: '/error', // error
      name: 'error',
      component: resolve => {
        require.ensure(['@/views/Error'], () => {
          resolve(require('@/views/Error'))
        })
      },
      meta: {
        title: 'Error'
      }
    },
    {
      path: '/Identification/:mobileno/:cust_id/:customkey', // 验证身份
      name: 'identification',
      component: resolve => {
        require.ensure(['@/views/Identification'], () => {
          resolve(require('@/views/Identification'))
        })
      },
      meta: {
        title: '身份认证'
      }
    },
    {
      path: '/charttest', // charttest
      name: 'charttest',
      component: resolve => {
        require.ensure(['@/views/ChartTest'], () => {
          resolve(require('@/views/ChartTest'))
        })
      },
      meta: {
        title: 'test'
      }
    },
    {
      path: '/fundthemes/:id', // 基金主题详情页
      name: 'fundthemes',
      component: resolve => {
        require.ensure(['@/views/FundThemes'], () => {
          resolve(require('@/views/FundThemes'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金主题详情'
      }
    },
    {
      path: '/fundsearch', // 基金搜索
      name: 'fundsearch',
      component: resolve => {
        require.ensure(['@/views/FundSearch'], () => {
          resolve(require('@/views/FundSearch'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '搜索'
      }
    },
    {
      path: '/myhold', // 基金持有
      name: 'myhold',
      component: resolve => {
        require.ensure(['@/views/MyHold'], () => {
          resolve(require('@/views/MyHold'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '持有'
      }
    },
    {
      path: '/setting', // 设置
      name: 'setting',
      component: resolve => {
        require.ensure(['@/views/setting/Index'], () => {
          resolve(require('@/views/setting/Index'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '设置'
      }
    },
    {
      path: '/risktest', // 风险测评
      name: 'risktest',
      component: resolve => {
        require.ensure(['@/views/setting/RiskTest'], () => {
          resolve(require('@/views/setting/RiskTest'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '风险测评'
      }
    },
    {
      path: '/riskquestion', // 风险测评问题
      name: 'riskquestion',
      component: resolve => {
        require.ensure(['@/views/setting/RiskQuestion'], () => {
          resolve(require('@/views/setting/RiskQuestion'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '风险测评'
      }
    },
    {
      path: '/riskresult', // 风险测试结果
      name: 'riskresult',
      component: resolve => {
        require.ensure(['@/views/setting/RiskResult'], () => {
          resolve(require('@/views/setting/RiskResult'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '风险测评'
      }
    },
    {
      path: '/password', // 支付密码
      name: 'password',
      component: resolve => {
        require.ensure(['@/views/setting/Password'], () => {
          resolve(require('@/views/setting/Password'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '密码管理'
      }
    },
    {
      path: '/resetpas', // 重置支付密码1
      name: 'resetpas',
      component: resolve => {
        require.ensure(['@/views/setting/ResetPas'], () => {
          resolve(require('@/views/setting/ResetPas'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '重置支付密码'
      }
    },
    {
      path: '/resetpas2/:from', // 重置支付密码2
      name: 'resetpas2',
      component: resolve => {
        require.ensure(['@/views/setting/ResetPas2'], () => {
          resolve(require('@/views/setting/ResetPas2'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '重置支付密码'
      }
    },
    {
      path: '/modifypas', // 修改支付密码
      name: 'modifypas',
      component: resolve => {
        require.ensure(['@/views/setting/ModifyPas'], () => {
          resolve(require('@/views/setting/ModifyPas'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '修改支付密码'
      }
    },
    {
      path: '/bank', // 基金银行卡
      name: 'bank',
      component: resolve => {
        require.ensure(['@/views/setting/Bank'], () => {
          resolve(require('@/views/setting/Bank'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '银行卡'
      }
    },
    {
      path: '/openfundaccount', // 基金开户1
      name: 'openfundaccount',
      component: resolve => {
        require.ensure(['@/views/setting/OpenFundAccount'], () => {
          resolve(require('@/views/setting/OpenFundAccount'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金开户'
      }
    },
    {
      path: '/openaccountinfo/:realname/:identityno/:profession/:address/:email', // 基金开户2
      name: 'openaccountinfo',
      component: resolve => {
        require.ensure(['@/views/setting/OpenAccountInfo'], () => {
          resolve(require('@/views/setting/OpenAccountInfo'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金开户'
      }
    },
    {
      path: '/protocal', // 基金开户协议
      name: 'protocal',
      component: resolve => {
        require.ensure(['@/views/setting/Protocal'], () => {
          resolve(require('@/views/setting/Protocal'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金开户协议'
      }
    },
    {
      path: '/protocal2', // 投资人权益须知
      name: 'protocal2',
      component: resolve => {
        require.ensure(['@/views/setting/Protocal2'], () => {
          resolve(require('@/views/setting/Protocal2'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '投资人权益须知'
      }
    },
    {
      path: '/detailprofit', // 基金持有收益明细
      name: 'detailprofit',
      component: resolve => {
        require.ensure(['@/views/DetailProfit'], () => {
          resolve(require('@/views/DetailProfit'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '收益明细'
      }
    },
    {
      path: '/fundassets/:id/', // 基金资产详情页
      name: 'fundassets',
      component: resolve => {
        require.ensure(['@/views/fund_assets/FundAssets'], () => {
          resolve(require('@/views/fund_assets/FundAssets'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '资产详情'
      }
    },
    {
      path: '/fundlist', // 基金列表页
      name: 'fundlist',
      component: resolve => {
        require.ensure(['@/views/AllFundList'], () => {
          resolve(require('@/views/AllFundList'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金列表'
      }
    },
    {
      path: '/funddetail/:id', // 基金详情页
      name: 'funddetail',
      component: resolve => {
        require.ensure(['@/views/FundDetail'], () => {
          resolve(require('@/views/FundDetail'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '基金详情'
      }
    },
    {
      path: '/order/:id', // 基金购买
      name: 'order',
      component: resolve => {
        require.ensure(['@/views/Order'], () => {
          resolve(require('@/views/Order'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '购买'
      }
    },
    {
      path: '/buysuccess/:id', // 基金购买成功
      name: 'buysuccess',
      component: resolve => {
        require.ensure(['@/views/BuySuccess'], () => {
          resolve(require('@/views/BuySuccess'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '购买成功'
      }
    },
    {
      path: '/redeem/:id', // 基金赎回
      name: 'redeem',
      component: resolve => {
        require.ensure(['@/views/Redeem'], () => {
          resolve(require('@/views/Redeem'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '赎回'
      }
    },
    {
      path: '/redeemsuccess/:id', // 基金赎回成功
      name: 'redeemsuccess',
      component: resolve => {
        require.ensure(['@/views/RedeemSuccess'], () => {
          resolve(require('@/views/RedeemSuccess'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '赎回成功'
      }
    },
    {
      path: '/chargelist', // 基金交易记录
      component: resolve => {
        require.ensure(['@/views/fund_charge/ChargeList'], () => {
          resolve(require('@/views/fund_charge/ChargeList'))
        })
      },
      name: 'chargelist',
      meta: {
        requiresAuth: true,
        title: '交易记录'
      },
      children: [
        { path: 'ing',
          name: 'chargelist/ing', // 全部
          component: resolve => {
            require.ensure(['@/views/fund_charge/ChargeIng'], () => {
              resolve(require('@/views/fund_charge/ChargeIng'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '交易记录'
          }
        },
        { path: 'history',
          name: 'chargelist/history', // 待确认
          component: resolve => {
            require.ensure(['@/views/fund_charge/ChargeHistory'], () => {
              resolve(require('@/views/fund_charge/ChargeHistory'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '交易记录'
          }
        }
      ]
    },
    {
      path: '/fundrecord/:id', // 基金档案
      component: resolve => {
        require.ensure(['@/views/fund_record/FundRecord'], () => {
          resolve(require('@/views/fund_record/FundRecord'))
        })
      },
      name: 'fundrecord',
      meta: {
        requiresAuth: true,
        title: '基金档案'
      },
      children: [
        { path: 'info',
          name: 'fundrecord/info', // 基金概况
          component: resolve => {
            require.ensure(['@/views/fund_record/FundInfo'], () => {
              resolve(require('@/views/fund_record/FundInfo'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '基金概况'
          }
        },
        { path: 'notice',
          name: 'fundrecord/notice', // 基金公告列表
          component: resolve => {
            require.ensure(['@/views/fund_record/FundNotice'], () => {
              resolve(require('@/views/fund_record/FundNotice'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '公告'
          }
        },
        { path: 'hold',
          name: 'fundrecord/hold', // 基金持仓
          component: resolve => {
            require.ensure(['@/views/fund_record/FundHold'], () => {
              resolve(require('@/views/fund_record/FundHold'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '持仓'
          }
        },
        { path: 'type',
          name: 'fundrecord/type', // 基金行业
          component: resolve => {
            require.ensure(['@/views/fund_record/FundType'], () => {
              resolve(require('@/views/fund_record/FundType'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '行业'
          }
        },
        { path: 'fh',
          name: 'fundrecord/fh', // 基金分红配送
          component: resolve => {
            require.ensure(['@/views/fund_record/FundFh'], () => {
              resolve(require('@/views/fund_record/FundFh'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '分红'
          }
        }
      ]
    },
    {
      path: '/traderule/:id', // 基金交易规则
      component: resolve => {
        require.ensure(['@/views/fund_rule/FundRule'], () => {
          resolve(require('@/views/fund_rule/FundRule'))
        })
      },
      name: 'traderule',
      meta: {
        requiresAuth: true,
        title: '交易规则'
      },
      children: [
        { path: 'mrgz',
          name: 'traderule/mrgz',
          component: resolve => {
            require.ensure(['@/views/fund_rule/Mrgz'], () => {
              resolve(require('@/views/fund_rule/Mrgz'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '交易规则'
          }
        },
        { path: 'mcgz',
          name: 'traderule/mcgz',
          component: resolve => {
            require.ensure(['@/views/fund_rule/Mcgz'], () => {
              resolve(require('@/views/fund_rule/Mcgz'))
            })
          },
          meta: {
            requiresAuth: true,
            title: '交易规则'
          }
        }
      ]
    },
    {
      path: '/detailhistory/:id', // 基金历史净值
      name: 'detailhistory',
      component: resolve => {
        require.ensure(['@/views/DetailHistory'], () => {
          resolve(require('@/views/DetailHistory'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '历史净值'
      }
    },
    { path: '/notice/:id/:disc_id',
      name: 'noticedetail', // 基金公告详情
      component: resolve => {
        require.ensure(['@/views/fund_record/NoticeDetail'], () => {
          resolve(require('@/views/fund_record/NoticeDetail'))
        })
      },
      meta: {
        requiresAuth: true,
        title: '详情'
      }
    }
  ]
})
