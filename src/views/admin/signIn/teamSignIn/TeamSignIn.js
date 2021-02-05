/*
 * @Date: 2021-02-01 21:27:14
 * @Author: smallBlack
 * @LastEditors: smallBlack
 * @LastEditTime: 2021-02-05 18:50:34
 * @FilePath: \active-center-client\src\views\admin\signIn\teamSignIn\TeamSignIn.js
 */

/**
 * @description: 
 * @param {*} teamSignInfo
 * @return {*折线图数据}
 */

export const teamSignInfo = (xAxisData, yAxisData) => {
  return {
          xAxis: {
            name: '日期',
            type: 'category',
            data: xAxisData,
            nameTextStyle: {
              fontWeight: 400,
              fontSize: 16,
            },
            axisTick: {
              alignWithLabel: true,
            }
          },
          yAxis: {
            name: '签到人数',
            type: 'value',
            nameTextStyle: {
              fontWeight: 400,
              fontSize: 16,
            },
            minInterval: 1 // 设置y轴最小刻度
          },
          tooltip: {
            tooltip: 'axis',
            formatter: function (params) {
              return `${params.name} : ${params.value}次`
            }
          },
          series: [{
              data: yAxisData,
              type: 'line',
              smooth: true
          }]
      }
}

export const eventListen = (param) => {
  window.addEventListener("load", function() {
    param.resize();
  });
  window.addEventListener("resize", function() {
    param.resize();
  })
}




