<!--
 * @Author: lts
 * @Date: 2021-01-15 21:16:54
 * @LastEditTime: 2021-01-16 09:44:41
 * @FilePath: \active-center-client\src\views\admin\index\Index.vue
-->
<template>
  <div class="admin_app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
          <a-menu-item key="1">
            <router-link to="/admin/signIn">
              <user-outlined />
              <span>签到管理</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/admin/userInfo">
              <video-camera-outlined />
              <span>信息完善</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          class="admin_header"
          style="background: #fff; padding: 0"
        >
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="user_info">
            <a-avatar />
            <span class="user_name">用户名称</span>
          </div>
        </a-layout-header>
        <a-breadcrumb style="margin: 16px 0 0 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            margin: '15px 16px 0 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }"
          >footer</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import "./Index.less";
import { ref } from "vue";
export default {
  name: "Admin",
  components: {
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    let selectedKeys = ref(["1"]);
    let collapsed = ref(false);
    return {
      selectedKeys,
      collapsed,
    };
  },
};
</script>
