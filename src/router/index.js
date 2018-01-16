import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/fundindex', // 基金首页
      name: 'fundindex',
      component: resolve => {
        require.ensure(['@/views/fund_index'], () => {
          resolve(require('@/views/fund_index'))
        })
      },
      meta: {
        keepAlive: true,
        title: '基金'
      }
    },
    {
      path: '/error', // error
      name: 'error',
      component: resolve => {
        require.ensure(['@/views/error'], () => {
          resolve(require('@/views/error'))
        })
      },
      meta: {
        keepAlive: false,
        title: 'Error'
      }
    },
    {
      path: '/Identification/:mobileno/:cust_id/:customkey', // 验证身份
      name: 'identification',
      component: resolve => {
        require.ensure(['@/views/setting/Identification'], () => {
          resolve(require('@/views/setting/Identification'))
        })
      },
      meta: {
        keepAlive: false,
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
        keepAlive: false,
        title: 'test'
      }
    },
    {
      path: '/fundthemes/:id', // 基金主题详情页
      name: 'fundthemes',
      component: resolve => {
        require.ensure(['@/views/fund_themes'], () => {
          resolve(require('@/views/fund_themes'))
        })
      },
      meta: {
        keepAlive: true,
        requiresAuth: true,
        title: '基金主题详情'
      }
    },
    {
      path: '/fundsearch', // 基金搜索
      name: 'fundsearch',
      component: resolve => {
        require.ensure(['@/views/fund_search'], () => {
          resolve(require('@/views/fund_search'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '搜索'
      }
    },
    {
      path: '/myhold', // 基金持有
      name: 'myhold',
      component: resolve => {
        require.ensure(['@/views/myhold'], () => {
          resolve(require('@/views/myhold'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '持有'
      }
    },
    {
      path: '/setting', // 设置
      name: 'setting',
      component: resolve => {
        require.ensure(['@/views/setting'], () => {
          resolve(require('@/views/setting'))
        })
      },
      meta: {
        keepAlive: true,
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
        keepAlive: true,
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
        keepAlive: true,
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
        keepAlive: false,
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
        keepAlive: true,
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
        keepAlive: true,
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
        keepAlive: true,
        requiresAuth: true,
        title: '支付密码'
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
        keepAlive: true,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: false,
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
        keepAlive: true,
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
        keepAlive: true,
        requiresAuth: true,
        title: '投资人权益须知'
      }
    },
    {
      path: '/detailprofit', // 基金持有收益明细
      name: 'detailprofit',
      component: resolve => {
        require.ensure(['@/views/myhold/DetailProfit'], () => {
          resolve(require('@/views/myhold/DetailProfit'))
        })
      },
      meta: {
        keepAlive: true,
        requiresAuth: true,
        title: '收益明细'
      }
    },
    {
      path: '/fundassets/:id/', // 基金资产详情页
      name: 'fundassets',
      component: resolve => {
        require.ensure(['@/views/fund_assets'], () => {
          resolve(require('@/views/fund_assets'))
        })
      },
      meta: {
        keepAlive: true,
        requiresAuth: true,
        title: '资产详情'
      }
    },
    {
      path: '/fundlist', // 基金列表页
      name: 'fundlist',
      component: resolve => {
        require.ensure(['@/views/fund_list'], () => {
          resolve(require('@/views/fund_list'))
        })
      },
      meta: {
        keepAlive: true,
        requiresAuth: true,
        title: '基金列表'
      }
    },
    {
      path: '/funddetail/:id', // 基金详情页
      name: 'funddetail',
      component: resolve => {
        require.ensure(['@/views/fund_detail'], () => {
          resolve(require('@/views/fund_detail'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '基金详情'
      }
    },
    {
      path: '/order/:id', // 基金购买
      name: 'order',
      component: resolve => {
        require.ensure(['@/views/fund_order'], () => {
          resolve(require('@/views/fund_order'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '购买'
      }
    },
    {
      path: '/buysuccess/:id', // 基金购买成功
      name: 'buysuccess',
      component: resolve => {
        require.ensure(['@/views/fund_order/Success'], () => {
          resolve(require('@/views/fund_order/Success'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '购买成功'
      }
    },
    {
      path: '/redeem/:id', // 基金赎回
      name: 'redeem',
      component: resolve => {
        require.ensure(['@/views/fund_redeem'], () => {
          resolve(require('@/views/fund_redeem'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '赎回'
      }
    },
    {
      path: '/redeemsuccess/:id', // 基金赎回成功
      name: 'redeemsuccess',
      component: resolve => {
        require.ensure(['@/views/fund_redeem/Success'], () => {
          resolve(require('@/views/fund_redeem/Success'))
        })
      },
      meta: {
        keepAlive: false,
        requiresAuth: true,
        title: '赎回成功'
      }
    },
    {
      path: '/chargelist', // 基金交易记录
      component: resolve => {
        require.ensure(['@/views/fund_charge'], () => {
          resolve(require('@/views/fund_charge'))
        })
      },
      name: 'chargelist',
      meta: {
        keepAlive: false,
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
            keepAlive: false,
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
            keepAlive: false,
            requiresAuth: true,
            title: '交易记录'
          }
        }
      ]
    },
    {
      path: '/fundrecord/:id', // 基金档案
      component: resolve => {
        require.ensure(['@/views/fund_record'], () => {
          resolve(require('@/views/fund_record'))
        })
      },
      name: 'fundrecord',
      meta: {
        keepAlive: true,
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
            keepAlive: true,
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
            keepAlive: true,
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
            keepAlive: true,
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
            keepAlive: true,
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
            keepAlive: true,
            requiresAuth: true,
            title: '分红'
          }
        }
      ]
    },
    {
      path: '/traderule/:id', // 基金交易规则
      component: resolve => {
        require.ensure(['@/views/fund_rule'], () => {
          resolve(require('@/views/fund_rule'))
        })
      },
      name: 'traderule',
      meta: {
        keepAlive: true,
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
            keepAlive: true,
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
            keepAlive: true,
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
        require.ensure(['@/views/fund_detail/DetailHistory'], () => {
          resolve(require('@/views/fund_detail/DetailHistory'))
        })
      },
      meta: {
        keepAlive: true,
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
        keepAlive: true,
        requiresAuth: true,
        title: '详情'
      }
    }
  ]
})
