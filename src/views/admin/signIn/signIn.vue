<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:18
 * @LastEditTime: 2021-01-18 09:25:00
 * @FilePath: \active-center-client\src\views\admin\signIn\signIn.vue
-->
<template>
  <div>
    <div id="myChart" :style="{ width: '600px', height: '600px' }"></div>
  </div>
</template>
<script>
import { inject, onMounted } from "vue";
export default {
  name: "SignIn",
  setup() {
    let echarts = inject("ec"); //引入
    console.log(echarts)
    onMounted(() => {
      //需要获取到element,所以是onMounted的Hook
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "总用户量" },
        tooltip: {},
        xAxis: {
          data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
        },
        yAxis: {},
        series: [
          {
            name: "用户量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
      window.onresize = function () {
        //自适应大小
        myChart.resize();
      };
    });
  },
  components: {},
  mounted() {},
};
</script>