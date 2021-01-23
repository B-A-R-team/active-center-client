/*
 * @Author: lts
 * @Date: 2021-01-21 20:50:10
 * @LastEditTime: 2021-01-23 19:47:38
 * @FilePath: \active-center-client\src\views\admin\signIn\personSignIn\personChartsConfig.js
 */
import { BASR_TIME, FORMAT_DATA } from '../../../../utils/constantsUtil'
import moment from 'moment'

/**
 * @description: 用于生成week的echarts的配置项
 * @param {resChartsData 表格数据, resXAxis 横坐标} weekChartOptions
 * @return {echarts配置项}
 */
export const weekAndMonthChartOptions = (resChartsData, resXAxis, timeRangeText) => {
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
                    `<span style='color:#3db389;display:block'>${e[0].name}</span> ` +
                    resChartsData[timeItem]
                );
            },
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
    // console.log(xAxisData)
    return {
        title: { text: `${new Date().getFullYear()}签到统计`, left: "center" },
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