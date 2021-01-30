<!--
 * @Author: lts
 * @Date: 2021-01-18 17:12:38
 * @LastEditTime: 2021-01-30 14:14:49
 * @FilePath: \active-center-client\src\views\index\notification\Notification.vue
-->
<template>
  <div>
    <a-row type="flex" justify="space-between" class="notification_box">
      <a-col
        class="notification notification_one"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="9"
        :xl="9"
      >
        <span>
          <div>
            <a-divider type="vertical" />
            <span>公告栏 </span>
          </div>
          <NotificationOutlined />
        </span>
        <a-divider />

        <div class="notification_content">
          欢迎进入软件学院大学生创新创业基地！
        </div>
      </a-col>
      <a-col class="notification" :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <span>
          <div>
            <a-divider type="vertical" />
            <span>签到数据栏 </span>
          </div>
          <NotificationOutlined />
        </span>
        <a-divider />
        <div class="notification_content">
          <a-spin :spinning="loading">
            <a-tabs
              default-active-key="1"
              tab-position="bottom"
              @change="handleChange"
            >
              <a-tab-pane tab="折线图" key="1" forceRender>
                <div
                  ref="indexChart"
                  :style="{ width: '100%', height: '300px' }"
                ></div>
              </a-tab-pane>
              <a-tab-pane tab="饼图" key="2" forceRender>
                <div
                  ref="test"
                  :style="{ width: '100%', height: '300px' }"
                ></div>
              </a-tab-pane>
            </a-tabs>
          </a-spin>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import { NotificationOutlined } from "@ant-design/icons-vue";
import "./Notification.less";
import axios from "../../../api";
import { getFirstAndEndDayOfWeek } from "../../../utils/getStartAndEndUtil";
import { ErrorNotification } from "../../../utils/warnning";
import { barChartOptions } from "./chartOptions";
export default {
  name: "Notification",
  components: {
    NotificationOutlined,
  },
  setup() {
    let loading = ref(true);
    let indexChart = ref(null);
    let test = ref(null);
    const handleChange = () => {
      // console.log(e);
    };
    onMounted(async () => {
      loading.value = true;
      let barChart = echarts.init(indexChart.value);
      const { startTime, endTime } = getFirstAndEndDayOfWeek();
      try {
        const resChartData = await axios("/sign/time", {
          params: {
            start: startTime,
            end: endTime,
          },
        });
        const { count_list } = resChartData.data;
        barChart.setOption(barChartOptions(count_list));
        loading.value = false;
      } catch (error) {
        ErrorNotification("错误", "网络问题");
        loading.value = false;
      }
      //需要获取到element,所以是onMounted的Hook
      let myChart2 = echarts.init(test.value);
      // console.log(indexChart.value);
      // console.log(test.value);
      // 绘制图表
      myChart2.setOption({
        backgroundColor: "#2c343c",

        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function () {
              return Math.random() * 200;
            },
          },
        ],
      });

      window.onresize = function () {
        //自适应大小
        barChart.resize();
        myChart2.resize();
      };
    });
    return {
      handleChange,
      indexChart,
      test,
      loading,
    };
  },
};
</script>