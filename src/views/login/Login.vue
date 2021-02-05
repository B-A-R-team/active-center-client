<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-02-05 20:29:21
 * @FilePath: \active-center-client\src\views\login\Login.vue
-->
<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col
        class="login_col utils_left"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="20"
        :xl="18"
      >
        <div class="login_container">
          <a-divider>登录</a-divider>
          <div class="login_box">
            <a-avatar :size="80" :style="{ backgroundColor: '#f5222d' }">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <a-form :model="loginForm" :rules="rules">
              <div class="a_form_item">
                <a-form-item
                  name="stu_id"
                  :label-col="{ span: 20 }"
                  :wrapper-col="{ span: 24 }"
                >
                  <a-input
                    v-model:value="loginForm.stu_id"
                    placeholder="请输入学号"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  name="password"
                  :label-col="{ span: 20 }"
                  :wrapper-col="{ span: 24 }"
                >
                  <a-input
                    v-model:value="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item class="btns">
                  <a-button type="primary" @click="login" @keyup.enter="login">
                    登录
                  </a-button>
                  <a-button style="margin-left: 10px" @click="reset">
                    重置
                  </a-button>
                </a-form-item>
              </div>
            </a-form>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axios from "../../api";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import "./Login.less";
import NProgress from "nprogress";
import { message } from "ant-design-vue";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      loginForm: {
        stu_id: "",
        password: "",
      },
      // 存储用户信息
      userInfo: "",
      rules: {
        stu_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    var t = this;
    document.onkeydown = function (e) {
      if (window.event == undefined) {
        var key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      //enter的ASCII码是13
      if (key == 13) {
        t.login();
      }
    };
  },
  methods: {
    login() {
      NProgress.start();
      //    登录请求
      axios
        .post("login", {
          stu_id: this.loginForm.stu_id,
          password: this.loginForm.password,
        })
        .then((res) => {
          console.log(res);
          if (res.message === "success") {
            message.success("登录成功");
            this.userInfo = res.data;
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(this.userInfo)
            );
            window.localStorage.setItem("token", res.token);
            let date = new Date();
            date.setDate(date.getDate() + 3);
            console.log(date.getTime().toString());
            window.localStorage.setItem("time_key", date.getTime().toString());
            //2、通过编程式导航跳转到后台主页，路由地址是/admin
            NProgress.done();
            this.$router.push("/admin").catch(() => {});
          } else {
            NProgress.done();
          }
        })
        .catch(() => {
          NProgress.done();
        });
    },
    // 重置表单内容
    reset() {
      this.loginForm = [];
    },
  },
};
</script>
<style lang="less" scoped>
</style>