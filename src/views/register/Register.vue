<!--
 * @Author: lts
 * @Date: 2021-01-15 14:30:42
 * @LastEditTime: 2021-04-18 20:41:27
 * @FilePath: \active-center-client\src\views\register\Register.vue
-->
<template>
  <div class="steps-content">
    <!-- 内容区 -->
    <a-row
      type="flex"
      justify="center"
    >
      <a-col
        class="register_col utils_left"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="20"
        :xl="18"
      >
        <div class="register_container">
          <!-- 步骤条 -->
          <a-steps :current="current">
            <a-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
          <a-divider id="register_divider">注册</a-divider>
          <!-- 表单 -->
          <div class="register_box">
            <a-form
              :model="registerForm"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              autocomplete="off"
              ref="ruleFormRef"
            >
              <div
                class="a_form_item"
                v-if="current===0"
              >
                <a-form-item
                  name="stuId"
                  label="学号"
                  has-feedback
                >
                  <a-input
                    v-model:value="registerForm.stuId"
                    placeholder="请输入学号"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  name="name"
                  label="姓名"
                >
                  <a-input
                    v-model:value="registerForm.name"
                    placeholder="请输入姓名"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  name="className"
                  label="班级"
                >
                  <a-input
                    v-model:value="registerForm.className"
                    placeholder="请输入班级"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  name="pwd"
                  label="密码"
                >
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
              </div>
              <div
                class="a_form_item"
                v-else
              >
                <a-form-item
                  name="team_id"
                  label="团队"
                >
                  <a-select
                    v-model:value="registerForm.team_id"
                    show-search
                    showArrow
                    :filter-option="filterOption"
                    @change="handleChange"
                    @focus="focus"
                  >
                    <a-select-option
                      v-for="item in teamsName"
                      :key="item.id"
                    >{{item.value}}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <!-- 按钮 -->
              <div class="steps-action">
                <a-button
                  class="next"
                  v-if="current < steps.length - 1"
                  type="primary"
                  @click="nextJump"
                >
                  下一步
                </a-button>
                <div class="btns">
                  <a-button
                    v-if="current > 0"
                    style="margin-left: 8px"
                    @click="goback"
                  >
                    返回
                  </a-button>
                  <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    @click="register"
                  >
                    注册
                  </a-button>
                </div>
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
import "./register.less";
import NProgress from "nprogress";
import { SuccessNotification } from "../../utils/warnning";
let teamsName = [
  { id: "1", value: "Amin团队" },
  { id: "2", value: "Bar团队" },
];
export default {
  name: "register",
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    // 验证学号规则
    let checkstuId = async (rule, value) => {
      // 定义只能输入数字的正则表达式
      const regstuId = /^[1-9]\d{8}$/;
      //  学号合法
      if (regstuId.test(value)) {
        // 判断用户学号是否已注册
        const result = await axios.get("/user?stu_id=" + this.registerForm.stuId);
        console.log(result);
        if (result.data !== null) {
          // 提示学号已注册
          return Promise.reject("学号已注册");
        } else {
          return Promise.resolve();
        }
      }
      else {
        return Promise.reject("请输入合法得九位数字");
      }
    };
    return {
      registerForm: {
        stuId: "",
        pwd: "",
        name: "",
        className: "",
        team_id: ""
      },
      // 存储用户信息
      userInfo: "",
      rules: {
        stuId: [{ required: true, message: "请输入学号", trigger: "blur" },
        { len: 9, validator: checkstuId, trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        className: [{ required: true, message: "请输入班级", trigger: "blur" }],
        team_id: [{ required: true, message: "请添加团队", trigger: "blur" }]
      },
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
      teamsName,
      current: 0,
      steps: [
        {
          title: '完善信息',
        },
        {
          title: '添加团队',
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      this.registerForm.team_id = value;
      console.log( this.registerForm.team_id)
    },
    focus(e) {
      console.log(e);
    },
    filterOption(input, option) {
      return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    async register() {
      this.$refs.ruleFormRef
        .validate()
        .then(async () => {
          NProgress.start();
          const { stuId, pwd, name, className, team_id } = this.registerForm;
          //  注册请求
          const res = await axios.post("/register", {
            stu_id: stuId,
            password: pwd,
            name: name,
            class_name: className,
            team_id: team_id,
          });
          console.log(res);
          if (res.code === 200 && res.data.user_id) {
            NProgress.done();
            SuccessNotification("提示", "注册成功");
            return this.$router.push("/login").catch(() => { });
          }
          NProgress.done();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    // 重置表单内容
    reset() {
      this.registerForm = [];
    },
    nextJump() {
      this.$refs.ruleFormRef
        .validate()
        .then(async () => {
          NProgress.start();
      this.current++;
      })
      .catch((error) => {
        console.log("error", error);
      });
    },
    goback() {
      this.current--;
    }
  },
}
</script>
<style lang="less">
@import "./register.less";
</style>