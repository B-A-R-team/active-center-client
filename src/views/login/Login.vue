<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-01-20 08:47:54
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
          <div class="login_box">
            <div class="avatar_box">
              <a-avatar :size="64">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </div>
            <a-form :model="form" :rules="rules" >
              <div class="a_form_item">
                <a-form-item name="stu_id" :label-col="{span:20}" :wrapper-col="{span:24}" >
                  <a-input v-model:value="form.stu_id" placeholder="请输入学号">
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="password" :label-col="{span:20}" :wrapper-col="{span:24}">
                  <a-input
                    v-model:value="form.password"
                    type="password"
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item class="btns">
                  <a-button type="primary"> 登录 </a-button>
                  <a-button style="margin-left: 10px"> 重置 </a-button>
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
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import "./Login.less";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      form: {
        stu_id: "",
        password: "",
      },
      rules: {
        stu_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>


</style>