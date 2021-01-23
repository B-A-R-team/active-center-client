<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:18
 * @LastEditTime: 2021-01-20 18:42:39
 * @FilePath: \active-center-client\src\views\admin\signIn\teamSignIn\TeamSignIn.vue
-->
<template>
  <div class="sign_in">
    <div class="tabs">
      <PartText tabsTitle="数据统计" />
      <a-card
        class="card"
        headStyle="font-size:1.2rem;text-align:center"
        v-for="item in signInList"
        :key="item.id"
      >
        <a-card-grid class="card_grid">
          <span>姓名：</span>
          <span>{{ item.userName }}</span>
        </a-card-grid>
        <a-card-grid class="card_grid">
          <span>签到时间：</span>
          <span>{{ item.signInTime }}</span>
        </a-card-grid>
      </a-card>
    </div>
    <div class="data_statistic">
      <PartText tabsTitle="本周数据统计" />
      <div class="button_group">
        <a-button-group>
          <a-button
            @click="toggleDataChart"
            :class="dataChartShow ? 'active' : ''"
            >数据图表</a-button
          >
          <a-button
            @click="toggleDataList"
            :class="dataChartShow ? '' : 'active'"
            >数据列表</a-button
          >
        </a-button-group>
      </div>
      <div class="data_button">
        <div class="data_show">
          <div ref="dataChart" v-show="dataChartShow" class="data_chart"></div>
          <div v-show="!dataChartShow" class="data_list">
            <a-list
              :grid="{ gutter: 16, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }"
              :data-source="data"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-card :title="item.title" style="text-align: center">
                    <span class="sign_in_title">签到人数：</span>
                    <span class="sign_in_number">
                      {{ item.signInNumber }}
                    </span></a-card
                  >
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./teamSignIn.less";
import PartText from "./partText/PartText.vue";
import * as echarts from "echarts";
const chartData = [18, 15, 20, 16, 18, 23, 21];
const data = [
  {
    title: "星期一",
    signInNumber: "",
  },
  {
    title: "星期二",
    signInNumber: "",
  },
  {
    title: "星期三",
    signInNumber: "",
  },
  {
    title: "星期四",
    signInNumber: "",
  },
  {
    title: "星期五",
    signInNumber: "",
  },
  {
    title: "星期六",
    signInNumber: "",
  },
  {
    title: "星期日",
    signInNumber: "",
  },
];
export default {
  name: "TeamSignIn",
  components: {
    PartText,
  },
  data() {
    return {
      teamName: "BARTeam",
      signInList: [
        {
          id: "0",
          userName: "smallBlack",
          signInTime: "2021-01-20 08:22:16",
        },
        {
          id: "1",
          userName: "jackson",
          signInTime: "2021-01-20 08:22:12",
        },
        {
          id: "2",
          userName: "mike",
          signInTime: "2021-01-20 08:22:10",
        }
      ],
      dataChartShow: true,
      chartData,
      data,
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    },
    toggleDataChart() {
      this.dataChartShow = true;
    },
    toggleDataList() {
      this.dataChartShow = false;
    },
    getDataChart() {
      // 初始化柱形图的实例对象
      const dataChart = echarts.init(this.$refs.dataChart);
      // 配置配置项和数据
      const dataChartOption = {
        // x轴
        xAxis: {
          type: "category",
          data: [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日",
          ],
          name: "星期",
          nameTextStyle: {
            fontWeight: 400,
            fontSize: 16,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        // y轴
        yAxis: {
          type: "value",
          name: "签到人数",
          nameTextStyle: {
            fontWeight: 400,
            fontSize: 16,
          },
        },
        grid: {
          x: "3%",
          x2: "25%",
          // right: "10%",
          // bottom: "3%",
          containLabel: true,
        },
        // 鼠标放到图表上的数据展示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认直线，可选：'line' | 'shadow'
          },
        },
        // 加入每个bar的数据
        series: [
          {
            name: "签到人数",
            type: "bar",
            barWidth: "35%",
            data: this.chartData,
            itemStyle: {
              borderRadius: 5,
            },
          },
        ],
      };
      // 将配置项给实例对象，用于数据显示
      dataChart.setOption(dataChartOption);
      window.onresize = function () {
        dataChart.resize();
      };
    },
    getSignInNumber() {
      let chartData = this.chartData;
      this.data.forEach((v,i) => {
        chartData.forEach((item,index) => {
          if(i === index) {
            v.signInNumber = item
          }
        })
      })
    }
  },
  mounted() {
    this.getDataChart();
    this.getSignInNumber();
  },
  computed: {},
};
</script>
<style lang="less" scoped>
</style>
