<!--
 * @Author: lts
 * @Date: 2021-01-18 09:52:40
 * @LastEditTime: 2021-01-18 14:19:52
 * @FilePath: \active-center-client\src\views\admin\usersManage\UsersManage.vue
-->
<template>
  <div class="users_manage_box">
    <div class="users_manage_header">
      <a-select
        v-model:value="value1"
        style="width: 120px"
        @focus="focus"
        ref="select"
        @change="handleChange"
      >
        <a-select-option value="0"> 请选择搜索类型</a-select-option>
        <a-select-option value="jack"> Jack </a-select-option>
        <a-select-option value="lucy"> Lucy </a-select-option>
        <a-select-option value="disabled" disabled> Disabled </a-select-option>
        <a-select-option value="Yiminghe"> yiminghe </a-select-option>
      </a-select>
    </div>
    <div class="users_manage_table">
      <a-table :columns="columns" :data-source="data">
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <template #customTitle>
          <span><smile-outlined /> Name</span>
        </template>
        <template #tags="{ text: tags }">
          <span>
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template #action="{ record }">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> More actions <down-outlined /> </a>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle", customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    slots: { customRender: "tags" },
  },
  {
    title: "Action",
    key: "action",
    slots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

export default {
  name: "UsersManage",
  components: {
    SmileOutlined,
    DownOutlined,
  },
  data() {
    return {
      data,
      columns,
    };
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
    };
  },
};
</script>