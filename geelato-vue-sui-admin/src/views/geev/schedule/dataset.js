let dataset = {
    dimensions: [
        {name: '沙井停车场', description: '这是概述'},
        {name: '出入段线'},
        {name: '洪运路站'},
        {name: '洪那区间'},
        {name: '那历村站'},
        {name: '那那区间',description:'盾构+矿山，左线矿山法55.0m。1处联络通道。含粘性土圆砾层、泥岩、泥质粉砂岩、炭质泥岩。'},
        {name: '那洪立交站'},
        {name: '金那区间'},
        {name: '金阳路站'},
        {name: '通金区间'},
        {name: '通源路站'},
        {name: '通大区间'},
        {name: '大沙田站'},
        {name: '大金区间'},
        {name: '金象大道站'}
    ],
    data: [
        // style，json字符串格式的配置信息，实例化的信息，可覆盖shapes中的style信息
        [1001,'1001','','shape001','20180601','20180901','style'],
        {id: '1001', name: '1001', description: '', shape: 'shape001', startAt: '20180601', endAt: '20180901', style: ''},
        {id: '1002', name: '1002', description: '', shape: 'shape001', startAt: '20180601', endAt: '20180901', style: ''},
        {id: '1003', name: '1003', description: '', shape: 'shape001', startAt: '20180601', endAt: '20180901', style: ''},
        {id: '1004', name: '1004', description: '', shape: 'shape001', startAt: '20180601', endAt: '20180901', style: ''},
        {id: '1005', name: '1005', description: '', shape: 'shape001', startAt: '20190101', endAt: '20190301', style: ''},
        {id: '1006', name: '1006', description: '', shape: 'shape001', startAt: '20190201', endAt: '20190401', style: ''},
        {id: '1007', name: '1007', description: '', shape: 'shape001', startAt: '20190301', endAt: '20190901', style: ''},
        {id: '1008', name: '1008', description: '', shape: 'shape001', startAt: '20190401', endAt: '20190501', style: ''},
        {id: '1009', name: '1009', description: '', shape: 'shape001', startAt: '20190501', endAt: '20190801', style: ''},
        {id: '1010', name: '1010', description: '', shape: 'shape001', startAt: '20190601', endAt: '20190901', style: ''}
    ]
}

// style，json字符串格式的配置信息
let shapes = {
    'shape001': {code: 'shape001', description: '',  type: 'rect', style: ''},
    'shape002': {code: 'shape001', description: '', type: 'rect', style: ''}
}

export default dataset
