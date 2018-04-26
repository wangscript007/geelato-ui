let data = {}
data.projectGroups = [
  {name: '轨道交通一号线', shortName: '一号线', code: 'L011', projects: []},
  {name: '轨道交通二号线', shortName: '二号线', code: 'L021', projects: []},
  {
    name: '轨道交通三号线',
    shortName: '三号线',
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
  {name: '轨道交通四号线', shortName: '四号线', code: 'L041', projects: []},
  {name: '轨道交通一号线二期', shortName: '四号线', code: 'L012', projects: []}
]

data.workPoints = [
  {name: '火车站', lng: 108.361502, lat: 22.876752, color: 'blue', type: 'station'},
  {name: '达道站', lng: 108.390463, lat: 22.751162, color: 'red', type: 'station'}
]

data.task = {}
data.task.items = [
  {num: '100', title: '用地方案核实', description: '现场摸查、核实核实用地面积、属性、权属单位、使用现状等情况', createAt: '2017-12-12 20:25'},
  {num: '101', title: '建设用地申请', description: '建管部书面向用地管理部提出用地需求', createAt: '2017-12-12 20:25'},
  {
    num: '102',
    title: '征地拆迁工作会签',
    description: '用地管理部向各区实施单位拟发征借地拆迁工作事宜委托函，并提供土地和房屋征收及借地图纸',
    createAt: '2017-12-12 20:25'
  },
  {
    num: '103',
    title: '征地公告发布',
    description: '发布机关：市县政府\n' +
    '发布范围：被征收土地所在地的乡(镇)、村\n' +
    '公告内容：批准征地机关、批准文号、征收土地用途、范围、面积以及征地补偿标准、农业人员安置办法、办理征地补偿的期限等\n' +
    '发布后果：公告发布后抢栽、抢种的农作物或抢建的建筑物不列入补偿范围',
    createAt: '2017-12-12 20:25'
  },
  {num: '104', title: '用地补偿评估报告', description: '区实施单位委托评估单位出用地补偿评估报告', createAt: '2017-12-12 20:25'},
  {num: '105', title: '区实施单位上报补偿方案', description: '根据用地补偿评估报告编制补偿方案报区政府决策并批复', createAt: '2017-12-12 20:25'}
]
data.task.properties = {
  type: {name: '类型', values: [{name: '任务', code: 'task'}, {name: '问题', code: 'problem'}]},
  state: {name: '状态',
    values: [{name: '新建', code: 'new'}, {name: '进行中', code: 'ing'}, {name: '已解决', code: 'resolved'}, {
      name: '延期处理',
      code: 'hold'
    }, {name: '重新打开', code: 'reopen'}, {name: '已拒绝', code: 'reject'}, {name: '已完成', code: 'finished'}]
  },
  level: {
    name: '优先级',
    values: [{name: '紧急', code: '1'}, {name: '高', code: '2'}, {name: '中', code: '3'}, {name: '低', code: '4'}]
  }
}

export default data
