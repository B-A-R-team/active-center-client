<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:18
 * @LastEditTime: 2021-03-02 10:08:21
 * @FilePath: \active-center-client\src\views\admin\signIn\teamSignIn\TeamSignIn.vue
-->

<template>
  <div class="sign_in">
    <div class="tabs">
      <PartText :tabsTitle="teamTodaySignInfo" />
      <div class="card_box">
        <a-empty v-show="emptyShow" class="empty_container" />
        <a-card class="card" v-show="!emptyShow">
          <a-card-grid
            class="card_grid_wrap"
            v-for="item in signInList"
            :key="item.user_id"
          >
            <p class="card_grid_container">
              <span class="span_title">姓名：</span>
              <span class="span_content">{{ item.user_name }}</span>
            </p>
            <p class="card_grid_container">
              <span class="span_title">签到时间：</span>
              <span class="span_content">{{ item.sign_time }}</span>
            </p>
          </a-card-grid>
        </a-card>
      </div>
    </div>
    <div class="data_statistic">
      <div class="query_team_info">
        <div class="choose_time">
          <PartText :tabsTitle="chooseTimeTitle" />
          <a-range-picker
            class="time_change"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始日期', '结束日期']"
            @change="getTeamInfo"
            v-if="activeKey === 'anytime'"
          />
        </div>
        <a-button-group>
          <a-button
            v-for="item in dataChange"
            :class="{ active: activeKey === item.key }"
            :key="item.key"
            @click="handleItemClick(item.key)"
            >{{ item.value }}</a-button
          >
        </a-button-group>
        <div style="width: 100%; height: 30rem">
          <div
            ref="weekTeamSignInfo"
            style="width: 100%; height: 30rem"
            :key="activeKey"
          ></div>
          <div
            ref="monthTeamSignInfo"
            style="width: 100%; height: 30rem; margin-top: -30rem"
            :key="activeKey"
          ></div>
          <div
            ref="yearTeamSignInfo"
            style="width: 100%; height: 30rem; margin-top: -30rem"
            :key="activeKey"
          ></div>
          <div
            ref="anyTimeTeamSignInfo"
            style="width: 100%; height: 30rem; margin-top: -30rem"
            :key="activeKey"
          >
            <a-empty
              description="请您选择需要查询数据的时间段"
              style="
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
              v-if="activeKey === 'anytime'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./TeamSignIn.less";
import PartText from "./partText/PartText.vue";
import * as echarts from "echarts";
import axios from "../../../../api";
import moment from "moment";
import { FORMAT_DATA } from "../../../../utils/constantsUtil.js";
import { daysChangeMonthsArr } from "../../../../utils/timeUtil";
import {
  getFirstAndEndDayOfWeek,
  getFirstAndEndDayOfMonth,
  getFirstAndEndDayOfYear,
} from "../../../../utils/getStartAndEndUtil.js";
import { teamSignInfo, eventListen } from "./TeamSignIn.js";
const dataChange = [
  { key: "week", value: "本周" },
  { key: "month", value: "本月" },
  { key: "year", value: "本年" },
  { key: "anytime", value: "时间段查询" },
];
const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
const teamId = userInfo.team_id;
const dateList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
  name: "TeamSignIn",
  components: {
    PartText,
  },
  data() {
    return {
      chooseTimeTitle: "查询团队签到信息",
      signInList: [],
      emptyShow: true,
      teamTodaySignInfo: "",
      teamId,
      dataChange,
      dateList,
      activeKey: dataChange[0].key,
    };
  },
  mounted() {
    this.getTeamTodaySignInfo();
    this.getTeamWeekSignInfo();
  },
  methods: {
    // 团队当天签到信息统计
    async getTeamTodaySignInfo() {
      const { data } = await axios.get(`sign/team/${this.teamId}?type=today`);

      if (data.length === 0) {
        this.emptyShow = true;
      } else {
        this.emptyShow = false;
        data.forEach((v) => {
          v.sign_time = moment().format(FORMAT_DATA);
        });
        this.teamTodaySignInfo = data.name;
        this.signInList = data;
      }
    },
    // 团队本周、本月、本年的签到信息
    async handleItemClick(itemKey) {
      try {
        let param;
        for (let i = 0; i < this.dataChange.length; i++) {
          if (this.dataChange[i].key === itemKey) {
            this.activeKey = this.dataChange[i].key;
            if (itemKey === this.dataChange[0].key) {
              param = getFirstAndEndDayOfWeek();
            } else if (itemKey === this.dataChange[1].key) {
              param = getFirstAndEndDayOfMonth();
            } else if (itemKey === this.dataChange[2].key) {
              param = getFirstAndEndDayOfYear();
            } else {
              param = "";
            }
          }
        }
        const { startTime, endTime } = param;
        const { data } = await axios.get("sign/time", {
          params: {
            start: startTime,
            end: endTime,
            team_id: this.teamId,
          },
        });
        const { team_sign, date_list } = data;
        let chartData = [];
        team_sign.forEach((v) => {
          if (v.id === this.teamId) {
            chartData = v.chartData;
          }
        });
        if (this.activeKey === this.dataChange[0].key) {
          let chartDataParam = echarts.init(this.$refs.weekTeamSignInfo);
          const option = teamSignInfo(this.dateList, chartData);
          chartDataParam.setOption(option);
          eventListen(chartDataParam);
        } else if (this.activeKey === this.dataChange[1].key) {
          let chartDataParam = echarts.init(this.$refs.monthTeamSignInfo);
          const option = teamSignInfo(date_list, chartData);
          chartDataParam.setOption(option);
          eventListen(chartDataParam);
        } else if (this.activeKey === this.dataChange[2].key) {
          let chartDataParam = echarts.init(this.$refs.yearTeamSignInfo);
          let everyMonthDateList = daysChangeMonthsArr(date_list);
          let monthChartData = daysChangeMonthsArr(chartData);
          let evertMonthChartDataAll = [];
          monthChartData.forEach((v) => {
            evertMonthChartDataAll.push(v.reduce((pre, cur) => pre + cur));
          });
          let monthDate = [];
          for (let i = 0; i < everyMonthDateList.length; i++) {
            monthDate.push(`${i + 1}月`);
          }
          const option = teamSignInfo(monthDate, evertMonthChartDataAll);
          chartDataParam.setOption(option);
          eventListen(chartDataParam);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTeamWeekSignInfo() {
      const { startTime, endTime } = getFirstAndEndDayOfWeek();
      const { data } = await axios.get("sign/time", {
        params: {
          start: startTime,
          end: endTime,
          team_id: this.teamId,
        },
      });
      const { team_sign } = data;
      let chartData = [];
      team_sign.forEach((v) => {
        if (v.id === this.teamId) {
          chartData = v.chartData;
        }
      });
      let weekChartData = echarts.init(this.$refs.weekTeamSignInfo);
      const option = teamSignInfo(this.dateList, chartData);
      weekChartData.setOption(option);
      eventListen(weekChartData);
    },
    // 查询团队签到信息
    async getTeamInfo(dates, dateStrings) {
      console.log(dates);
      try {
        const { data } = await axios.get("sign/time", {
          params: {
            start: dateStrings[0],
            end: dateStrings[1],
            team_id: this.teamId,
          },
        });
        const { date_list, team_sign } = data;
        let teamChartData = [];
        team_sign.forEach((v) => {
          if (v.id === this.teamId) {
            teamChartData = v.chartData;
          }
        });
        const anyTimeChartData = echarts.init(this.$refs.anyTimeTeamSignInfo);
        const option = teamSignInfo(date_list, teamChartData);
        anyTimeChartData.setOption(option);
        eventListen(anyTimeChartData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>
