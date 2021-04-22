<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-04-18 20:41:27
 * @FilePath: \active-center-client\src\views\register\Register.vue
-->
<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col
        class="register_col utils_left"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="20"
        :xl="18"
      >
        <div class="register_container">
          <a-divider id="register_divider">注册</a-divider>
          <div class="register_box">
            <a-form
              :model="registerForm"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              autocomplete="off"
            >
              <div class="a_form_item">
                <a-form-item name="stuId" label="学号">
                  <a-input
                    v-model:value="registerForm.stuId"
                    placeholder="请输入学号"
                    type="number"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="name" label="姓名">
                  <a-input
                    v-model:value="registerForm.name"
                    placeholder="请输入姓名"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="className" label="班级">
                  <a-input
                    v-model:value="registerForm.className"
                    placeholder="请输入班级"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="pwd" label="密码">
                  <a-input
                    v-model:value="registerForm.pwd"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item class="btns">
                  <a-button type="primary" @click="register"> 注册 </a-button>
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
// import "./register.less";
import NProgress from "nprogress";
import { SuccessNotification } from "../../utils/warnning";
export default {
  name: "register",
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      registerForm: {
        stuId: "",
        pwd: "",
        name: "",
        className: "",
      },
      // 存储用户信息
      userInfo: "",
      rules: {
        stuId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        className: [{ required: true, message: "请输入班级", trigger: "blur" }],
      },
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
  },
  methods: {
    async register() {
      NProgress.start();
      //    注册请求
      const { stuId, pwd, name, className } = this.registerForm;
      const res = await axios.post("/register", {
        stu_id: stuId,
        password: pwd,
        name,
        class_name: className,
        team_id: 1,
      });
      console.log(res);
      if (res.code === 200 && res.data.user_id) {
        NProgress.done();
        SuccessNotification("提示", "注册成功");
        return this.$router.push("/login").catch(() => {});
      }
      NProgress.done();
    },
    // 重置表单内容
    reset() {
      this.registerForm = [];
    },
  },
};
</script>
<style lang="less">
@import "./register.less";
</style>