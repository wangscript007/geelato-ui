import settings from './settings'
import ds from './dataset.js'

class Schedule {
    constructor() {
        this.version = '1.0.0'

        this.baseItemStyle = {
            normal: {
                opacity: 0.7,
                color: {
                    image: undefined,
                    repeat: 'repeat'
                },
                borderWidth: 3,
                borderColor: '#235894'
            }
        }
        this.baseItemStyleString = JSON.stringify(this.baseItemStyle)
    }

    render(dom, rawData) {
        let schedule = this
        let chart = echarts.init(dom);
        chart.setOption(makeOption(rawData));

        function makeOption(rawData) {
            return {
                tooltip: {},
                animation: false,
                title: {
                    text: '轨道交通4号线西段开通（洪运路站~楞塘村站）总工期筹划示意图(2020年12月28日通车)(2018.1版)',
                    left: 'center'
                },
                dataZoom: [{
                    type: 'slider',
                    xAxisIndex: 0,
                    filterMode: 'weakFilter',
                    height: 20,
                    bottom: 0,
                    start: -26,
                    end: 26,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    showDetail: false
                }, {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'weakFilter',
                    start: -26,
                    end: 26,
                    zoomOnMouseWheel: false,
                    moveOnMouseMove: true
                }, {
                    type: 'slider',
                    yAxisIndex: 0,
                    zoomLock: true,
                    width: 10,
                    right: 10,
                    top: 70,
                    bottom: 20,
                    start: 95,
                    end: 100,
                    handleSize: 0,
                    showDetail: false,
                }, {
                    type: 'inside',
                    yAxisIndex: 0,
                    start: 95,
                    end: 100,
                    zoomOnMouseWheel: false,
                    moveOnMouseMove: true,
                    moveOnMouseWheel: true
                }],
                grid: {
                    show: true,
                    top: 70,
                    bottom: 20,
                    left: 100,
                    right: 20,
                    backgroundColor: '#fff',
                    borderWidth: 0
                },
                xAxis: {
                    type: 'time',
                    position: 'top',
                    splitLine: {
                        lineStyle: {
                            color: ['#E9EDFF']
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#929ABA'
                        }
                    },
                    axisLabel: {
                        color: '#929ABA',
                        inside: false,
                        align: 'center'
                    }
                },
                yAxis: {
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    min: 0
                    // max: rawData.parkingApron.data.length - 1
                },
                series: [
                    {
                        type: 'custom',
                        renderItem: renderRectItem,
                        // dimensions: rawData.flight.dimensions,
                        // encode: {
                        //     x: [1, 2],
                        //     y: 0,
                        //     tooltip: [0, 1, 2]
                        // },
                        encode: {
                            x: -1, // Then this series will not controlled by x.
                            y: ['startAt', 'startAt']
                        },
                        data: schedule.genTimeline(ds.data).items
                    },
                    {
                        type: 'custom',
                        renderItem: renderAxisLabelItem,
                        // dimensions: rawData.parkingApron.dimensions,
                        encode: {
                            x: -1, // Then this series will not controlled by x.
                            y: 0
                        },
                        data: schedule.genTimeline(ds.data).items
                    }]
            };
        }

        // 维度的宽度，单位像素
        let dimensionItem = 50
        // 维度划分为N等份
        let dimensionItemDividedCount = 5

        let timelineStartAt = '20180601'
        let timelineItemCount = 20 // 时间线的刻度数
        let timelineItemFormat = 'yyyy年MM月'
        let timelineEndAt = '20200601'  // 以该值为准，优先于timelineSize
        let timelineGapUnit = 'month'  // 间隔单位
        // 时间刻度宽度，单位像素
        let timelineGapPx = 18

        // axisLabelItems
        function genTimelineItems() {
            let items = []
            // TODO by months?
            return items
        }

        // 计算区块开始及结束坐标
        function statCoord(params, api) {

        }

        // 手动调整图形的宽度、颜色、填充图
        function adjustShape() {

        }

        function renderRectItem(params, api) {
            console.log(params, api)

            let rectShape = clipRectByRect(params, {
                x: 5, y: 5, width: 50, height: 50
            })

            return {
                type: 'rect',
                shape: rectShape,
                style: api.style(),
                // itemStyle: schedule.genFillItemStyle('blueMix'),
                data: ds.data
            }
        }

        function renderAxisLabelItem(params, api) {
            console.log('api', api.coord([0, 8]))
            let y = api.coord([0, 8])[1];
            // if (y < params.coordSys.y + 5) {
            //     return;
            // }
            return {
                type: 'group',
                position: [
                    10,
                    y
                ],
                children: [{
                    type: 'rect',
                    shape: {
                        // d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
                        x: 0,
                        y: -20,
                        width: 90,
                        height: 20,
                        layout: 'cover'
                    },
                    style: {
                        fill: '#368c6c'
                    }
                }, {
                    type: 'text',
                    style: {
                        x: 44,
                        y: -5,
                        text: api.value(1),
                        textVerticalAlign: 'bottom',
                        textAlign: 'center',
                        textFill: '#fff'
                    }
                }]
            };
        }


        function clipRectByRect(params, rect) {
            return echarts.graphic.clipRectByRect(rect, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });
        }

    }

    genTimeline(dataset) {
        return {
            startAt: '201806',
            endAt: '201909',
            gapUnit: 'month',
            items: ['201806', '201807', '201808', '201809', '201810', '201811', '201908']
        }
    }


    /**
     * 获取填充样式
     * @param fillImageName
     * @returns {any}
     */
    genFillItemStyle(fillImageName) {
        let itemStyle = JSON.parse(this.baseItemStyleString)
        let patternImg = new Image()
        patternImg.src = settings.imageData[fillImageName];
        itemStyle.normal.color.image = patternImg
        return itemStyle
    }

}

export default Schedule
