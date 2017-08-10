<template>
  <div id="container"></div>
</template>
<script>
// import HighCharts from 'highcharts/highstock'
// export default {
//   data () {
//     return {
//       id: 'container',
//       data: [],
//       option: {
//         chart: {
//           type: 'line',
//           zoomType: 'x'
//         },
//         navigator: {
//           adaptToUpdatedData: false,
//           series: {
//             data: this.data
//           }
//         },
//         scrollbar: {
//           liveRedraw: false
//         },
//         rangeSelector: {
//           buttons: [{
//             type: 'hour',
//             count: 1,
//             text: '1h'
//           }, {
//             type: 'day',
//             count: 1,
//             text: '1d'
//           }, {
//             type: 'month',
//             count: 3,
//             text: '1m'
//           }, {
//             type: 'year',
//             count: 1,
//             text: '1y'
//           }, {
//             type: 'all',
//             text: 'All'
//           }],
//           inputEnabled: false, // it supports only days
//           selected: 4 // all
//         },
//         xAxis: {
//           events: {
//             afterSetExtremes: this.afterSetExtremes()
//           },
//           minRange: 3600 * 1000 // one hour
//         },
//         yAxis: {
//           floor: 0
//         },
//         series: [{
//           data: this.data,
//           dataGrouping: {
//             enabled: false
//           }
//         }]
//       }
//     }
//   },
//   methods: {
//     afterSetExtremes: function (e) {
//       // var chart = HighCharts.chart(this.id, this.option)
//       // console.log(chart)
//       // chart.showLoading('Loading data from server...')
//       // var data = [[883612800000, 3, 4.05, 5.2, 4.5], [886291200000, 4.05, 7.05, 2, 5], [888710400000, 3.7, 4.05, 5.2, 4.5], [891388800000, 8.05, 7.05, 2, 5], [893980800000, 3.7, 4.05, 5.2, 4.5], [896659200000, 8.05, 7.05, 2, 5]]
//       // chart.series[0].setData(data)
//       // chart.hideLoading()
//         // $.getJSON('https://www.highcharts.com/samples/data/from-sql.php?start=' + Math.round(e.min) +
//         //           '&end=' + Math.round(e.max) + '&callback=?', function (data) {
//         //     chart.series[0].setData(data);
//         //     chart.hideLoading();
//         // });
//     }
//   },
//   mounted () {
//     // this.afterSetExtremes()
//     // console.log(HighCharts)
//   }
// }

</script>

<style>
body{
  background-color: #cccccc;
}
</style>
