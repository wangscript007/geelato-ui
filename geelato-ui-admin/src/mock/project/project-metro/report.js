let report = {}

report.quota = [
  {wp: '北京路站', name: '连续墙', unit: '幅', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '底板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '中板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '顶板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '导墙', unit: 'm', target: '2000', current: '390', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '旋喷桩', unit: '根', target: '69', current: '21', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '钻孔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '搅拌桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '立柱', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '抗拔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '北京路站', name: '开挖量', unit: 'm3', target: '3092', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '连续墙', unit: '幅', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '底板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '中板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '顶板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '导墙', unit: 'm', target: '2000', current: '390', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '旋喷桩', unit: '根', target: '69', current: '21', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '钻孔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '搅拌桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '立柱', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '抗拔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '火车东站', name: '开挖量', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '连续墙', unit: '幅', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '底板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '中板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '顶板', unit: '段', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '导墙', unit: 'm', target: '2000', current: '390', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '旋喷桩', unit: '根', target: '69', current: '21', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '钻孔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '搅拌桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '立柱', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '抗拔桩', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'},
  {wp: '中央公园站', name: '开挖量', unit: '根', target: '608', current: '30', status: 'green', y: '2018', m: '2'}
]

report.projectShortReport = {}
report.projectShortReport.items = [
  {name: '2017年11月项目简报'},
  {name: '2017年12月项目简报'},
  {name: '2018年1月项目简报'},
  {name: '2018年2月项目简报'},
  {name: '2018年3月项目简报'}
]

report.security = {hiddenPeril: {}, peril: {}}
report.security.hiddenPeril.option = {
  title: {
    text: '安全隐患分级统计',
    subtext: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['重大', '较大', '一般']
  },

  calculable: true,
  series: [
    {
      name: '隐患数',
      type: 'pie',
      radius: [20, 110],
      // center: ['60%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        {value: 20, name: '重大'},
        {value: 30, name: '较大'},
        {value: 45, name: '一般'}
      ]
    }
  ]
}
report.security.peril.option = {
  title: {
    text: '各安全风险等级的工区数',
    subtext: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['I', 'II', 'III', 'IV']
  },

  calculable: true,
  series: [
    {
      name: '工区数',
      type: 'pie',
      radius: [20, 110],
      // center: ['60%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        {value: 2, name: 'I'},
        {value: 3, name: 'II'},
        {value: 5, name: 'III'},
        {value: 4, name: 'IV'}
      ]
    }
  ]
}

export default report
