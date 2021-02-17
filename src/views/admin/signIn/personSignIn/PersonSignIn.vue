<!--
 * @Author: lts
 * @Date: 2021-01-20 18:26:39
 * @LastEditTime: 2021-02-07 16:00:57
 * @FilePath: \active-center-client\src\views\admin\signIn\personSignIn\PersonSignIn.vue
-->
<template>
  <div>
    <a-row type="flex" justify="space-between" class="sign_info">
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="本周签到次数" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 本周的签到的天数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">{{ signInfo.signCount }}次</div>
          <div class="card_footer">
            <a-tag color="orange"> 努力多一点点，收获多一点点 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="签到率" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 本周的签到率 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">{{ signInfo.signRate }}</div>
          <div class="card_footer">
            <a-tag color="blue"> 有所进步哦 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="最早签到时间" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 本周最早的签到时间 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">{{ signInfo.earlyTime }}</div>
          <div class="card_footer">
            <a-tag color="pink"> 加油 </a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <a-card title="最晚签到时间" :loading="loading">
          <template #extra>
            <a-tooltip>
              <template #title> 本周最晚的签到时间 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">{{ signInfo.lastTime }}</div>

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
            <a-tooltip>
              <template #title> 刷新 </template>
              <a @click="refresh">
                <RedoOutlined
                  :style="{ marginLeft: '10px' }"
                  :spin="lineLoading"
              /></a>
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
          <a-spin :spinning="lineLoading">
            <div
              ref="perSignInCharts"
              :style="{ width: '100%', height: '400px', minWidth: '500px' }"
            ></div>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { InfoCircleOutlined, RedoOutlined } from "@ant-design/icons-vue";

import "./PersonSignIn.less";
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import {
  getFirstAndEndDayOfYear,
  getFirstAndEndDayOfWeek,
  getFirstAndEndDayOfMonth,
  //  getFirstAndEndDayOfMonth
} from "../../../../utils/getStartAndEndUtil";
import {
  weekAndMonthChartOptions,
  yearChartOptions,
} from "./personChartsConfig";
import axios from "../../../../api";
import { getPerSignInfo } from "./getPerSign.js";

export default {
  name: "PersonSignIn",
  components: {
    InfoCircleOutlined,
    RedoOutlined,
  },
  props: {
    allSignInFlag: Boolean,
    id: Number,
  },
  setup(props) {
    let signInfo = reactive({
      signCount: "0",
      signRate: "",
      earlyTime: "",
      lastTime: "",
    });
    // console.log(props, props.allSignInFlag,props.id);
    let lineLoading = ref(true);
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
    let userId = 0;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    onMounted(async () => {
      if (!props.allSignInFlag) {
        userId = JSON.parse(localStorage.getItem("userInfo")).id;
      } else {
        userId = props.id;
      }
      const { startTime, endTime } = getFirstAndEndDayOfWeek();
      const res = await axios("/sign/time", {
        params: {
          start: startTime,
          end: endTime,
          user_id: userId,
        },
      });
      let { signCount, signRate, earlyTime, lastTime } = getPerSignInfo(
        res.data.user_sign
      );
      signInfo.signCount = signCount;
      signInfo.signRate = signRate;
      signInfo.earlyTime = earlyTime;
      signInfo.lastTime = lastTime;

      let resXAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      perEcharts = echarts.init(perSignInCharts.value);
      perEcharts.setOption(
        weekAndMonthChartOptions(res.data.user_sign, resXAxis, "本周")
      );
      lineLoading.value = false;
      window.addEventListener("load", function () {
        perEcharts.resize();
      });
      window.addEventListener("resize", function () {
        perEcharts.resize();
      });
    });
    const timeChange = async (e, time) => {
      activeKey.value = "selTime";
      if (e.length > 0) {
        lineLoading.value = true;
        console.log(e);
        console.log(time);
        const res = await axios("/sign/time", {
          params: {
            start: time[0],
            end: time[1],
            user_id: userId,
          },
        });
        let resXAxis = res.data.date_list;
        perEcharts.setOption(
          weekAndMonthChartOptions(res.data.user_sign, resXAxis, time)
        );
        lineLoading.value = false;
      }
    };
    const handleClickItem = async (key) => {
      activeKey.value = key;
      lineLoading.value = true;
      if (key === extraConfig[0].key) {
        const { startTime, endTime } = getFirstAndEndDayOfWeek();
        const res = await axios("/sign/time", {
          params: {
            start: startTime,
            end: endTime,
            user_id: userId,
          },
        });

        let resXAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        perEcharts.setOption(
          weekAndMonthChartOptions(res.data.user_sign, resXAxis, "本周")
        );
      } else if (key === extraConfig[1].key) {
        const { startTime, endTime } = getFirstAndEndDayOfMonth();
        const res = await axios("/sign/time", {
          params: {
            start: startTime,
            end: endTime,
            user_id: userId,
          },
        });
        let resXAxis = res.data.date_list;
        perEcharts.setOption(
          weekAndMonthChartOptions(
            res.data.user_sign,
            resXAxis,
            `${new Date().getMonth() + 1}月`
          )
        );
      } else {
        const { startTime, endTime } = getFirstAndEndDayOfYear();
        const resData = await axios("/sign/time", {
          params: {
            start: startTime,
            end: endTime,
            user_id: userId,
          },
        });
        perEcharts.setOption(yearChartOptions(resData.data.user_sign));
      }
      lineLoading.value = false;
    };
    const refresh = async () => {
      lineLoading.value = true;
      activeKey.value = "week";
      const { startTime, endTime } = getFirstAndEndDayOfWeek();
      const res = await axios("/sign/time", {
        params: {
          start: startTime,
          end: endTime,
          user_id: userId,
        },
      });
      let resXAxis = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      perEcharts.setOption(
        weekAndMonthChartOptions(res.data.user_sign, resXAxis, "本周")
      );
      lineLoading.value = false;

    };
    return {
      loading,
      timeChange,
      selectTime,
      perSignInCharts,
      extraConfig,
      handleClickItem,
      activeKey,
      lineLoading,
      signInfo,
      refresh,
    };
  },
};
</script>
<style lang="less" scoped>
.ant-layout-content {
  padding: 0 !important;
}
</style>