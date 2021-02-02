/*
 * @Author: lts
 * @Date: 2021-01-23 11:39:40
 * @LastEditTime: 2021-01-28 20:27:31
 * @FilePath: \active-center-client\src\views\admin\signIn\allSignIn\AllSignChartConfig.js
 */
import { daysChangeMonthsArr } from '../../../../utils/timeUtil'
/**
 * @description: 在所有人中格式化数据
 * @param {*data} everyMonthTotal
 * @return {*格式化的data}
 */
const everyMonthTotal = (data) => {
    let myArr = []
    data.forEach(item => {
        let temp = 0
        for (let i = 0; i < item.length; i++) {
            temp += item[i].count
        }
        myArr.push(temp)
    })
    return myArr
}

/**
 * @description: 在团队charts中格式化数据
 * @param {*data} everyMonthTotalTeam
 * @return {*格式化的data}
 */
const everyMonthTotalTeam = (data) => {
    let myArr = data.map(item => {
        return item.reduce(function (accumulator, currentValue) {
            return parseInt(accumulator) + parseInt(currentValue);
        });
    })
    return myArr
}

/**
 * @description: 饼图的配置项
 * @param {*} signInPie
 * @return {*返回配置项}
 */
export const signInPie = (signInCount,notSingInCount) => {
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
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
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
                    { value: signInCount, name: "签到" },
                    { value: notSingInCount, name: "未签到" },
                ],
            },
        ],
    }
}

/**
 * @description: 团队所有人折线图
 * @param {myChartsData:后台拿到的数据，time:请求时间段} selLineChartOptions
 * @return {*配置项}
 */
export const selLineChartOptions = (myChartsData, time = 'week') => {
    let xAxisData = []
    let date = new Date()
    let timeRangeText
    //处理数据
    let allPeopleData = [];
    if (time !== 'year') {
        myChartsData.forEach((item) => {
            allPeopleData.push(item.count);
        });
    } else {
        let data = daysChangeMonthsArr(myChartsData)
        console.log(data)
        allPeopleData = everyMonthTotal(data)
    }

    if (time === 'week') {
        timeRangeText = '本周'
        xAxisData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    } else if (time === 'month') {
        timeRangeText = date.getMonth() + 1 + '月'
        for (let i = 0; i < 31; i++) {
            xAxisData.push(`${i + 1}号`);
        }
    } else if(time === 'year'){
        timeRangeText = date.getFullYear() + '年'
        for (let i = 0; i < 12; i++) {
            xAxisData.push(`${i + 1}月`);
        }
    } else {
        timeRangeText = '时间段'
        myChartsData.forEach((item) => {
            xAxisData.push(item.date);
        });
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
        toolbox: {
            feature: {
                saveAsImage: {}
            }
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
                data: allPeopleData,
                type: "line",
            },
        ],
    }
}

/**
 * @description: 团队折线图
 * @param {myChartsData:后台拿到的数据，time:请求时间段} selTeamLineChartOptions
 * @return {echarts配置项}
 */
export const selTeamLineChartOptions = (myChartsData, time = 'week',date_list) => {
    let legendData = []
    if (time !== 'year') {
        myChartsData.forEach((item) => {
            legendData.push(item.name)
            item.type = 'line'
            item.data = item.chartData
            item.smooth = true
            item.emphasis = {}
            item.emphasis.focus = 'series'
            delete item.chartData
            delete item.id
        })
    } else {
        myChartsData.forEach(item => {
            let tempData = daysChangeMonthsArr(item.chartData)
            let data = everyMonthTotalTeam(tempData)
            legendData.push(item.name)
            item.type = 'line'
            item.data = data
            item.smooth = true
            item.emphasis = {}
            item.emphasis.focus = 'series'
            delete item.chartData
            delete item.id
        })
    }

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
    } else if (time === 'year'){
        timeRangeText = date.getFullYear() + '年'
        for (let i = 0; i < 12; i++) {
            xAxisData.push(`${i + 1}月`);
            console.log(timeRangeText)
        }
    } else {
        console.log('selTime')
        xAxisData = date_list
        // changeDayTimeArr(startAndEndTime)

    }
    // console.log(xAxisData)
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
            data: xAxisData
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
        series: myChartsData
    }
}

