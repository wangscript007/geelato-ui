let data = {}
data.projectGroups = [
  {name: '咨询服务类', shortName: '规划咨询', code: 'ZF', projects: []},
  {name: '运营类', shortName: '运营类', code: 'YY', projects: []},
  {name: '建设类', shortName: '建设类', code: 'JS', projects: []},
  {name: '企业管理类', shortName: '企业管理类', code: 'QY', projects: []},
  {name: '资源开发类', shortName: '资源开发类', code: 'ZY', projects: []},
  {name: '硬件网络类', shortName: '资源开发类', code: 'YW', projects: []}
]

data.projects = [
  {name: 'it项目规划1期', code: 'ZX001', projectGroups: 'ZF', inited: false},
  {name: 'it项目规划2期', code: 'ZX002', projectGroups: 'ZF'},
  {name: '运营一体化1期', code: 'YY001', projectGroups: 'YY'},
  {name: '运营一体化2期', code: 'YY002', projectGroups: 'YY'},
  {name: '工程一体化1期', code: 'JD004', projectGroups: 'JS'},
  {name: '工程一体化2期', code: 'JD004', projectGroups: 'JS'},
  {name: '机房建设1期', code: 'YW001', projectGroups: 'YW'},
  {name: '机房建设2期', code: 'YW002', projectGroups: 'YW'}
]

data.plan = {}
data.plan.items = [
  {id: 'IUYHEGDT', name: '工程一体化1期项目计划'},
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
