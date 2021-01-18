<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-01-18 09:06:43
 * @FilePath: \active-center-client\src\views\login\Login.vue
-->
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <a-avatar :size="128">
        <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <!-- 登录表单区域 -->
      <a-form
        :model="form"
        :rules="rules"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <div class="a_form_item">
          <a-form-item name="stu_id" :wrapper-col="{ span: 18, offset: 3 }" >
            <a-input
              v-model:value="form.stu_id"
              placeholder="请输入学号"
            >
              <template #prefix>
                <UserOutlined style="color:rgba(0,0,0,.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" :wrapper-col="{ span: 18, offset: 3 }">
            <a-input
              v-model:value="form.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <LockOutlined style="color:rgba(0,0,0,.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            class="btns"
            :wrapper-col="{span: 8, offset: 14}"
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
import './Login.less'
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
      // labelCol: { // 24格栅格系统，label所占为 a
        // xxl: { span: 5 }, // ≥1600px 响应式栅格
        // xl: { span: 8 }, // ≥1200px 响应式栅格
        // lg: { span: 10 }, // ≥992px 响应式栅格
        // md: { span: 12 },// ≥768px 响应式栅格
      // },
      // wrapperCol: { // 24格栅格系统，label后面内容所占为 24-a
      //   xxl: { span: 18, offst: 3},
      //   xl: { span: 16, offset: 4},
      //   lg: { span: 14,  offset: 5},
      //   md: { span: 12, offset: 6 },
      // },
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
  padding: 0px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
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
  opacity: 0.8;
}
</style>