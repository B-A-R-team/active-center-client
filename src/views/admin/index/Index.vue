<!--
 * @Author: lts
 * @Date: 2021-01-15 21:16:54
 * @LastEditTime: 2021-02-01 17:31:21
 * @FilePath: \active-center-client\src\views\admin\index\Index.vue
-->
<template>
  <div class="admin_app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :style="{ width: '256px', minWidth: '256px',maxWidth:'256px' }"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logo" >
          <img src="../../../assets/bar.jpg" :style="{height:'100%'}" alt="">
      
          <span v-if="!collapsed">BAR团队</span>
        </div>
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
          <a-menu-item key="/admin/userInfo">
            <router-link to="/admin/userInfo">
              <video-camera-outlined />
              <span>个人信息</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="/admin/signIn">
            <template #title>
              <span><MailOutlined /><span>签到情况</span></span>
            </template>
            <a-menu-item key="/admin/signIn/personSignIn">
              <router-link to="/admin/signIn/personSignIn">
                <span><MailOutlined /><span>个人签到情况</span></span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/admin/signIn/teamSignIn">
              <router-link to="/admin/signIn/teamSignIn">
                <span><MailOutlined /><span>团队签到情况</span></span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/admin/signIn/allSignIn">
              <router-link to="/admin/signIn/allSignIn">
                <span><MailOutlined /><span>活动中心签到情况</span></span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="/admin/usersManage">
            <router-link to="/admin/usersManage">
              <video-camera-outlined />
              <span>用户管理</span>
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
            <span class="user_name">{{ userInfo.name }}</span>
            <a-button @click="logout">退出</a-button>
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
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          Copyright © 2021 BAR Team. All rights reserved.
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getCurrentInstance, provide } from "vue";
import {
  MailOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
// import "./Index.less";
import { ref, createVNode } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
export default {
  name: "Admin",
  components: {
    MailOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    // eslint-disable-next-line vue/no-unused-components
    ExclamationCircleOutlined,
  },
  setup() {
    let router = useRouter();
    const { ctx } = getCurrentInstance(); // 取态this
    // console.log(ctx.$router.options.history.location);
    let collapsed = ref(false);
    let userInfo = ref(JSON.parse(window.localStorage.getItem("userInfo")));
    provide("ec", echarts); //向子组件传递echarts
    const logout = () => {
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确定要退出登录么？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          window.localStorage.clear();
          router.replace("/login");
        },
      });
    };
    let selectedKeys = ref([ctx.$router.options.history.location]);
    return {
      selectedKeys,
      collapsed,
      userInfo,
      logout,
    };
  },
};
</script>
<style lang="less" scoped>
@import './Index.less';
</style>
