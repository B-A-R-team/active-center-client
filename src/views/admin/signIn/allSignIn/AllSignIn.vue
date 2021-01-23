<!--
 * @Author: lts
 * @Date: 2021-01-20 18:26:19
 * @LastEditTime: 2021-01-23 17:34:58
 * @FilePath: \active-center-client\src\views\admin\signIn\allSignIn\AllSignIn.vue
-->
<template>
  <div>
    <a-row type="flex" justify="space-between" class="all_sign_one">
      <a-col :sm="24" :md="8" :xl="5" :style="{ height: '450px' }">
        <a-card title="今日活动中心签到数" class="all_card_left">
          <template #extra>
            <a-tooltip>
              <template #title> 今天活动中心所有人签到总数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">
            目前
            <span>100人</span>
            完成签到
          </div>
          <div
            ref="allSignInPie"
            :style="{ width: '100%', height: '100%', minHeight: '270px' }"
          ></div>
          <div class="card_footer">
            <a-tag color="orange"> 努力多一点点，收获多一点点 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="15" :xl="18" :style="{ height: '450px' }">
        <a-card class="all_card_right">
          <template #title>
            <span :style="{ marginRight: '10px' }">本周活动中心签到</span>
            <a-tooltip>
              <template #title> 本周活动中心所有人签到总数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <template #extra>
            <div class="extra_item">
              <a
                :class="{ active: item.key === activeKey }"
                v-for="item in extraConfig"
                @click="handleClickItem(item.key)"
                :key="item.key"
                >{{ item.value }}</a
              >
            </div>
            <a-range-picker
              v-model:value="selectTime"
              @change="timeChange"
              :style="{ width: '256px', display: 'inline-block' }"
              :placeholder="['开始日期', '结束日期']"
            />
          </template>

          <div
            ref="allSignSelLine"
            :style="{
              width: '100%',
              maxWidth: '1150px',
              height: '100%',
              minHeight: '330px',
            }"
          ></div>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-between" class="all_sign_two">
      <a-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <a-card>
          <template #title>
            <span :style="{ marginRight: '10px' }">团队签到</span>
            <a-tooltip>
              <template #title> 团队签到</template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <template #extra>
            <div class="extra_item">
              <a
                :class="{ active: item.key === activeTeamKey }"
                v-for="item in extraConfig"
                @click="handleClickTeamItem(item.key)"
                :key="item.key"
                >{{ item.value }}</a
              >
            </div>
            <a-range-picker
              v-model:value="selectTime"
              @change="timeChange"
              :style="{ width: '180px', display: 'inline-block' }"
              :placeholder="['开始日期', '结束日期']"
            />
          </template>
          <div
            ref="allSignSelTeamLine"
            :style="{
              width: '100%',
              height: '630px',
            }"
          ></div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="6" :xl="6">
        <a-card>
          <template #title>
            <span :style="{ marginRight: '10px' }">个人签到</span>
            <a-tooltip>
              <template #title> 本周活动中心所有人签到总数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <template #extra> </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import "./AllSignIn.less";
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import {
  selLineChartOptions,
  selTeamLineChartOptions,
} from "./AllSignChartConfig";
export default {
  name: "AllSignIn",
  components: {
    InfoCircleOutlined,
  },
  setup() {
    let extraConfig = [
      { key: "week", value: "本周" },
      { key: "month", value: "本月" },
      { key: "year", value: "本年" },
    ];
    let activeKey = ref("week");
    let activeTeamKey = ref("week");
    let selectTime = ref();
    let allSignInPie = ref(null);
    let allSignSelLine = ref(null);
    let allSignSelTeamLine = ref(null);

    let selLineChart;
    let selTeamLineChart;
    onMounted(() => {
      let pieCharts = echarts.init(allSignInPie.value);
      selLineChart = echarts.init(allSignSelLine.value);
      selTeamLineChart = echarts.init(allSignSelTeamLine.value);
      pieCharts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: ["签到", "未签到"],
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
              { value: 200, name: "签到" },
              { value: 100, name: "未签到" },
            ],
          },
        ],
      });
      const resChartsData = [200, 10, 50, 40, 60, 40, 70, 60];
      selLineChart.setOption(selLineChartOptions(resChartsData));
      selTeamLineChart.setOption(selTeamLineChartOptions(resChartsData));
      window.onresize = function () {
        pieCharts.resize();
        selLineChart.resize();
        selTeamLineChart.resize();
      };
    });
    const handleClickItem = (key) => {
      if (key === extraConfig[0].key) {
        console.log(1);
        const resChartsData = [200, 10, 50, 40, 60, 40, 70, 60];
        selLineChart.setOption(selLineChartOptions(resChartsData, key));
      } else if (key === extraConfig[1].key) {
        const resChartsData = [200, 10, 50, 40, 60, 40, 70, 60];
        selLineChart.setOption(selLineChartOptions(resChartsData, key));
      } else {
        const resChartsData = [200, 10, 50, 40, 60, 40, 70, 60];
        selLineChart.setOption(selLineChartOptions(resChartsData, key));
      }
      activeKey.value = key;
    };

    const handleClickTeamItem = (key) => {
      console.log(key);
      console.log(selTeamLineChart);
      activeTeamKey.value = key;
    };
    const timeChange = (e) => {
      console.log(e);
      console.log(selLineChart);
    };
    return {
      allSignInPie,
      activeKey,
      handleClickItem,
      extraConfig,
      selectTime,
      timeChange,
      allSignSelLine,
      handleClickTeamItem,
      activeTeamKey,
      allSignSelTeamLine,
    };
  },
};
</script>