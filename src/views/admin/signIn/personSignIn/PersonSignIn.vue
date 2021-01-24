<!--
 * @Author: lts
 * @Date: 2021-01-20 18:26:39
 * @LastEditTime: 2021-01-24 21:05:01
 * @FilePath: \active-center-client\src\views\admin\signIn\personSignIn\PersonSignIn.vue
-->
<template>
  <div>
    <a-row type="flex" justify="space-between" class="sign_info">
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="近七天签到次数" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 七天内的签到的天数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">5次</div>
          <div class="card_footer">
            <a-tag color="orange"> 努力多一点点，收获多一点点 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="签到率" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 七天内的签到率 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">50%</div>
          <div class="card_footer">
            <a-tag color="blue"> 有所进步哦 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="最早签到时间" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 七天内的中的最早的签到时间 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">8:10</div>
          <div class="card_footer">
            <a-tag color="pink"> 加油 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="最晚签到时间" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 七天内的最晚的签到时间 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">9:50</div>

          <div class="card_footer">
            <a-tag color="green"> 天道酬勤 </a-tag>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="start" class="echarts_sign">
      <a-col :span="24">
        <a-card style="width: 100%">
          <template #title>
            <span>个人签到情况表</span>
            <a-tooltip>
              <template #title>
                默认展示本周的签到情况表，可以快捷选择本月，本年签到表，也可以查看自定义时间的图表。
              </template>
              <a><InfoCircleOutlined :style="{ marginLeft: '10px' }" /></a>
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
            ref="perSignInCharts"
            :style="{ width: '100%', height: '400px',minWidth:'500px' }"
          ></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import "./PersonSignIn.less";
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import moment from "moment";
import {
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getFirstDayOfYear,
} from "../../../../utils/timeUtil";
import { FORMAT_DATA } from "../../../../utils/constantsUtil";
import {
  weekAndMonthChartOptions,
  yearChartOptions,
} from "./personChartsConfig";
export default {
  name: "PersonSignIn",
  components: {
    InfoCircleOutlined,
  },

  setup() {
    // 选项配置
    let extraConfig = [
      { key: "week", value: "本周" },
      { key: "month", value: "本月" },
      { key: "year", value: "本年" },
    ];
    // echarts 节点
    const perSignInCharts = ref(null);
    let perEcharts = "";
    // 激活样式
    let activeKey = ref("week");
    let loading = ref(true);
    // dataPicker
    let selectTime = ref();
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    onMounted(() => {
      let resChartsData = [
        "2021-1-21 06:38",
        "2021-1-22 07:38",
        "2021-1-23 09:38",
        "2021-1-24 14:38",
        "2021-1-25 10:38",
        "2021-1-26 06:38",
        "2021-1-27 23:38",
      ];
      let resXAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      perEcharts = echarts.init(perSignInCharts.value);
      perEcharts.setOption(
        weekAndMonthChartOptions(resChartsData, resXAxis, "本周")
      );
      window.addEventListener('load', function() {
        perEcharts.resize();
      })
      window.addEventListener('resize' ,function() {
        perEcharts.resize();

      })
      // window.onresize = function () {
      //   //自适应大小
      //   // console.log()
      //   perEcharts.resize();
      // };
    });
    const timeChange = () => {};
    const handleClickItem = (key) => {
      let time = moment(new Date().getTime()).format(FORMAT_DATA);
      if (key === extraConfig[0].key) {
        const monday = getFirstDayOfWeek();
        console.log(monday);
        console.log(time);
        let resChartsData = [
          "2021-01-21 14:38",
          "2021-01-22 09:38",
          "2021-01-23 22:38",
          "2021-01-24 00:38",
          "2021-01-25 10:38",
          "2021-01-26 23:38",
          "2021-01-27 00:38",
        ];
        let resXAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        perEcharts.setOption(
          weekAndMonthChartOptions(resChartsData, resXAxis, "本周")
        );
      } else if (key === extraConfig[1].key) {
        const monthFirstDay = getFirstDayOfMonth();
        console.log(monthFirstDay);
        let ChartsData = [
          "2021-11-18 06:38",
          "2021-11-18 09:38",
          "2021-11-20 10:45",
          "2021-11-21 11:35",
          "2021-11-25 15:18",
          "2021-11-27 22:48",
          "2021-11-29 23:38",
        ];
        let resXAxis = [];
        for (let i = 0; i < 31; i++) {
          // let j = i
          resXAxis.push(`${i + 1}号`);
        }
        perEcharts.setOption(
          weekAndMonthChartOptions(
            ChartsData,
            resXAxis,
            `${new Date().getMonth() + 1}月`
          )
        );
      } else {
        const yearFirstDay = getFirstDayOfYear();
        console.log(yearFirstDay);
        let ChartsData = [20, 11, 2, 0, 15, 30, 1, 3, 5, 6, 8, 1];
        perEcharts.setOption(yearChartOptions(ChartsData));
      }

      // console.log(time);

      // console.log(key);
      activeKey.value = key;
    };
    return {
      loading,
      timeChange,
      selectTime,
      perSignInCharts,
      extraConfig,
      handleClickItem,
      activeKey,
    };
  },
};
</script>
<style lang="less" scoped>
.ant-layout-content {
  padding: 0 !important;
}
</style>