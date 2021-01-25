<!--
 * @Author: lts
 * @Date: 2021-01-20 18:26:19
 * @LastEditTime: 2021-01-25 11:17:38
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
            <span :style="{ marginRight: '10px' }">活动中心签到</span>
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
      <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="all_two_right">
        <a-card>
          <template #title>
            <span :style="{ marginRight: '10px' }">查看个人签到</span>
            <a-tooltip>
              <template #title> 查看个人签到详情 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <template #extra> </template>
          <div class="stu_find">
            <a-input placeholder="请输入学号" />
            <a-button type="primary" :style="{ marginTop: '10px' }"
              >查询</a-button
            >
          </div>

          <div class="stu_info">
            <a-divider />
            <div class="stu_header">学生信息级签到情况</div>
            <div class="stu_body">
              <span>姓名 <span>张三</span></span>
              <span>学号 <span>184804263</span></span>
              <span>班级 <span>18级.net2班</span></span>
              <span>团队 <span>bar</span></span>
              <span>联系方式 <span>1555555555555</span></span>
              <span>今日签到情况 <span>未签到</span></span>
            </div>
            <div class="stu_footer">
              <a-button type="primary" @click="showModal"
                >点击查看他的签到记录</a-button
              >
              <a-modal
                v-model:visible="visible"
                title="Modal"
                ok-text="确认"
                cancel-text="取消"
                @ok="hideModal"
                class="myModalChart"
                destroyOnClose
              >
                <PersonSignIn  :allSignInFlag="true"/>
              </a-modal>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import PersonSignIn from "../personSignIn/PersonSignIn.vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import "./AllSignIn.less";
import "./ModelInfo.less";
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import {
  selLineChartOptions,
  selTeamLineChartOptions,
  signInPie,
} from "./AllSignChartConfig";
export default {
  name: "AllSignIn",
  components: {
    InfoCircleOutlined,
    PersonSignIn,
  },
  setup() {
    let visible = ref(false);
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
      pieCharts.setOption(signInPie());
      const resChartsData = [200, 10, 50, 40, 60, 40, 70, 60];
      selLineChart.setOption(selLineChartOptions(resChartsData));
      selTeamLineChart.setOption(selTeamLineChartOptions(resChartsData));
      window.onload = function () {
        //自适应大小
        pieCharts.resize();
        selLineChart.resize();
        selTeamLineChart.resize();
      };
      window.addEventListener("resize", function () {
        pieCharts.resize();
        selLineChart.resize();
        selTeamLineChart.resize();
      });
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
      // console.log(selTeamLineChart);
      activeTeamKey.value = key;
    };
    const timeChange = (e) => {
      console.log(e);
      // console.log(selLineChart);
    };
    const hideModal = () => {
      visible.value = false;
    };
    const showModal = () => {
      visible.value = true;
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
      hideModal,
      visible,
      showModal,
    };
  },
};
</script>