<!--
 * @Author: lts
 * @Date: 2021-01-20 18:26:19
 * @LastEditTime: 2021-03-02 13:45:42
 * @FilePath: \active-center-client\src\views\admin\signIn\allSignIn\AllSignIn.vue
-->
<template>
  <div>
    <a-row type="flex" justify="space-between" class="all_sign_one">
      <a-col :sm="24" :md="8" :xl="5" :style="{ height: '450px' }">
        <a-card class="all_card_left">
          <template #title>
            <span>今日活动中心签到数</span>
            <a-tooltip>
              <template #title> 刷新 </template>
              <a @click="pieRefresh">
                <RedoOutlined
                  :style="{ marginLeft: '10px' }"
                  :spin="pieChartLoading"
              /></a>
            </a-tooltip>
          </template>

          <template #extra>
            <a-tooltip>
              <template #title> 今天活动中心所有人签到总数 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
          </template>
          <div class="show_data">
            目前
            <span>{{ singInCount }}人</span>
            完成签到
          </div>
          <a-spin :spinning="pieChartLoading">
            <div
              ref="allSignInPie"
              :style="{ width: '100%', height: '100%', minHeight: '270px' }"
            ></div>
          </a-spin>
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
            <a-tooltip>
              <template #title> 刷新 </template>
              <a @click="lineRefresh">
                <RedoOutlined :style="{ marginLeft: '10px' }" :spin="loading"
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
              :style="{ maxWidth: '256px', display: 'inline-block' }"
              :placeholder="['开始日期', '结束日期']"
            />
          </template>
          <a-spin :spinning="loading">
            <div
              ref="allSignSelLine"
              :style="{
                width: '100%',
                maxWidth: '1150px',
                height: '100%',
                minHeight: '330px',
              }"
            ></div>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-between" class="all_sign_two">
      <a-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <a-card>
          <template #title>
            <span :style="{ marginRight: '10px' }">团队签到</span>
            <a-tooltip>
              <template #title> 团队签到 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
            <a-tooltip>
              <template #title> 刷新 </template>
              <a @click="teamRefresh">
                <RedoOutlined
                  :style="{ marginLeft: '10px' }"
                  :spin="teamLoading"
              /></a>
            </a-tooltip>
          </template>
          <template #extra>
            <div class="extra_item">
              <a
                :class="{ active: item.key === activeTeamKey }"
                v-for="item in extraConfig"
                @click="debounce(handleClickTeamItem(item.key), 300)"
                :key="item.key"
                >{{ item.value }}</a
              >
            </div>
            <a-range-picker
              v-model:value="selectTimeTeam"
              @change="timeChangeTeam"
              :style="{ maxWidth: '256px', display: 'inline-block' }"
              :placeholder="['开始日期', '结束日期']"
            />
          </template>
          <a-spin :spinning="teamLoading">
            <div
              ref="allSignSelTeamLine"
              :style="{
                width: '100%',
                height: '630px',
              }"
            ></div>
          </a-spin>
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
            <a-input
              placeholder="请输入学号"
              :maxlength="10"
              v-model:value="stuId"
            />
            <a-button
              type="primary"
              :style="{ marginTop: '10px' }"
              @click="findUserInfo"
              >查询</a-button
            >
          </div>

          <div class="stu_info">
            <a-divider />
            <div class="stu_header">学生信息级签到情况</div>
            <a-spin :spinning="userInfoLoading">
              <div class="stu_body">
                <a-empty
                  v-if="!userInfoIsShow"
                  description="暂无数据，请先输入学号查询"
                />
                <div v-if="userInfoIsShow" class="stu_body_div">
                  <span
                    >姓名 <span>{{ userInfo.name }}</span></span
                  >
                  <span
                    >学号 <span>{{ userInfo.stu_id }}</span></span
                  >
                  <span
                    >班级 <span>{{ userInfo.class_name }}</span></span
                  >
                  <span
                    >团队 <span>{{ userInfo.team }}</span></span
                  >
                  <span
                    >联系方式
                    <span>{{
                      userInfo.phone ? userInfo.phone : "暂无"
                    }}</span></span
                  >
                  <span
                    >今日签到情况
                    <span>{{
                      userInfo.is_sign ? "已签到" : "未签到"
                    }}</span></span
                  >

                  <div class="stu_footer">
                    <a-button type="primary" @click="showModal"
                      >点击查看他的签到记录</a-button
                    >
                    <a-modal
                      v-model:visible="visible"
                      ok-text="确认"
                      cancel-text="取消"
                      @ok="hideModal"
                      class="myModalChart"
                      destroyOnClose
                    >
                      <template #title>
                        <span :style="{ fontWeight: '600', fontSize: '18px' }">
                          {{ userInfo.name }}的签到详情</span
                        >
                      </template>
                      <PersonSignIn :allSignInFlag="true" :id="userInfo.id" />
                    </a-modal>
                  </div>
                </div>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import PersonSignIn from "../personSignIn/PersonSignIn.vue";
import { InfoCircleOutlined, RedoOutlined } from "@ant-design/icons-vue";

import "./AllSignIn.less";
import "./ModelInfo.less";
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import {
  selLineChartOptions,
  selTeamLineChartOptions,
  signInPie,
} from "./AllSignChartConfig";
import {
  getFirstAndEndDayOfWeek,
  getFirstAndEndDayOfMonth,
  getFirstAndEndDayOfYear,
} from "../../../../utils/getStartAndEndUtil";
import axios from "../../../../api";
import warnning, { ErrorNotification } from "../../../../utils/warnning";
export default {
  name: "AllSignIn",
  components: {
    InfoCircleOutlined,
    PersonSignIn,
    RedoOutlined,
  },
  setup() {
    let pieChartLoading = ref(true);
    let loading = ref(true);
    let teamLoading = ref(true);
    let visible = ref(false);
    let singInCount = ref(0);
    let extraConfig = [
      { key: "week", value: "本周" },
      { key: "month", value: "本月" },
      { key: "year", value: "本年" },
    ];
    let activeKey = ref("week");
    let activeTeamKey = ref("week");
    let selectTime = ref();
    let selectTimeTeam = ref();
    let allSignInPie = ref(null);
    let allSignSelLine = ref(null);
    let allSignSelTeamLine = ref(null);

    let selLineChart;
    let selTeamLineChart;
    let pieCharts;
    let stuId = ref("");
    let userInfo = reactive({
      id: -1,
      phone: "暂无",
      name: "暂无",
      team: "暂无",
      class_name: "暂无",
      stu_id: "暂无",
      is_sign: false,
    });
    let userInfoIsShow = ref(false);
    let userInfoLoading = ref(false);

    const debounce = (fn, delay) => {
      return function () {
        console.log("debounce...");
        const args = arguments;
        if (fn.time) {
          clearTimeout(fn.time);
        }
        fn.time = setTimeout(() => {
          fn.apply(this, args);
          delete fn.time;
        }, delay);
      };
    };
    const getPieData = async (pieCharts) => {
      pieChartLoading.value = true;
      const resPieData = await axios("/sign/time");
      const resUser = await axios("/user");
      singInCount.value = resPieData.data.count_list[0].count;
      let notSingInCount = resUser.data.length - singInCount.value;
      pieCharts.setOption(signInPie(singInCount.value, notSingInCount));
      pieChartLoading.value = false;
    };
    const getLineData = async (selLineChart) => {
      loading.value = true;
      const { startTime, endTime } = getFirstAndEndDayOfWeek();

      const resChartData = await axios("/sign/time", {
        params: {
          start: startTime,
          end: endTime,
        },
      });
      loading.value = false;
      const { count_list } = resChartData.data;
      selLineChart.setOption(selLineChartOptions(count_list));
    };
    const getTeamData = async (selTeamLineChart) => {
      teamLoading.value = true;
      const { startTime, endTime } = getFirstAndEndDayOfWeek();
      try {
        const resChartData = await axios("/sign/time", {
          params: {
            start: startTime,
            end: endTime,
          },
        });
        teamLoading.value = false;
        const { team_list } = resChartData.data;
        selTeamLineChart.setOption(selTeamLineChartOptions(team_list));
      } catch (error) {
        ErrorNotification("错误", "网络问题");
      }
    };
    onMounted(async () => {
      pieCharts = echarts.init(allSignInPie.value);
      getPieData(pieCharts);

      selLineChart = echarts.init(allSignSelLine.value);
      getLineData(selLineChart);

      selTeamLineChart = echarts.init(allSignSelTeamLine.value);
      getTeamData(selTeamLineChart);

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

    const handleClickItem = async (key) => {
      activeKey.value = key;
      loading.value = true;
      if (key === extraConfig[0].key) {
        const { startTime, endTime } = getFirstAndEndDayOfWeek();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          loading.value = false;
          const { count_list } = resChartData.data;
          selLineChart.setOption(selLineChartOptions(count_list, key));
        } catch (error) {
          ErrorNotification("错误", "网络问题");
        }
      } else if (key === extraConfig[1].key) {
        const { startTime, endTime } = getFirstAndEndDayOfMonth();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          loading.value = false;
          const { count_list, date_list } = resChartData.data;

          selLineChart.setOption(
            selLineChartOptions(count_list, key, date_list)
          );
        } catch (error) {
          ErrorNotification("错误", "网络问题");
        }
      } else {
        const { startTime, endTime } = getFirstAndEndDayOfYear();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          loading.value = false;
          const { count_list } = resChartData.data;

          selLineChart.setOption(selLineChartOptions(count_list, key));
        } catch (error) {
          ErrorNotification("错误", "网络问题");
        }
      }
    };

    const handleClickTeamItem = async (key) => {
      activeTeamKey.value = key;
      teamLoading.value = true;
      if (key === extraConfig[0].key) {
        const { startTime, endTime } = getFirstAndEndDayOfWeek();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          const { team_list } = resChartData.data;
          selTeamLineChart.setOption(selTeamLineChartOptions(team_list, key));
          teamLoading.value = false;
        } catch (error) {
          ErrorNotification("错误", "网络问题");
        }
      } else if (key === extraConfig[1].key) {
        const { startTime, endTime } = getFirstAndEndDayOfMonth();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          const { team_list, date_list } = resChartData.data;
          selTeamLineChart.setOption(
            selTeamLineChartOptions(team_list, key, date_list)
          );
          teamLoading.value = false;
        } catch (error) {
          ErrorNotification("错误", "未知错误");
        }
      } else {
        const { startTime, endTime } = getFirstAndEndDayOfYear();
        try {
          const resChartData = await axios("/sign/time", {
            params: {
              start: startTime,
              end: endTime,
            },
          });
          const { team_list } = resChartData.data;
          selTeamLineChart.setOption(selTeamLineChartOptions(team_list, key));
          teamLoading.value = false;
        } catch (error) {
          ErrorNotification("错误", "未知错误");
        }
      }
    };
    const timeChange = async (e, time) => {
      if (e.length > 0) {
        activeKey.value = "rangePicker";
        loading.value = true;
        console.log(e);
        const resChartData = await axios("/sign/time", {
          params: {
            start: time[0],
            end: time[1],
          },
        });
        // console.log(resChartData)
        const { count_list } = resChartData.data;
        selLineChart.setOption(selLineChartOptions(count_list, "selTime",'',time));
        setTimeout(() => {
          loading.value = false;
        }, 500);
      }
    };
    const timeChangeTeam = async (e, time) => {
      if (e.length > 0) {
        activeTeamKey.value = "rangePicker";
        teamLoading.value = true;
        console.log(e);
        const resChartData = await axios("/sign/time", {
          params: {
            start: time[0],
            end: time[1],
          },
        });
        const { team_list, date_list } = resChartData.data;
        selTeamLineChart.setOption(
          selTeamLineChartOptions(team_list, "selTime", date_list)
        );
        setTimeout(() => {
          teamLoading.value = false;
        }, 500);
      }
    };
    const hideModal = () => {
      visible.value = false;
    };
    const showModal = () => {
      visible.value = true;
    };
    const findUserInfo = async () => {
      userInfoLoading.value = true;
      if (stuId.value.length <= 0) {
        ErrorNotification("错误", "学号必须填写");
        userInfoLoading.value = false;
        return;
      }
      const resData = await axios("/user", {
        params: {
          stu_id: stuId.value,
        },
      });
      const resUserInfo = resData.data;
      // console.log(resUserInfo);
      if (resUserInfo && resUserInfo.id) {
        const res = await axios("/sign/time?user_id=" + resData.data.id);
        console.log(res.data);
        userInfo.name = resUserInfo.name;
        userInfo.id = resUserInfo.id;
        userInfo.class_name = resUserInfo.class_name;
        userInfo.phone = resUserInfo.phone;
        userInfo.stu_id = resUserInfo.stu_id;
        userInfo.team = resUserInfo.team;
        userInfo.is_sign = res.data.user_sign[0][0] ? true : false;
        userInfoIsShow.value = true;
        userInfoLoading.value = false;
      } else {
        warnning("警告！", "学号不存在");
        userInfoIsShow.value = false;
        userInfoLoading.value = false;
      }
    };
    const pieRefresh = async () => {
      getPieData(pieCharts);
    };
    const lineRefresh = () => {
      activeKey.value = "week";
      getLineData(selLineChart);
    };
    const teamRefresh = () => {
      activeTeamKey.value = 'week'
      getTeamData(selTeamLineChart);
    };
    return {
      pieRefresh,
      teamRefresh,
      lineRefresh,
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
      loading,
      teamLoading,
      debounce,
      timeChangeTeam,
      selectTimeTeam,
      singInCount,
      findUserInfo,
      stuId,
      userInfo,
      userInfoIsShow,
      userInfoLoading,
      pieChartLoading,
    };
  },
};
</script>
<style lang="less" scoped>
</style>