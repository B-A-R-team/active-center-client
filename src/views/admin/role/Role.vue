<!--
 * @Author: lts
 * @Date: 2021-04-02 17:30:42
 * @LastEditTime: 2021-04-03 22:30:42
 * @FilePath: \active-center-client\src\views\admin\role\Role.vue
-->
<template>
  <div style="background: #fff; height: 100%">
    <a-row type="flex" justify="space-between" class="role_per">
      <a-col :sm="24" :md="24" :xl="8">
        <a-card>
          <template #title> 权限列表 </template>
          <template #extra>
            <a-button type="primary" @click="showPerModal">添加权限</a-button>
          </template>
          <a-table
            :dataSource="perDataSource"
            :columns="columnsPer"
            :loading="perLoading"
          >
            <template #action="{ record }">
              <a @click="updatePer(record)">修改权限</a>
              <a-divider type="vertical" />
              <a>删除角色</a>
            </template>
          </a-table>

          <a-modal
            title="创建权限"
            v-model:visible="perVisible"
            okText="确定"
            cancelText="取消"
            @Ok="handlePerOk"
          >
            <a-form
              ref="perFormRef"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :model="perFormState"
              :rules="perRules"
            >
              <a-form-item label="权限名称" required name="name">
                <a-input
                  v-model:value="perFormState.name"
                  placeholder="请输入权限名称"
                />
              </a-form-item>
              <a-form-item label="权限描述" name="desc">
                <a-input
                  v-model:value="perFormState.desc"
                  placeholder="请输入权限描述"
                />
              </a-form-item>
              <a-form-item label="选择权限">
                <a-tree
                  checkable
                  defaultExpandAll
                  :tree-data="treeData"
                  v-model:checkedKeys="checkedKeys"
                  @check="check"
                >
                  <template #title0010
                    ><span style="color: #1890ff">sss</span></template
                  >
                </a-tree>
              </a-form-item>
              <p :style="{ color: '#f5222d', marginLeft: '10px' }">
                创建角色时，不能赋予角色权限，需要在下方手动设置。
              </p>
            </a-form>
          </a-modal>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="15">
        <a-card>
          <template #title> 角色列表 </template>
          <template #extra>
            <a-button type="primary" @click="showModal">添加角色</a-button>
          </template>
          <a-table :dataSource="roleDataSource" :columns="columnsRole">
            <template #action>
              <a>设置权限</a>
              <a-divider type="vertical" />
              <a>删除角色</a>
            </template>
          </a-table>

          <a-modal
            title="创建角色"
            v-model:visible="visible"
            okText="确定"
            cancelText="取消"
            @Ok="handleOk"
          >
            <a-form
              ref="formRef"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :model="formState"
              :rules="rules"
            >
              <a-form-item label="角色名称" required name="name">
                <a-input
                  v-model:value="formState.name"
                  placeholder="请输入角色名称"
                />
              </a-form-item>
              <a-form-item label="角色描述" name="desc">
                <a-input
                  v-model:value="formState.desc"
                  placeholder="请输入角色描述"
                />
              </a-form-item>
              <p :style="{ color: '#f5222d', marginLeft: '10px' }">
                创建角色时，不能赋予角色权限，需要在下方手动设置。
              </p>
            </a-form>
          </a-modal>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import dataColunm from "./dataColumn";
import "./role.less";
import axios from "../../../api";
import menuData from "../../../utils/treeData";
export default {
  name: "Role",
  setup() {
    // table配置项
    const {
      perLoading,
      roleLoading,
      columnsRole,
      columnsPer,
      roleDataSource,
      perDataSource,
    } = dataColunm();

    // tree配置项
    const checkedKeys = ref(["/admin/userInfo"]);
    const treeData = ref(menuData);
    const perFormRef = ref(null);
    let perFormState = ref({
      name: "",
      desc: "",
      type: "MENU",
      url: JSON.stringify([
        { key: "/admin/userInfo", title: "个人信息", icon: "UserOutlined" },
      ]),
    });
    const perRules = {
      name: [
        {
          required: true,
          message: "请输入角色",
          trigger: "change",
        },
        {
          min: 1,
          max: 10,
          message: "长度必须在1~10之间",
          trigger: "change",
        },
      ],
      desc: [
        {
          required: true,
          message: "请输入描述",
          trigger: "change",
        },
      ],
    };
    const perVisible = ref(false);
    const showPerModal = () => {
      perVisible.value = true;
      perFormRef.value.resetFields();
    };
    const updatePer = async (item) => {
      console.log(item);
      perVisible.value = true;
      perFormState.value.name = item.title
      perFormState.value.desc = item.desc

    };

    const handlePerOk = () => {
      console.log(111);
      perFormRef.value
        .validate()
        .then(async () => {
          console.log(perFormState.value.url);
          const res = await axios.post("/permission", {
            name: perFormState.value.name,
            desc: perFormState.value.desc,
            url: perFormState.value.url,
            type: perFormState.value.type,
          });
          console.log(res);
          perFormRef.value.resetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const check = (a, e) => {
      console.log(a);
      console.log(e);
      let myArr = [];
      e.checkedNodes.forEach((item) => {
        const { key, title, icon } = item.props;
        myArr.push({
          key,
          title,
          icon,
        });
      });
      perFormState.value.url = JSON.stringify(myArr);
      console.log(myArr);
    };
    return {
      updatePer,
      check,
      checkedKeys,
      perFormRef,
      perFormState,
      perRules,
      perLoading,
      roleLoading,
      columnsRole,
      columnsPer,
      roleDataSource,
      perDataSource,
      showPerModal,
      perVisible,
      handlePerOk,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      treeData,
    };
  },
};
</script>