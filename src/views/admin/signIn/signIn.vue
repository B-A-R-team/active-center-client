<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:18
 * @LastEditTime: 2021-01-16 09:32:14
 * @FilePath: \active-center-client\src\views\admin\signIn\signIn.vue
-->
<template>
  <div class="signIn">
    <div class="TimeChoose">
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['Start Time', 'End Time']"
        @change="onChange"
        @ok="onOk"
      />
      <a-button type="primary" class="search">
        <template #icon><SearchOutlined /></template>查询
      </a-button>
    </div>
    <div id="teamChart"></div>
    <div id="memberChart"></div>
  </div>
</template>
<script>
import "./signIn.less";
import echarts from "echarts";
import { SearchOutlined } from '@ant-design/icons-vue';
export default {
  name: "SignIn",
  components: {
    SearchOutlined
  },
  data() {
    return {
      echartsOption: {
        // 标题
        title: {
          text: "团队签到统计",
          x: "left",
          y: "310",
          left: 150,
        },
        // echarts选项，所有绘图数据和样式都在这里设置
        xAxis: {
          type: "category",
          data: ["A团队", "B团队", "C团队", "D团队"], // x轴数据
          name: "团队", // x轴名称
          nameTextStyle: {
            // x轴名称样式
            fontWeight: 400,
            fontSize: 18,
          },
        },
        yAxis: {
          type: "value",
          name: "签到率", // y轴名称
          nameTextStyle: {
            // y轴名称样式
            fontWeight: 400,
            fontSize: 18,
          },
        },
        tooltip: {
          //鼠标放到图上的数据展示样式
          trigger: "axis",
        },
        // 设置柱状图大小
        grid: {
          x: 100,
          y: 10,
          width: 260,
          height: 260,
        },
        series: [
          {
            //series中加入每个bar的数据
            name: "签到率",
            type: "bar",
            barWidth: "20%",
            data: [0.35, 0.2, 0.25, 0.15],
          },
        ],
      },
      Option: {
        title: {
          text: "×××团队成员签到统计",
          x: "center",
          y: "bottom",
        },
        // echarts选项，所有绘图数据和样式都在这里设置
        legend: {
          //图表上方的图例
          data: ["A同学", "B同学", "C同学", "D同学"],
        },
        tooltip: {
          //鼠标放到图上的数据展示样式
          trigger: "axis",
        },
        series: [
          {
            name: "团队成员签到统计",
            type: "pie",
            barWidth: "60%",
            data: [
              // 扇形图数据格式： {value, name}
              { value: 0.35, name: "A同学" }, // value不一定是比例，echarts会自动转换
              { value: 0.2, name: "B同学" },
              { value: 0.25, name: "C同学" },
              { value: 0.2, name: "D同学" },
            ],
            // 数据百分比
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{b}: ({d}%)", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 15,
                  fontWeight: "bolder",
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    // 团队签到统计
    let team_chart = echarts.init(
      document.getElementById("teamChart"),
      "light"
    ); // 初始化echarts, theme为light
    team_chart.setOption(this.echartsOption); // echarts设置选项
    // 团队内每个成员签到统计
    let member_chart = echarts.init(
      document.getElementById("memberChart"),
      "light"
    ); // 初始化echarts, theme为light
    member_chart.setOption(this.Option); // echarts设置选项
  },
  methods: {
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
  },
};
</script>
<style lang="less" scoped>
</style>