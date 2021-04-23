<!--
 * @Author: lts
 * @Date: 2021-04-04 18:27:04
 * @LastEditTime: 2021-04-04 19:36:56
 * @FilePath: \active-center-client\src\views\admin\role\Player.vue
-->
/*
 * @Author: lts
 * @Date: 2021-04-04 18:27:04
 * @LastEditTime: 2021-04-04 18:27:04
 * @FilePath: \active-center-client\src\views\admin\role\play.js
 */
<template>
  <a-card>
    <template #title> 角色列表 </template>
    <template #extra>
      <a-button type="primary" @click="showModal">添加角色</a-button>
    </template>
    <a-table :dataSource="roleDataSource" :columns="columnsRole">
      <template #action>
        <a>设置权限</a>
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
        :rules="roleRules"
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
</template>
<script>
import { ref } from "vue";
import dataColumn from "./dataColumn";
export default {
  name: "Player",
  setup() {
    const formRef = ref(null);
    const visible = ref(false);
    const formState = ref({
      name: "",
      desc: "",
    });
    const {
      roleLoading,
      columnsRole,
      roleDataSource,
      roleRules,
    } = dataColumn();
    const handleOk = () => {};
    const showModal = () => {};
    return {
      showModal,
      handleOk,
      formRef,
      formState,
      visible,
      roleRules,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      roleLoading,
      columnsRole,
      roleDataSource,
    };
  },
};
</script>