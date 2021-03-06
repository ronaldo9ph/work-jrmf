import axios from 'axios'
import qs from 'qs'
import router from '../router'
axios.defaults.timeout = 150000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// axios.defaults.baseURL = 'https://rap.jrmf360.com/mockjsdata/2/'
// axios.defaults.baseURL = 'http://yl-openapi.yilucaifu.com'
// axios.defaults.baseURL = 'http://a.yilucaifu.com/test/'
// axios.defaults.baseURL = 'http://localhost:8020/yilucaifu-openapi/'
// POST传参序列化
axios.interceptors.request.use(config => {
  // loading
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  if (window.sessionStorage.getItem('tokens') !== null) {
    config.headers.Authorization = `${window.sessionStorage.getItem('tokens')}`
  }
  return config
}, error => {
  console.error('错误的传参')
  return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use(res => {
  // console.log(res.data)
  // if (res.data.code !== 200) {
  //   // console.error(res.data.msg)
  //   return Promise.reject(res)
  // }
  return res
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    if (!response.data || response.data.fstat === 0) {
      window.sessionStorage.setItem('respmsg', response.data.respmsg)
      router.push({path: '/error'})
    }
    if (response.status === 400) {
      window.sessionStorage.setItem('respmsg', '参数异常')
      router.push({path: '/error'})
    }
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    window.sessionStorage.setItem('respmsg', '参数异常')
    router.push({path: '/error'})
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    router.push({path: '/error'})
    console.error(res.msg)
  }
  // if (res.data && (!res.data.success)) {
  //   console.error(res.data.error_msg)
  // }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
