/*
 * @Author: wpq 
 * @Date: 2021-04-05 18:17:46 
 * @Last Modified by: wpq
 * @Last Modified time: 2021-04-05 18:20:08
 */

export const signTotalInfo = (xAxisData, yAxisData) => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['已签到', '未签到']
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        xAxis: [{
                type: 'category',
                data: xAxisData,
                nameTextStyle: {
                    fontWeight: 400,
                    fontSize: 16,
                },
                axisTick: {
                    alignWithLabel: true,
                }
            }

        ],
        yAxis: [{
            type: 'value',
            data: yAxisData,
            nameTextStyle: {
                fontWeight: 400,
                fontSize: 16,
            },
        }],
        series: [{
                name: '已签到',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: yAxisData,
            },
            {
                name: '未签到',
                type: 'bar',
                stack: '广告',
                emphasis: {
                    focus: 'series'
                },
                data: yAxisData,
            },
        ]
    }
}
export const eventListen = (param) => {
    window.addEventListener("load", function () {
        param.resize();
    });
    window.addEventListener("resize", function () {
        param.resize();
    })
}