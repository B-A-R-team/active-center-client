<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-01-15 18:12:41
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\views\login\Login.vue
-->
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="avatar_box">
        <img src="">
      </div>
      <!-- 登录表单区域 -->
      <a-form
        :model="form"
        :rules="rules"
      >
        <div class="a_form_item">
          <a-form-item :wrapper-col="{ span: 16, offset: 4 }" name="stu_id">
            <a-input
              v-model:value="form.stu_id"
              placeholder="stu_id"
            >
              <template #prefix>
                <UserOutlined style="color:rgba(0,0,0,.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 4 }" name="password">
            <a-input
              v-model:value="form.password"
              type="password"
              placeholder="Password"
            >
              <template #prefix>
                <LockOutlined style="color:rgba(0,0,0,.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 10, offset: 4 }"
            class="btns"
          >
            <a-button type="primary">
              登录
            </a-button>
            <a-button style="margin-left: 10px;">
              重置
            </a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      form: {
        stu_id: '',
        password: '',
      },
      rules: {
        stu_id: [
          { required: true, message: '请输入学号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
 },
  methods: {
  },
}

</script>
<style lang="less" scoped>
.login_container {
  background-color: #f3f1f1;
  background-size: 100% 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.692);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(246, 243, 243);
}
.a-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.a_form_item {
  margin-top: 100px;
}
.a_input {
  opacity: 0.65;
  border: 0;
  outline: none;
  border-style: none;
}
.btns {
  display: flex;
  justify-content: flex-end;
  opacity: 0.8;
}
.a-button {
  opacity: 0.85;
}
</style>