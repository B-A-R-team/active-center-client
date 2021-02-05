<!--
 * @Author: lts
 * @Date: 2021-01-15 16:40:01
 * @LastEditTime: 2021-02-05 20:27:35
 * @FilePath: \active-center-client\src\components\header\Header.vue
-->
<template>
  <a-affix :offset-top="0">
    <div class="header">
      <a-row type="flex" justify="center">
        <a-col :xs="20" :sm="20" :md="14" :lg="15" :xl="12">
          <div class="header_logo_box">
            <div class="header_logo">
              <img src="../../assets/logo.png" alt="" />
            </div>

            <p class="header_txt">软件学院创新创业孵化基地</p>
          </div>
        </a-col>
        <a-col :xs="4" :sm="4" :md="10" :lg="6" :xl="6">
          <a-menu
            mode="horizontal"
            :overflowedIndicator="backIcon"
            :style="{ textAlign: 'right' }"
          >
            <a-menu-item class="my_menu_item">
              <router-link to="/"> <home-outlined />首页</router-link>
            </a-menu-item>
            <a-menu-item class="my_menu_item" v-if="!isLogin">
              <router-link to="/login"><login-outlined />登录</router-link>
            </a-menu-item>
             <a-menu-item class="my_menu_item"  v-if="isLogin">
              <router-link to="/login"><login-outlined />进入</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </div>
  </a-affix>
</template>
<script>
import {
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import "./Header.less";
import { ref } from 'vue';
export default {
  name: "Header",
  components: {
    HomeOutlined,
    LoginOutlined,
  },
  setup() {
    let isLogin = ref(false)
    let userInfo = window.localStorage.getItem('userInfo')
    let token =  window.localStorage.getItem('token')
    let timeKey = window.localStorage.getItem('time_key')
    if(userInfo&&token&&timeKey) {
      isLogin.value = true
    }
    const backIcon = () => {
      return <MenuOutlined />;
    };
    return {
      backIcon,
      isLogin
    };
  },
};
</script>
<style lang="less" scoped>
</style>