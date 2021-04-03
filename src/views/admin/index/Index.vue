<!--
 * @Author: lts
 * @Date: 2021-01-15 21:16:54
 * @LastEditTime: 2021-04-03 21:51:33
 * @FilePath: \active-center-client\src\views\admin\index\Index.vue
-->
<template>
  <div class="admin_app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :style="{ width: '256px', minWidth: '256px', maxWidth: '256px' }"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logo">
          <img
            src="../../../assets/bar.jpg"
            :style="{ height: '100%' }"
            alt=""
          />

          <span v-if="!collapsed">BAR团队</span>
        </div>
        <a-menu
          theme="dark"
          :defaultOpenKeys="['/admin/signIn']"
          mode="inline"
          v-model:selectedKeys="selectedKeys"
        >
          <template v-for="item in menu" :key="item.key" v-is="item.icon">
            <a-menu-item v-if="!item.children" :key="item.key">
              <router-link :to="item.key">
                <div v-is="item.icon">

                </div>
                <span>{{ item.title }}</span>
              </router-link>
            </a-menu-item>
            <a-sub-menu v-if="item.children" :key="item.key" >
              <template #title>
                <span
                  ><div v-is="item.icon">

                </div><span>{{ item.title }}</span></span
                >
              </template>

              <a-menu-item
                v-for="childrenItem in item.children"
                :key="childrenItem.key"
              >
                <router-link :to="childrenItem.key">
                  <span
                    ><div v-is="childrenItem.icon">

                </div><span>{{
                      childrenItem.title
                    }}</span></span
                  >
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
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
            <div class="callback_home">
              <a-tooltip>
                <template #title> 返回首页 </template>
                <router-link to="/">
                  <HomeOutlined :style="{ fontSize: '25px' }" />
                </router-link>
              </a-tooltip>
            </div>
            <a-avatar :src="avatar_url" />
            <span class="user_name">{{ userInfo.name }}</span>
            <a-button @click="logout">退出</a-button>
          </div>
        </a-layout-header>
        <a-breadcrumb style="margin: 16px 0 0 0">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbArr"
            :key="index"
            >{{ item }}</a-breadcrumb-item
          >
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
import { onMounted, provide } from "vue";
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  PieChartOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  CarryOutOutlined,
} from "@ant-design/icons-vue";
// import "./Index.less";
import { ref, createVNode, watch } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { BASE_URL } from "../../../utils/constantsUtil";

export default {
  name: "Admin",
  components: {
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
    SolutionOutlined,
    PieChartOutlined,
    FileTextOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    CarryOutOutlined,
    ExclamationCircleOutlined,
  },
  setup() {
    let breadcrumbArr = ref(["首页"]);
    // const { ctx } = getCurrentInstance(); // 取态this
    // console.log(ctx.$router.options.history.location);
    let menu = ref([
      { key: "/admin/userInfo", title: "个人信息", icon:'UserOutlined' },
      {
        key: "/admin/signIn",
        title: "签到情况",
        icon: 'PieChartOutlined',
        children: [
          {
            key: "/admin/signIn/personSignIn",
            title: "个人签到情况",
            icon: 'SolutionOutlined',
          },
          {
            key: "/admin/signIn/teamSignIn",
            title: "团队签到情况",
            icon: 'TeamOutlined' ,
          },
          {
            key: "/admin/signIn/allSignIn",
            title: "活动中心签到情况",
            icon: 'FileTextOutlined',
          },
           {
            key: "/admin/signIn/signInTotal",
            title: "总体签到统计",
            icon: 'CarryOutOutlined',
          },
        ],
      },
      { key: "/admin/usersManage", title: "用户管理", icon: 'TeamOutlined'  },
      { key: "/admin/teamManage", title: "团队管理", icon: 'SettingOutlined'  },
      { key: "/admin/role", title: "权限管理", icon: 'SettingOutlined'  },
    ]);
    let avatar_url = ref("");
    const getAvatar = () => {
      avatar_url.value =
        BASE_URL +
        JSON.parse(window.localStorage.getItem("userInfo")).avatar_url;
    };
    getAvatar();
    let router = useRouter();
    watch(router.currentRoute, (val) => {
      const { fullPath } = val;
      menu.value.forEach((item) => {
        if (item.key === fullPath) {
          breadcrumbArr.value = ["首页", item.title];
        }
        if (item.children) {
          item.children.forEach((childrenItem) => {
            if (childrenItem.key === fullPath) {
              breadcrumbArr.value = ["首页", item.title, childrenItem.title];
            }
          });
          // console.log(item.children);
        }
      });
      // breadcrumbArr.value = ['首页',]
    });
    // 一种获取当前路由的方法,但是到打包过后有问题了
    // console.log(ctx.$router.options.history.location)
    onMounted(() => {
      menu.value.forEach((item) => {
        if (item.url === router.currentRoute._rawValue.fullPath) {
          breadcrumbArr.value = ["首页", item.title];
        }
        if (item.children) {
          item.children.forEach((childrenItem) => {
            if (childrenItem.url === router.currentRoute._rawValue.fullPath) {
              breadcrumbArr.value = ["首页", item.title, childrenItem.title];
            }
          });
          // console.log(item.children);
        }
      });
    });
    let collapsed = ref(false);
    let userInfo = ref(JSON.parse(window.localStorage.getItem("userInfo")));
    provide("ec", echarts); //向子组件传递echarts
    provide("getAvatar", getAvatar);
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
    let selectedKeys = ref([router.currentRoute._rawValue.fullPath]);
    return {
      selectedKeys,
      collapsed,
      userInfo,
      logout,
      avatar_url,
      getAvatar,
      breadcrumbArr,
      menu,
    };
  },
};
</script>
<style lang="less" scoped>
@import "./Index.less";
</style>
