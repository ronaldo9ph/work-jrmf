import HighCharts from 'highcharts/highstock'
export default {
  chart: {
    height: 200
  },
  colors: ['#f04a3a'],
  rangeSelector: {
    selected: 1,
    enabled: false
  },
  credits: {
    enabled: false
  },
  navigator: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      second: '%m-%d',
      minute: '%m-%d',
      hour: '%m-%d',
      day: '%d',
      week: '%y-%m-%d',
      month: '%Y-%m',
      year: '%Y'
    }
  },
  title: {
    text: ''
  },
  tooltip: {
    backgroundColor: '#f04a3a',   // 背景颜色
    borderRadius: 4,             // 边框圆角
    shadow: true,                 // 是否显示阴影
    animation: true,               // 是否启用动画效果
    style: {                      // 文字内容相关样式
      color: 'white',
      fontSize: '12px'
    },
    formatter: function () {
      return '<b>' + HighCharts.dateFormat('%Y-%m-%d', this.x) + '</b><br/><span>净值：' + this.y + '</span>'
    }
  },
  series: [{name: '', data: [1]}]
}
