<!--
 * @Author: lts
 * @Date: 2021-03-13 11:20:00
 * @LastEditTime: 2021-03-13 19:20:36
 * @FilePath: \active-center-client\src\views\admin\teamManage\TeamManage.vue
-->
<template>
  <div class="team_manage_box">
    <a-card title="团队列表" style="width: 100%; height: 100%">
      <template #extra>
        <a-button type="primary" @click="showAddTeamModal">添加团队</a-button>
      </template>
      <a-table
        :columns="columns"
        :loading="loading"
        :data-source="allTeamsInfo"
        bordered
        :pagination="myPagination"
      >
        <!-- 渲染的表格内容 -->
        <template #team_name="{ text }">
          <a>{{ text }}</a>
        </template>
        <!-- 标题 -->
        <template #customTitle>
          <span><smile-outlined /> 团队名称</span>
        </template>
        <template #team_teacher="{ record }">
          <span> {{ record.team_teacher }} </span>
        </template>
        <template #team_tables="{ record }">
          <span v-for="(item, index) in record.team_tables" :key="index">
            {{ item }}号桌 &nbsp;
          </span>
          <span v-if="!record.team_tables[0]">暂无</span>
        </template>
        <template #action>
          <span>
            <a-button ghost type="primary" @click="detailsInfo">
              查看详情</a-button
            >
            <a-divider type="vertical" />
            <a-popconfirm
              title="该功能暂未开放"
              ok-text="确定"
              cancel-text="取消"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </a-card>
    <a-modal
      title="添加团队"
      v-model:visible="addTeamVisible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      okText="添加"
      cancelText="取消"
    >
      <a-form
        ref="formRef"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        :model="formState"
        :rules="rules"
      >
        <a-form-item label="团队名称" required name="team_name">
          <a-input
            v-model:value="formState.team_name"
            placeholder="请输入团队名称"
          />
        </a-form-item>
        <a-form-item label="团队老师" required name="teacher">
          <a-input
            v-model:value="formState.teacher"
            placeholder="请输入团队老师"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="团队详情"
      v-model:visible="detailsInfoVisible"
      okText="添加"
      cancelText="取消"
    >
      <p>暂未开放</p>
    </a-modal>
  </div>
</template>
<script>
import "./TeamManage.less";
import Table from "./table.js";
import { SmileOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import axios from "../../../api";
import { SuccessNotification } from "../../../utils/warnning";

export default {
  name: "TeamManage",
  components: {
    SmileOutlined,
  },
  setup() {
    const formRef = ref(null);
    const rules = {
      team_name: [
        {
          required: true,
          message: "请输入团队名称",
          trigger: "blur",
        },
        {
          min: 1,
          max: 10,
          message: "长度必须在1~10之间",
          trigger: "blur",
        },
      ],
      teacher: [
        {
          required: true,
          message: "请输入老师名称",
          trigger: "change",
        },
      ],
    };
    let { teamsInfo, columns, loading, pagination } = Table();
    let allTeamsInfo = ref(teamsInfo);
    let myPagination = ref(pagination);
    const formState = ref({
      team_name: "",
      teacher: "",
    });
    const addTeamVisible = ref(false);
    const detailsInfoVisible = ref(false);
    const confirmLoading = ref(false);
    const showAddTeamModal = () => {
      addTeamVisible.value = true;
    };
    const handleOk = () => {
      formRef.value
        .validate()
        .then(async () => {
          confirmLoading.value = true;
          const res = await axios.post("/team", {
            name: formState.value.team_name,
            teacher: formState.value.teacher,
          });
          console.log(res);
          if (res.code === 200 && res.data.result === true) {
            SuccessNotification("提示", "添加团队成功");
            allTeamsInfo.value = [
              ...allTeamsInfo.value,
              {
                key: -1,
                team_teacher: formState.value.teacher,
                team_name: formState.value.team_name,
                people_count: 0,
              },
            ];
            // 总数加1
            myPagination.value.total++;
            confirmLoading.value = false;
            addTeamVisible.value = false;
            formState.value.team_name = "";
            formState.value.teacher = "";
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const detailsInfo = () => {
      detailsInfoVisible.value = true;
    };
    return {
      allTeamsInfo,
      columns,
      loading,
      myPagination,
      addTeamVisible,
      confirmLoading,
      showAddTeamModal,
      handleOk,
      formState,
      rules,
      formRef,
      detailsInfo,
      detailsInfoVisible,
    };
  },
};
</script>
