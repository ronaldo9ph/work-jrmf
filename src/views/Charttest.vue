<template>
  <div id="app">
    <x-chart :id="id" :option="option" ref="chart"></x-chart>
  </div>
</template>

<script>
// 导入chart组件
import HighCharts from 'highcharts/highstock'
import XChart from '../components/Chart.vue'
export default {
  name: 'app',
  data () {
    return {
      id: 'container',
      data: [],
      option: {
        chart: {
          height: 300
        },
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
        yAxis: {
          opposite: false
        },
        series: [{
          name: ' ',
          data: ' ',
          type: 'spline',
          tooltip: {
            valueDecimals: 2
          }
        }]
      }
    }
  },
  created: async function () {
    this.drawChart(1)
  },
  methods: {
    drawChart: async function (id) {
      const res = await this.$http.get('api/v1/funds/holdings/123/fund-unitnets', {'month': 12})
      if (res.data.fstat) {
        this.data = []
        for (let i = 0; i < res.data.unitnetList.length; i++) {
          this.data[i] = res.data.unitnetList[i]
        }
        console.log(this.data)
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
      this.option.series[0].data = this.data
      let _Highcharts = HighCharts
      let chart = new _Highcharts.StockChart(this.$refs.chart.$el, this.option)
      console.log(chart)
    }
  },
  components: {
    XChart
  }
}

</script>

<style>
#test {
  width: 400px;
  height: 400px;
  margin: 40px auto;
}
</style>
