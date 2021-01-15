<!--
 * @Author: lts
 * @Date: 2021-01-15 16:40:01
 * @LastEditTime: 2021-01-15 18:07:23
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\components\header\Header.vue
-->
<template>
  <div class="header">
    <a-row type="flex" justify="center">
      <a-col :xs="20" :sm="20" :md="14" :lg="15" :xl="12">
        <div class="header_logo_box">
          <div class="header_logo">logo</div>
          <p class="header_txt">大学生创新创业孵化基地</p>
        </div>
      </a-col>
      <a-col :xs="4" :sm="4" :md="10" :lg="6" :xl="6">
        <a-menu
          mode="horizontal"
          overflowedIndicator
          :style="{ textAlign: 'right' }"
        >
          <a-menu-item :style="{ padding: '0', marginLeft: '20px' }">
            <router-link to="/"> <home-outlined />首页</router-link>
          </a-menu-item>
          <a-menu-item :style="{ padding: '0', marginLeft: '20px' }">
            <router-link to="/login"><login-outlined />登录</router-link>
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { HomeOutlined, LoginOutlined } from "@ant-design/icons-vue";
import "./Header.less";
export default {
  name: "Header",
  components: {
    HomeOutlined,
    LoginOutlined,
  },
  setup() {},
};
</script>
<style lang="less" scoped>
</style>