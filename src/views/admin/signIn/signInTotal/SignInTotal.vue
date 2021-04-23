<!--
 * @Author: lts
 * @Date: 2021-03-15 15:47:43
 * @LastEditTime: 2021-03-15 17:19:50
 * @FilePath: \active-center-client\src\views\admin\signIn\signInTotal\SignInTotal.vue
-->
<template>
  <div class="signintotal">
    <div class="signintotal_one">
    <a-card style="width: 100%; height: 100%">
          <template #title>
            <span :style="{ marginRight: '10px' }">活动中心团队签到</span>
            <a-tooltip>
              <template #title> 本周活动中心各团队签到汇总 </template>
              <a><InfoCircleOutlined /></a>
            </a-tooltip>
            <a-tooltip>
              <template #title> 刷新 </template>
              <a>
                <RedoOutlined :style="{ marginLeft: '10px' }" :spin="loading"
              /></a>
            </a-tooltip>
          </template>
          <template #extra>
            <a-button-group>
            <a-button
            v-for="item in teamList"
            :class="{ active: activeKey === item.key }"
            :key="item.key"
            @click="handleItemClick(item.key)"
            >{{ item.value }}</a-button
            >
            </a-button-group>
            <a-range-picker
              v-model:value="selectTime"
              @change="getTeamInfo"
              :style="{ maxWidth: '256px', display: 'inline-block' }"
              :placeholder="['开始日期', '结束日期']"
            />
          </template>
          <!-- <a-spin :spinning="loading">
            <div
              ref="allSignSelLine"
              :style="{
                width: '100%',
                maxWidth: '1150px',
                height: '100%',
                minHeight: '330px',
              }"
            ></div>
          </a-spin> -->
      </a-card>
      </div>
      <div class="signintotal_two">
      </div>
  </div>
</template>
<script>
import "./SignInTotal.less";
import { InfoCircleOutlined, RedoOutlined } from "@ant-design/icons-vue";
// import * as echarts from "echarts";
// import axios from "../../../../api";
// import {
//   getFirstAndEndDayOfWeek,
//   getFirstAndEndDayOfMonth,
//   getFirstAndEndDayOfYear,
// } from "../../../../utils/getStartAndEndUtil.js";
const teamList = [
      { key: "week", value: "本周" },
      { key: "month", value: "本月" },
      { key: "year", value: "本年" },
    ];
const weekList = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
    name:'NotSignIn',
    components:{
        InfoCircleOutlined, 
        RedoOutlined
    },
    data(){
      return{
        loading: false,
        teamList,
        weekList,
        activeKey: teamList[0].key,
      }
    },
    methods:{
},
}
</script>