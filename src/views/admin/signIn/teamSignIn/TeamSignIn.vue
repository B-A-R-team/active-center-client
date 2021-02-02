<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:18
 * @LastEditTime: 2021-01-24 20:03:25
 * @FilePath: \active-center-client\src\views\admin\signIn\teamSignIn\TeamSignIn.vue
-->
<template>
  <div class="sign_in">
    <div class="tabs">
      <PartText :tabsTitle=teamTodaySignInfo />
      <div class="card_box">
        <a-empty v-show="emptyShow" style="display:flex;flex-direction:column;height:100%;justify-content:center;align-items:center"/>
        <a-card class="card" v-show="!emptyShow" v-for="item in signInList" :key="item.user_id">
          <a-card-grid class="card_grid">
            <span>姓名：</span>
            <span>{{ item.user_name }}</span>
          </a-card-grid>
          <a-card-grid class="card_grid">
            <span>签到时间：</span>
            <span>{{ item.sign_time }}</span>
          </a-card-grid>
        </a-card>
      </div>
    </div>
    <div class="data_statistic">
      <PartText :tabsTitle=teamSignInfo /> 
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
import "./TeamSignIn.less";
import PartText from "./partText/PartText.vue";
import * as echarts from "echarts";
import axios from "../../../../api";
const data = [
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
  {
    title: "",
    signInNumber: "",
  },
];
const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
const teamId = userInfo.team_id;
export default {
  name: "TeamSignIn",
  components: {
    PartText,
  },
  data() {
    return {
      signInList: [],
      dataChartShow: true,
      data,
      emptyShow: true,
      teamTodaySignInfo: '',
      teamSignInfo: '',
      teamId
    };
  },
  methods: {
    toggleDataChart() {
      this.dataChartShow = true;
    },
    toggleDataList() {
      this.dataChartShow = false;
    },
    async getTeamSignInfo() {
      const { data }  = await axios.get(`sign/team/${this.teamId}?type=week`);
      const { team_sign } = data;
      const { date_list } = data;
      let newChartData;
      for(let i = 0; i < team_sign.length; i++) {
        if(team_sign[i].id === this.teamId) {
          newChartData = team_sign[i].chartData;
          this.teamTodaySignInfo = team_sign[i].name + '签到信息';
          this.teamSignInfo = team_sign[i].name + '本周签到统计';
          team_sign[i].chartData.forEach((el,index) => {
            this.data[index].signInNumber = el
          })
        }
      }
      date_list.forEach((v,i) => {
        this.data[i].title = v
      });
      // 初始化柱形图的实例对象
      const dataChart = echarts.init(this.$refs.dataChart);
      // 配置配置项和数据
      const dataChartOption = {
        // x轴
        xAxis: {
          type: "category",
          data: date_list,
          name: "日期",
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
          x: "2%",
          x2: "10%",
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
            data: newChartData,
            itemStyle: {
              borderRadius: 5,
            },
          },
        ],
      };
      // 将配置项给实例对象，用于数据显示
      dataChart.setOption(dataChartOption);
      window.addEventListener("load",function(){
        dataChart.resize();
      })
      window.addEventListener("resize",function(){
        dataChart.resize();
      })
    },
    async getTeamTodaySignInfo() {
      const { data } = await axios.get(`sign/team/${this.teamId}?type=today`);
      this.signInList = data;
      if(data.length === 0) {
        this.emptyShow = true;
      } else {
        this.emptyShow = false
      }
    }
  },
  mounted() {
    this.getTeamTodaySignInfo();
    this.getTeamSignInfo();
  }
};
</script>
<style lang="less" scoped>
</style>
