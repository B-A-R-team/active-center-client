/*
 * @Author: lts
 * @Date: 2021-01-21 20:50:10
 * @LastEditTime: 2021-02-03 18:07:21
 * @FilePath: \active-center-client\src\views\admin\signIn\personSignIn\personChartsConfig.js
 */
import { BASR_TIME, FORMAT_DATA } from '../../../../utils/constantsUtil'
import moment from 'moment'
import { daysChangeMonthsArr, changeDayTimeArr } from '../../../../utils/timeUtil'
import { getFirstAndEndDayOfWeek, getFirstAndEndDayOfMonth } from '../../../../utils/getStartAndEndUtil'
const getMidDate = (flag,arr) => {
    if (flag === 'week') {
        const { startTime, endTime } = getFirstAndEndDayOfWeek()
        return changeDayTimeArr([startTime, endTime])
    } else if (flag === 'month') {
        const { startTime, endTime } = getFirstAndEndDayOfMonth()
        return changeDayTimeArr([startTime, endTime])
    } else {
        return changeDayTimeArr([arr[0], arr[1]])
    }
}

const everyMonthTotal = (data) => {
    let myArr = data.map(item => {
        let i = 0
        item.forEach(item => {
            if (item[0]) {
                i++
            }
        })
        return i
    })
    return myArr
}
/**
 * @description: 用于生成week的echarts的配置项
 * @param {resChartsData 表格数据, resXAxis 横坐标} weekChartOptions
 * @return {echarts配置项}
 */
export const weekAndMonthChartOptions = (resChartsData, resXAxis, timeRangeText) => {
    let tempArr = []
    let tempDate = new Date()
    tempDate.setHours(0, 0, 0, 0)
    const hm = moment(tempDate.getTime()).format(FORMAT_DATA).substr(10)
    if(!Array.isArray(timeRangeText)) {
        if (timeRangeText === '本周') {
            tempArr = getMidDate('week')
        } else {
            tempArr = getMidDate('month')
        }
    } else {
        tempArr = getMidDate('selTime',timeRangeText)
        timeRangeText = `${timeRangeText[0]} 到 ${timeRangeText[1]} `
    }
   

    resChartsData = resChartsData.map((item, index) => {
        if (item[0]) {
            let date = new Date(item[0])
            return (moment(date.getTime()).format(FORMAT_DATA))
        } else {
            return tempArr[index]
        }
    })
    let myChartsData = resChartsData.map((item) => {
        let timeStr = BASR_TIME + " " + item.substr(11);
        return timeStr;
    });
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
                const timeItem = resXAxis.findIndex((item) => item === e[0].name);
                return (
                    `<span style='color:#f5222d;display:block'>${e[0].name}</span> ` +
                    (resChartsData[timeItem].substr(10) === hm ? '当日未签到' : `签到时间:${resChartsData[timeItem].substr(10)}`)
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
            data: resXAxis,
        },
        yAxis: {
            type: "time",
            max: `${BASR_TIME} 23:59`,
            min: `${BASR_TIME} 00:00`,
            show: true,
            splitNumber: 6,
            splitLine: {
                show: true,
            },
            axisLabel: {
                formatter: function (value) {
                    return moment(value).format(FORMAT_DATA).substr(11);
                },
            },
        },
        series: [
            {
                data: myChartsData,
                type: "line",
            },
        ],
    }
}
export const yearChartOptions = (myChartsData) => {
    let xAxisData = []
    for (let i = 0; i < 12; i++) {
        xAxisData.push(`${i + 1}月`);
    }
    let tempData = daysChangeMonthsArr(myChartsData)
    myChartsData = everyMonthTotal(tempData)
    return {
        title: { text: `${new Date().getFullYear()}年签到统计`, left: "center" },
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
            name: '次数',
            minInterval: 1
        },
        series: [
            {
                data: myChartsData,
                type: "line",
            },
        ],
    }
}


// const failEveryMonthTotal = (data) => {
//     console.log(data)
//     let myArr = data.map(item => {
//         return item.reduce(function (accumulator, currentValue) {
//             return parseInt(accumulator) + parseInt(currentValue);
//         });
//     })
//     return myArr
// }