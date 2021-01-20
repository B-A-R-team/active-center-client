<!--
 * @Author: lts
 * @Date: 2021-01-18 09:52:40
 * @LastEditTime: 2021-01-20 12:09:41
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.vue
-->
<template>
  <div class="users_manage_box">
    <div class="users_manage_header">
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
          <a-button type="primary" html-type="submit"> 搜索 </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="users_manage_table">
      <a-table :columns="columns" :data-source="usersInfo">
        <!-- 渲染的表格内容 -->
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <!-- 标题 -->
        <template #customTitle>
          <span><smile-outlined /> 姓名</span>
        </template>
        <template #class_name="{ record }">
          <span> {{record.class_name}} </span>
        </template>
        <template #action>
          <span>
            <a>查看详情</a>
             <a-divider type="vertical" />
            <a>删除</a>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { SmileOutlined, UserOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import UsersManage from "./UsersManage";
import "./UsersManage.less";
export default {
  name: "UsersManage",
  components: {
    SmileOutlined,
    UserOutlined,
  },

  setup() {
    let value1 = ref("0");
    const focus = (e) => {
      console.log(e);
    };
    const handleChange = (e) => {
      console.log(e);
    };
    return {
      focus,
      handleChange,
      value1,
      ...UsersManage(),
    };
  },
};
</script>