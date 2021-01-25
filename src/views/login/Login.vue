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
            <a-form :model="loginForm" :rules="rules" >
              <div class="a_form_item">
                <a-form-item name="stu_id" :label-col="{span:20}" :wrapper-col="{span:24}" >
                  <a-input v-model:value="loginForm.stu_id" placeholder="请输入学号">
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item name="password" :label-col="{span:20}" :wrapper-col="{span:24}">
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
                  <a-button type="primary" @click="login"> 登录 </a-button>
                  <a-button style="margin-left: 10px" @click="reset"> 重置 </a-button>
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
import axios from '../../api'
import { message } from 'ant-design-vue';
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
  created(){
    var _self = this;
    document.onkeydown = function () {
      var key = window.event.keyCode;
      if (key == 13) {
        _self.login('loginForm'); //自己写的登录方法，点击事件
      }
  }
  },
  methods: {
        login() {
      //    登录请求
        axios.post('login', {
          stu_id: this.loginForm.stu_id,
          password: this.loginForm.password
        })
          .then(res => {
            console.log(res)
            if (res.message === 'success') {
              message.success('登录成功');
              this.userInfo = res.data
              window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
              window.localStorage.setItem('token', res.token)
               //2、通过编程式导航跳转到后台主页，路由地址是/home
              this.$router.push('/admin/signin').catch(() => { })
            } else {
              message.error('登录失败');
            }
          })
    },
    // 重置表单内容
    reset() {
      this.loginForm = []
    }
  },
};
</script>
<style lang="less" scoped>


</style>