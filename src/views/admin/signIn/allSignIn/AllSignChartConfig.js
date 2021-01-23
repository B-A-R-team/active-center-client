/*
 * @Author: lts
 * @Date: 2021-01-23 11:39:40
 * @LastEditTime: 2021-01-23 16:55:16
 * @FilePath: \active-center-client\src\views\admin\signIn\allSignIn\AllSignChartConfig.js
 */
export const selLineChartOptions = (myChartsData, time = 'week') => {
    let xAxisData = []
    let date = new Date()
    let timeRangeText
    if (time === 'week') {
        timeRangeText = '本周'
        xAxisData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    } else if (time === 'month') {
        timeRangeText = date.getMonth() + 1 + '月'
        for (let i = 0; i < 31; i++) {
            xAxisData.push(`${i + 1}号`);
        }
    } else {
        timeRangeText = date.getFullYear() + '年'
        for (let i = 0; i < 12; i++) {
            xAxisData.push(`${i + 1}月`);
        }
    }
    return {
        title: { text: `${timeRangeText}签到统计`, left: "center" },
        color: ["#3398DB"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "line", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(e) {
                return (
                    `<span style='color:#3db389;display:block'>${e[0].name}</span>${e[0].value}次`
                );
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false, // 使x坐标在不在中间
            data: xAxisData,
            name: '月份'
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: true,
            },
            name: '次数'
        },
        series: [
            {
                data: myChartsData,
                type: "line",
            },
        ],
    }
}
export const selTeamLineChartOptions = (myChartsData, time = 'week') => {
    let xAxisData = []
    let date = new Date()
    let timeRangeText
    console.log(timeRangeText)
    if (time === 'week') {
        timeRangeText = '本周'
        xAxisData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    } else if (time === 'month') {
        timeRangeText = date.getMonth() + 1 + '月'
        for (let i = 0; i < 31; i++) {
            xAxisData.push(`${i + 1}号`);
        }
    } else {
        timeRangeText = date.getFullYear() + '年'
        for (let i = 0; i < 12; i++) {
            xAxisData.push(`${i + 1}月`);
        }
    }
    let legendData = []
    for(let i=0; i< 17; i++) {
        legendData.push(`团队${i+1}`)
    }
    console.log(legendData)
    return  {
        title: {
            text: '团队折线'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#1DA57A'
                }
            }
        },
        legend: {
            data: legendData,
            left:'10%',

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            minInterval:1
        },
        color:['#00FF00',
        '#1DB8AB',
        '#FF8106',
        '#FCC565',
        '#8150C7',
        '#5AAAFA',
        '#F06060',
        '#FFA5B4',
        '#2478B5',
        '#DB6EBA',
        '#EE82EE',
        '#87CEEB',
        '#20B2AA',
        '#40E0D0',
        '#7FFFAA',
        '#0000CD',
        '#191970',
        '#00008B',
        '#00BFFF',
        '#ADD8E6',
        '#DDA0DD',
        '#FF00FF',
        '#E1FFFF',
        '#4B0082',
        '#8A2BE2',
        '#FFF0F5'
    ],
        series: [
            {
                name: '团队1',
                type: 'line',
                data: [10, 5, 6,7, 8, 9, 0],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队2',
                type: 'line',
                data: [20, 5, 15,9, 8, 3, 10],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队3',
                type: 'line',
                data: [3, 0, 6,7, 0, 10, 0],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队4',
                type: 'line',
                data: [2, 6, 9,12, 8, 13, 0],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队5',
                type: 'line',
                data: [6, 7, 6,12, 9, 3, 13],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },

            {
                name: '团队6',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 2],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队7',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 1],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队8',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 3],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队9',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 2],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队10',
                type: 'line',
                data: [3, 0, 6,8, 0, 6, 5],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队11',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 6],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队12',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 8],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队13',
                type: 'line',
                data: [3, 0, 6,8, 0, 6, 9],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队14',
                type: 'line',
                data: [3, 0, 6,0, 8, 6, 10],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队15',
                type: 'line',
                data: [3, 0, 6,8, 8, 6, 0],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队16',
                type: 'line',
                data: [3, 0, 6,8, 10, 0, 18],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队17',
                type: 'line',
                data: [3, 5, 6,8, 8, 6, 18],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
        ]
    }
}