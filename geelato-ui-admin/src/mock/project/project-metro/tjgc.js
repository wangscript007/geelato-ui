import base from './base'
import report from './report'

let data = base
data.projects = [
  {name: '土建施工1标', code: 'TJ001', projectGroups: 'L011', inited: false},
  {name: '土建施工2标', code: 'TJ002', projectGroups: 'L011'},
  {name: '土建施工3标', code: 'TJ003', projectGroups: 'L011'},
  {name: '土建施工4标', code: 'TJ004', projectGroups: 'L011'},
  {name: '土建施工5标', code: 'TJ005', projectGroups: 'L011'},
  {name: '土建施工6标', code: 'TJ006', projectGroups: 'L011'},
  {name: '土建施工7标', code: 'TJ007', projectGroups: 'L011'},
  {name: '土建施工1标', code: 'TJ001', projectGroups: 'L021'},
  {name: '土建施工2标', code: 'TJ002', projectGroups: 'L021'},
  {name: '土建施工3标', code: 'TJ003', projectGroups: 'L021'},
  {name: '土建施工1标', code: 'TJ001', projectGroups: 'L031'},
  {name: '土建施工2标', code: 'TJ002', projectGroups: 'L031'},
  {name: '土建施工3标', code: 'TJ003', projectGroups: 'L031'},
  {name: '土建施工4标', code: 'TJ004', projectGroups: 'L031'},
  {name: '机电工程1标', code: 'JD001', projectGroups: 'L041'},
  {name: '机电工程2标', code: 'JD002', projectGroups: 'L041'},
  {name: '机电工程3标', code: 'JD003', projectGroups: 'L041'},
  {name: '机电工程4标', code: 'JD004', projectGroups: 'L041'},
  {name: '机电工程5标', code: 'JD005', projectGroups: 'L041'},
  {name: '机电工程6标', code: 'JD006', projectGroups: 'L021'},
  {name: '机电工程7标', code: 'JD007', projectGroups: 'L011'},
  {name: '机电工程1标', code: 'JD001', projectGroups: 'L021'},
  {name: '机电工程2标', code: 'JD002', projectGroups: 'L012'},
  {name: '机电工程3标', code: 'JD003', projectGroups: 'L012'},
  {name: '机电工程1标', code: 'JD001', projectGroups: 'L012'},
  {name: '机电工程2标', code: 'JD002', projectGroups: 'L041'},
  {name: '机电工程3标', code: 'JD003', projectGroups: 'L041'},
  {name: '机电工程4标', code: 'JD004', projectGroups: 'L041'}
]

data.plan = {}
data.plan.yearItems = [
  {
    name: '火车东站工点月度计划',
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
    name: '北京路站工点月度计划',
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
    name: '中央公园站工点月度计划',
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
