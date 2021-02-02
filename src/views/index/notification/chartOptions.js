/*
 * @Author: lts
 * @Date: 2021-01-30 14:07:11
 * @LastEditTime: 2021-01-31 16:51:42
 * @FilePath: \active-center-client\src\views\index\notification\chartOptions.js
 */
export const barChartOptions = (resData) => {
    console.log(resData)
    let data = []
    resData.forEach(item => {
        data.push(item.count)
    });

    // const data = [32, 58, 64, 64, 64, 55, 44];
    const xList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    const color = ['#CC1CAA', '#8D67FF', '#00FFFF', '#48DE13', '#FFC516', '#DC3E14', '#8E16F8'];
    let xData = xList.map((item, index) => {
        return {
            value: item,
            textStyle: {
                color: color[index]
            }
        };
    });
    const dom = 800;
    const barWidth = dom / 20;
    const colors = [{
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#FF3FDA'
        }, {
            offset: 0.5,
            color: '#FF3FDA'
        }, {
            offset: 0.5,
            color: '#CC1BAA'
        }, {
            offset: 1,
            color: '#CC1BAA'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#602CFF'
        }, {
            offset: 0.5,
            color: '#602CFF'
        }, {
            offset: 0.5,
            color: '#4915E6'
        }, {
            offset: 1,
            color: '#4915E6'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#00FFFF'
        }, {
            offset: 0.5,
            color: '#00FFFF'
        }, {
            offset: 0.5,
            color: '#11A6D0'
        }, {
            offset: 1,
            color: '#11A6D0'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#89FF5E'
        }, {
            offset: 0.5,
            color: '#89FF5E'
        }, {
            offset: 0.5,
            color: '#48DD12'
        }, {
            offset: 1,
            color: '#48DD12'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#FFD05C'
        }, {
            offset: 0.5,
            color: '#FFD05C'
        }, {
            offset: 0.5,
            color: '#DEA821'
        }, {
            offset: 1,
            color: '#DEA821'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#FF7853'
        }, {
            offset: 0.5,
            color: '#FF7853'
        }, {
            offset: 0.5,
            color: '#DB3E13'
        }, {
            offset: 1,
            color: '#DB3E13'
        }]
    },
    {
        type: 'linear',
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#AA48FF'
        }, {
            offset: 0.5,
            color: '#AA48FF'
        }, {
            offset: 0.5,
            color: '#8E15F8'
        }, {
            offset: 1,
            color: '#8E15F8'
        }]
    }
    ];
    let option = {
        backgroundColor: '#341569',
        //标题
        title: {
            // text: '志愿项目服务时长变化趋势',
            textStyle: {
                color: '#00FFFF',
                fontWeight: '800',
                fontSize: `20`,
            },
            left: 'center',
        },
        //提示框
        tooltip: {
            trigger: 'axis',
            formatter: "{b} : {c}",
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            // top:'30%',
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        //X轴
        xAxis: {
            name: 'X',
            nameTextStyle: {
                color: '#FFFFFF',
                padding: [0, 0, 0, 20]

            },
            data: xData,
            show: true,
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,1)',
                    shadowColor: 'rgba(255,255,255,1)',
                    shadowOffsetX: '20',
                },
                symbol: ['none', 'arrow'],
                symbolOffset: [0, 25]
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                },
            },
            axisLabel: {
                rotate: -30,
                fontSize: 12,
            },
        },
        yAxis: {
            show: true,
            // splitNumber: 4,
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.2)'

                },
            },
            axisLabel: {
                color: '#FFFFFF',
            }
        },
        series: [{
            type: 'bar',
            barWidth: barWidth,
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colors[params.dataIndex % 7];
                    }
                }
            },
            label: {
                show: true,
                position: [barWidth / 2, -(barWidth + 20)],
                color: '#ffffff',
                fontSize: 12,
                fontStyle: 'bold',
                align: 'center',
            },
            data: data
        },
        {
            z: 2,
            type: 'pictorialBar',
            data: data,
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
                normal: {
                    color: function (params) {
                        return colors[params.dataIndex % 7];
                    },
                }
            },
        },
        {
            z: 3,
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: data,
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [barWidth, barWidth * 0.5],
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    color: function (params) {
                        return colors[params.dataIndex % 7].colorStops[0].color;
                    },

                }
            },
        },
        {
            z: 4,
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: data,
            symbol: 'circle',
            symbolOffset: [0, -barWidth],
            symbolSize: [barWidth * 0.5, barWidth * 0.5],
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    color: function (params) {
                        return colors[params.dataIndex % 7].colorStops[0].color;
                    },

                }
            },
        },
        ],
    };
    return option
    // return {
    //     title: { text: '七天签到统计', left: 'center' },
    //     color: ["#70f0fc"],
    //     tooltip: {
    //         trigger: "axis",
    //         axisPointer: {
    //             // 坐标轴指示器，坐标轴触发有效
    //             type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //         },
    //     },
    //     grid: {
    //         left: "3%",
    //         right: "4%",
    //         bottom: "3%",
    //         containLabel: true,
    //     },
    //     xAxis: [
    //         {
    //             type: "category",
    //             data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    //             axisTick: {
    //                 alignWithLabel: true,
    //             },
    //         },
    //     ],
    //     yAxis: [
    //         {
    //             type: "value",
    //         },
    //     ],
    //     series: [
    //         {
    //             name: "直接访问",
    //             type: "bar",
    //             barWidth: "60%",
    //             data
    //         },
    //     ],
    // }
}