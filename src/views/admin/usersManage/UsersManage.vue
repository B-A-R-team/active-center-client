<!--
 * @Author: lts
 * @Date: 2021-01-18 09:52:40
 * @LastEditTime: 2021-03-13 21:01:42
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.vue
-->
<template>
  <div class="users_manage_box">
    <a-card>
      <template #title>
        <a-form layout="inline">
          <a-form-item>
            <a-select
              v-model:value="value1"
              style="width: 120px"
              @focus="focus"
              ref="select"
              @change="handleChange"
            >
              <a-select-option value="0" disabled>
                请选择搜索类型</a-select-option
              >
              <a-select-option value="card_id"> 按照卡号查找 </a-select-option>
              <a-select-option value="stu_id"> 按照学号查找 </a-select-option>
              <a-select-option value="id"> 按照id查找 </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-input placeholder="请输入">
              <template #prefix
                ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSearch"> 搜索 </a-button>
          </a-form-item>
        </a-form>
      </template>
      <template #extra>
        <a-button type="primary" ghost @click="addUser">添加用户</a-button>
      </template>
      <div class="users_manage_table">
        <a-table
          :columns="columns"
          :data-source="myUsersInfo"
          :loading="loading"
          :pagination="pagination"
        >
          <!-- 渲染的表格内容 -->
          <template #name="{ text }">
            <a>{{ text }}</a>
          </template>
          <!-- 标题 -->
          <template #customTitle>
            <span><smile-outlined /> 姓名</span>
          </template>
          <template #class_name="{ record }">
            <span> {{ record.class_name }} </span>
          </template>
          <template #action>
            <span>
              <a @click="handleSearch">查看详情</a>
              <a-divider type="vertical" />
              <a @click="handleSearch">删除</a>
            </span>
          </template>
        </a-table>
      </div>
    </a-card>
    <a-modal
      title="添加用户"
      v-model:visible="addUserVisible"
      :onOk="handleOk"
      okText="添加"
      cancelText="取消"
      :confirm-loading="confirmLoading"
    >
      <a-form
        ref="formRef"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        :model="formState"
        :rules="rules"
      >
        <a-form-item label="选择团队" required name="team_id">
          <a-select
            v-model:value="formState.team_id"
            :loading="teamNameLoading"
            placeholder="请选择团队"
          >
            <a-select-option
              v-for="item in allTeams"
              :key="item.id"
              :value="item.id.toString()"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="姓名" required name="name">
          <a-input v-model:value="formState.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="学号" required name="stu_id">
          <a-input v-model:value="formState.stu_id" placeholder="请输入学号" />
        </a-form-item>
        <a-form-item label="密码" required name="password">
          <a-input
            type="password"
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="班级" required name="class_name">
          <a-input
            v-model:value="formState.class_name"
            placeholder="请输入班级"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { SmileOutlined, UserOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import UsersManage from "./UsersManage";
import "./UsersManage.less";
import axios from "../../../api";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../utils/warnning";
export default {
  name: "UsersManage",
  components: {
    SmileOutlined,
    UserOutlined,
  },

  setup() {
    let confirmLoading = ref(false);
    let teamNameLoading = ref(false);
    let formRef = ref(null);
    let formState = ref({
      stu_id: "",
      password: "",
      class_name: "",
      team_id: null,
      name: "",
    });
    let addUserVisible = ref(false);
    let value1 = ref("0");
    let allTeams = ref([]);
    const { usersInfo, columns, loading, pagination, rules } = UsersManage();
    const myUsersInfo = ref(usersInfo);
    const focus = (e) => {
      console.log(e);
    };
    const handleChange = () => {
      // console.log(e);
    };

    const handleOk = () => {
      confirmLoading.value = true;
      formRef.value
        .validate()
        .then(async () => {
          const res = await axios.post("/register", {
            ...formState.value,
            team_id: parseInt(formState.value.team_id),
          });
          if (res.code === 200 && res.data.user_id) {
            SuccessNotification("提示", "添加用户成功");
            let currentTeam = allTeams.value.find(
              (item) => item.id === parseInt(formState.value.team_id)
            );
            myUsersInfo.value = [
              ...myUsersInfo.value,
              {
                key: res.data.user_id,
                ...formState.value,
                team: currentTeam.name,
              },
            ];
            addUserVisible.value = false;
            confirmLoading.value = false;
            formState.value.stu_id = "";
            formState.value.team_id = null;
            formState.value.class_name = "";
            formState.value.name = "";
            formState.value.password = "";
          } else {
            confirmLoading.value = false;
            ErrorNotification("错误", "学号不能重复");
          }
        })
        .catch((error) => {
          confirmLoading.value = false;
          console.log("error", error);
        });
    };
    const addUser = () => {
      addUserVisible.value = true;
    };
    const handleSearch = () => {
      alert("暂未开放此功能");
    };
    onMounted(async () => {
      teamNameLoading.value = true;
      let res = await axios("/team");
      if (res.code === 200) {
        allTeams.value = res.data;
        teamNameLoading.value = false;
      }
    });
    return {
      handleSearch,
      confirmLoading,
      teamNameLoading,
      allTeams,
      handleOk,
      rules,
      formState,
      formRef,
      addUser,
      myUsersInfo,
      columns,
      loading,
      pagination,
      focus,
      handleChange,
      value1,
      addUserVisible,
    };
  },
};
</script>