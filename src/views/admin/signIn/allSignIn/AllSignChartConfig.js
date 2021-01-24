/*
 * @Author: lts
 * @Date: 2021-01-23 11:39:40
 * @LastEditTime: 2021-01-24 15:42:58
 * @FilePath: \active-center-client\src\views\admin\signIn\allSignIn\AllSignChartConfig.js
 */
export const signInPie = () => {
    return {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
            data: ["签到", "未签到"],
        },
        color: [
            '#F06060',
            '#20B2AA',
        ],
        series: [
            {
                name: "签到数据",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "30",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 200, name: "签到" },
                    { value: 100, name: "未签到" },
                ],
            },
        ],
    }
}

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
        color: ['#FF8106'],
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
            console.log(timeRangeText)

        }
    }
    let legendData = []
    for (let i = 0; i < 17; i++) {
        legendData.push(`团队${i + 1}`)
    }
    return {
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
            left: '10%',

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
            minInterval: 1
        },
        color: ['#00FF00',
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
                data: [0, 2, 5, 7, 8, 9, 15],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队2',
                type: 'line',
                data: [1, 3, 6, 2, 10, 11, 13],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队3',
                type: 'line',
                data: [2, 5, 4, 7, 10, 15, 14],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队4',
                type: 'line',
                data: [6, 10, 9, 15, 16,18, 19],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队5',
                type: 'line',
                data: [3, 6, 9, 7, 8, 8, 8],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },

            {
                name: '团队6',
                type: 'line',
                data: [2, 5, 5, 6, 7, 8, 9],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队7',
                type: 'line',
                data: [3, 6, 6, 7, 7, 10, 5],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队8',
                type: 'line',
                data: [2, 5, 5, 15, 16, 13, 14],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队9',
                type: 'line',
                data: [5, 7, 9, 10, 8, 8, 8],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队10',
                type: 'line',
                data: [1, 1, 2, 2, 4, 4, 5],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队11',
                type: 'line',
                data: [3, 6, 6, 7, 7, 8, 9],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队12',
                type: 'line',
                data: [1, 5, 7, 8, 12, 13, 14],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队13',
                type: 'line',
                data: [3, 5, 6, 8, 6, 7, 6],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队14',
                type: 'line',
                data: [2, 1, 3, 1, 3, 5, 7],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队15',
                type: 'line',
                data: [2, 3, 4, 5, 6, 9, 8],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队16',
                type: 'line',
                data: [5, 6, 6, 8, 9, 6, 10],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
            {
                name: '团队17',
                type: 'line',
                data: [3, 5, 6, 8, 8, 6, 10],
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
            },
        ]
    }
}