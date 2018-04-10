import report from './report'

let data = {}
data.metroLine = [
  {name: '轨道交通一号线', shortName: '一号线', code: 'L011', segments: []},
  {name: '轨道交通二号线', shortName: '二号线', code: 'L021', segments: []},
  {name: '轨道交通三号线', shortName: '三号线', code: 'L031', segments: []},
  {name: '轨道交通四号线', shortName: '四号线', code: 'L041', segments: []},
  {name: '轨道交通一号线二期', shortName: '四号线', code: 'L012', segments: []}
]

data.metroSegment = [
  {name: '土建施工1标', code: 'TJ001', metroLine: 'L011', inited: false},
  {name: '土建施工2标', code: 'TJ002', metroLine: 'L011'},
  {name: '土建施工3标', code: 'TJ003', metroLine: 'L011'},
  {name: '土建施工4标', code: 'TJ004', metroLine: 'L011'},
  {name: '土建施工5标', code: 'TJ005', metroLine: 'L011'},
  {name: '土建施工6标', code: 'TJ006', metroLine: 'L011'},
  {name: '土建施工7标', code: 'TJ007', metroLine: 'L011'},
  {name: '土建施工1标', code: 'TJ001', metroLine: 'L021'},
  {name: '土建施工2标', code: 'TJ002', metroLine: 'L021'},
  {name: '土建施工3标', code: 'TJ003', metroLine: 'L021'},
  {name: '土建施工1标', code: 'TJ001', metroLine: 'L031'},
  {name: '土建施工2标', code: 'TJ002', metroLine: 'L031'},
  {name: '土建施工3标', code: 'TJ003', metroLine: 'L031'},
  {name: '土建施工4标', code: 'TJ004', metroLine: 'L031'},
  {name: '机电工程1标', code: 'JD001', metroLine: 'L041'},
  {name: '机电工程2标', code: 'JD002', metroLine: 'L041'},
  {name: '机电工程3标', code: 'JD003', metroLine: 'L041'},
  {name: '机电工程4标', code: 'JD004', metroLine: 'L041'},
  {name: '机电工程5标', code: 'JD005', metroLine: 'L041'},
  {name: '机电工程6标', code: 'JD006', metroLine: 'L021'},
  {name: '机电工程7标', code: 'JD007', metroLine: 'L011'},
  {name: '机电工程1标', code: 'JD001', metroLine: 'L021'},
  {name: '机电工程2标', code: 'JD002', metroLine: 'L012'},
  {name: '机电工程3标', code: 'JD003', metroLine: 'L012'},
  {name: '机电工程1标', code: 'JD001', metroLine: 'L012'},
  {name: '机电工程2标', code: 'JD002', metroLine: 'L041'},
  {name: '机电工程3标', code: 'JD003', metroLine: 'L041'},
  {name: '机电工程4标', code: 'JD004', metroLine: 'L041'}
]

data.plan = {}
data.plan.workPoint = [
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
for (var lineIndex in data.metroLine) {
  data.metroLine[lineIndex].segments = data.metroLine[lineIndex].segments || []
  for (var si in data.metroSegment) {
    if (data.metroLine[lineIndex].code === data.metroSegment[si].metroLine) {
      data.metroLine[lineIndex].segments.push(data.metroSegment[si])
    }
  }
}

export default data
