import base from './base'
import report from './report'

let data = JSON.parse(JSON.stringify(base))

data.projectGroups = [
  {name: '越秀区', shortName: '越秀区', code: 'YX', projects: []},
  {name: '荔湾区', shortName: '荔湾区', code: 'LW', projects: []},
  {
    name: '天河区',
    shortName: '天河区',
    code: 'L031',
    projects: [],
    points: [
      {lng: 108.277708, lat: 22.884344},
      {lng: 108.290643, lat: 22.884344},
      {lng: 108.304585, lat: 22.885209},
      {lng: 108.316658, lat: 22.886275},
      {lng: 108.322407, lat: 22.881747},
      {lng: 108.334193, lat: 22.884543},
      {lng: 108.34526, lat: 22.882812},
      {lng: 108.352016, lat: 22.876819},
      {lng: 108.354243, lat: 22.876619},
      {lng: 108.361502, lat: 22.876752},
      {lng: 108.363226, lat: 22.87542},
      {lng: 108.362508, lat: 22.862633},
      {lng: 108.362364, lat: 22.851244},
      {lng: 108.362292, lat: 22.842318},
      {lng: 108.362508, lat: 22.840386},
      {lng: 108.366173, lat: 22.83619},
      {lng: 108.37918, lat: 22.829195},
      {lng: 108.377743, lat: 22.825864},
      {lng: 108.377887, lat: 22.819468},
      {lng: 108.37803, lat: 22.817203},
      {lng: 108.374006, lat: 22.813872},
      {lng: 108.368544, lat: 22.808675},
      {lng: 108.375587, lat: 22.798947},
      {lng: 108.374868, lat: 22.796681},
      {lng: 108.382917, lat: 22.789351},
      {lng: 108.382486, lat: 22.780955},
      {lng: 108.382702, lat: 22.773957},
      {lng: 108.383564, lat: 22.764426},
      {lng: 108.384858, lat: 22.76296},
      {lng: 108.388451, lat: 22.759294},
      {lng: 108.389673, lat: 22.756828},
      {lng: 108.390391, lat: 22.753895},
      {lng: 108.390463, lat: 22.751162},
      {lng: 108.390319, lat: 22.745163},
      {lng: 108.390391, lat: 22.73303}],
    schedulePoints: {
      red: [{lng: 108.362508, lat: 22.862633},
        {lng: 108.362364, lat: 22.851244},
        {lng: 108.362292, lat: 22.842318},
        {lng: 108.362508, lat: 22.840386},
        {lng: 108.366173, lat: 22.83619},
        {lng: 108.37918, lat: 22.829195},
        {lng: 108.377743, lat: 22.825864}]
    }
  },
  {name: '黄埔区', shortName: '黄埔区', code: 'HP', projects: []},
  {name: '海珠区', shortName: '海珠区', code: 'ZH', projects: []},
  {name: '白云区', shortName: '白云区', code: 'BY', projects: []},
  {name: '萝岗区', shortName: '萝岗区', code: 'LG', projects: []},
  {name: '增城市', shortName: '增城市', code: 'ZC', projects: []},
  {name: '从化市', shortName: '从化市', code: 'CH', projects: []},
  {name: '花都区', shortName: '花都区', code: 'HD', projects: []},
  {name: '南沙区', shortName: '南沙区', code: 'NS', projects: []}
]

data.projects = [
  {name: 'XX1片区', code: 'TJ001', projectGroups: 'YX', inited: false},
  {name: 'XX2片区', code: 'TJ002', projectGroups: 'YX'},
  {name: 'XX3片区', code: 'TJ003', projectGroups: 'YX'},
  {name: 'XX4片区', code: 'TJ004', projectGroups: 'YX'},
  {name: 'XX5片区', code: 'TJ005', projectGroups: 'YX'},
  {name: 'XX6片区', code: 'TJ006', projectGroups: 'LW'},
  {name: 'XX7片区', code: 'TJ007', projectGroups: 'LW'},
  {name: 'XX8片区', code: 'TJ001', projectGroups: 'LW'},
  {name: 'XX9片区', code: 'TJ002', projectGroups: 'LW'},
  {name: 'XX10片区', code: 'TJ003', projectGroups: 'LW'},
  {name: 'XX11片区', code: 'TJ001', projectGroups: 'LW'},
  {name: 'XX12片区', code: 'TJ002', projectGroups: 'LG'},
  {name: 'XX13片区', code: 'TJ003', projectGroups: 'LG'},
  {name: 'XX14片区', code: 'TJ004', projectGroups: 'LG'},
  {name: 'XX15片区', code: 'JD001', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD002', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD003', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD004', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD005', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD006', projectGroups: 'LG'},
  {name: 'XX16片区', code: 'JD007', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD001', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD002', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD003', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD001', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD002', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD003', projectGroups: 'NS'},
  {name: 'XX16片区', code: 'JD004', projectGroups: 'NS'}
]

data.plan = {}
data.plan.items = [
  {id: 'IUYHEGDT', name: 'XX项目计划'},
  {id: 'IKJSYEGV', name: '运营一体化1期项目计划'},
  {id: 'QTSBDIUY', name: '机房建设1期计划'}
]

data.plan.yearItems = [
  {
    id: 'IUYHEGDT',
    name: '工程一体化1期项目计划',
    lastUpdateAt: '2018-01-02 18:03 ',
    y: 2018,
    m1: {taskSetCode: 'UIDTEIOS', updateAt: '2018-02-02'},
    m2: '',
    m3: '',
    m4: '',
    m5: '',
    m6: '',
    m7: '',
    m8: '',
    m9: '',
    m10: '',
    m11: '',
    m12: ''
  },
  {
    id: 'IKJSYEGV',
    name: '运营一体化1期项目计划',
    lastUpdateAt: '2018-03-02 15:03 ',
    y: 2018,
    m1: {active: false},
    m2: {active: false},
    m3: {taskSetCode: 'OIRKFOPD', updateAt: '2018-02-02'},
    m4: '',
    m5: '',
    m6: '',
    m7: '',
    m8: '',
    m9: '',
    m10: '',
    m11: '',
    m12: ''
  },
  {
    id: 'QTSBDIUY',
    name: '机房建设1期计划',
    lastUpdateAt: '2018-01-05 10:03 ',
    y: 2018,
    m1: {taskSetCode: 'NXHDYQIA', updateAt: '2018-02-02'},
    m2: '',
    m3: '',
    m4: '',
    m5: '',
    m6: '',
    m7: '',
    m8: '',
    m9: '',
    m10: '',
    m11: '',
    m12: ''
  }
]

data.report = report

data.unit = [{name: '中铁三局'}, {name: '中铁三局'}, {name: '中铁三局'}, {name: '中铁三局'}]

// 设置数据关联关系，将标段设置到线路中
for (var lineIndex in data.projectGroups) {
  data.projectGroups[lineIndex].projects = data.projectGroups[lineIndex].projects || []
  for (var si in data.projects) {
    if (data.projectGroups[lineIndex].code === data.projects[si].projectGroups) {
      data.projectGroups[lineIndex].projects.push(data.projects[si])
    }
  }
}

export default data
