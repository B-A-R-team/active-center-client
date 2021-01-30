/*
 * @Author: lts
 * @Date: 2021-01-30 14:07:11
 * @LastEditTime: 2021-01-30 14:11:06
 * @FilePath: \active-center-client\src\views\index\notification\chartOptions.js
 */
export const barChartOptions = (resData) => {
    console.log(resData)
    let data = []
    resData.forEach(item => {
        data.push(item.count)
    });
    return {
        title: { text: '七天签到统计', left: 'center' },
        color: ["#70f0fc"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: [
            {
                name: "直接访问",
                type: "bar",
                barWidth: "60%",
                data
            },
        ],
    }
}