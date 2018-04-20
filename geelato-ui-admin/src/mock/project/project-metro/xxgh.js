let data = {}
data.projectGroups = [
  {name: '轨道交通一号线', shortName: '一号线', code: 'L011', projects: []},
  {name: '轨道交通二号线', shortName: '二号线', code: 'L021', projects: []},
  {name: '轨道交通三号线', shortName: '三号线', code: 'L031', projects: []},
  {name: '轨道交通四号线', shortName: '四号线', code: 'L041', projects: []},
  {name: '轨道交通一号线二期', shortName: '四号线', code: 'L012', projects: []}
]

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
data.plan.items = [
  {id: 'UKDIEWJY', name: '线网规划'},
  {id: 'IDGTAUSY', name: '2013年建设规划'},
  {id: 'IDGTWSHY', name: '2018年建设规划'},
  {id: 'WOSIAUSD', name: '2023年建设规划'},
  {id: 'IUYHEGDT', name: '一号线工可计划'},
  {id: 'IKJSYEGV', name: '二号线工可计划'},
  {id: 'QTSBDIUY', name: '三号线工可计划'},
  {id: 'UTEYGDGA', name: '四号线工可计划'}
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

data.plan.task = {
  columns: [
//            {field: 'id', title: 'ID', type: 'string'},
//            {field: 'pid', title: '父ID', type: 'string'},
//            {field: 'level', title: '层级', type: 'string'},
    {field: 'name', title: '任务名称', type: 'string', format: '', editable: true},
    {field: 'res', title: '资源', type: 'string', format: '', editable: true},
    {field: 'planFinishDate', title: '计划完成时间', type: 'string', format: ''}
  ],
  dataSource: [
    {id: '100000000', pid: '', level: 1, name: '启动阶段。', res: '张三', planFinishDate: '2018-3-26'},
    {
      id: '100000001',
      pid: '100000000',
      level: 2,
      name: '启动前准备',
      res: '李四',
      planFinishDate: '2018-3-26'
    },
    {
      id: '100000001',
      pid: '100000000',
      level: 2,
      name: '项目启动会',
      res: '李四',
      planFinishDate: '2018-3-26'
    },
    {id: '100000003', pid: '', level: 1, name: '需求阶段。', res: '张三', planFinishDate: '2018-3-26'},
    {
      id: '100000004',
      pid: '100000003',
      level: 2,
      name: '需求调研问卷编写',
      res: '李四',
      planFinishDate: '2018-3-26'
    },
    {
      id: '100000005',
      pid: '100000003',
      level: 2,
      name: '需求调研',
      res: '李四',
      planFinishDate: '2018-3-26'
    },
    {
      id: '100000006',
      pid: '100000003',
      level: 2,
      name: '需求分析报告编写',
      res: '王五',
      planFinishDate: '2018-3-26'
    },
    {id: '100000000', pid: '', level: 1, name: '设计阶段。', res: '张三', planFinishDate: '2018-3-26'},
    {id: '100000000', pid: '', level: 1, name: '开发阶段。', res: '张三', planFinishDate: '2018-3-26'},
    {id: '100000000', pid: '', level: 1, name: '上线试运行阶段。', res: '张三', planFinishDate: '2018-3-26'},
    {id: '100000000', pid: '', level: 1, name: '验收及质保阶段。', res: '张三', planFinishDate: '2018-3-26'}
  ]
}
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
