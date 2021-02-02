<template>
  <div class="detail_info">
    <div class="inner_box">
      <div class="more_info">
        <p class="info-title">学号 : {{parentmsg.stu_id}}</p>
        <p
          class="info-title"
          v-if="parentmsg.gender==0"
        >性别 : 女</p>
        <p
          class="info-title"
          v-else
        >性别 : 男</p>
        <p class="info-title">班级 : {{parentmsg.class_name}}</p>
        <p class="info-title">联系方式 : {{parentmsg.phone}}</p>
        <p class="info-title">团队 : {{parentmsg.team}}</p>
        <a-button
          ghost
          size="large"
          @click="showModal"
        >修改</a-button>
      </div>
    </div>
    <div class="spin_box">
      <a-spin
        :spinning="spinning"
        size="large"
      >
      </a-spin>
    </div>
    <!-- 修改对话框 -->
    <a-modal
      v-model:visible="visible"
      title="修改信息"
      ok-text="确认"
      cancel-text="取消"
      @cancel="modalClosed"
      @ok="updateMsg"
    >
      <a-form
        :model="formDetail"
        :rules="rules"
        ref="ruleFormRef"
      >
        <a-form-item
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
          label="性别"
        >
          <a-radio-group v-model:value="formDetail.gender">
            <a-radio :value="0">
              女
            </a-radio>
            <a-radio :value="1">
              男
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          name="phone"
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
          label="电话"
          has-feedback
        >
          <a-input v-model:value="formDetail.phone" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import "./DetailInfo.less";
import axios from '../../../../api'
import { message } from 'ant-design-vue';
export default {
  name: "DetailInfo",
  props: ['parentmsg'],
  emits: ['change'],
  data() {
    // 验证电话号码规则
    let checkPhone = async (rule, value) => {
      const regphone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regphone.test(value)) {
        //  手机号合法
        return Promise.resolve();
      }
      return Promise.reject("请输入合法得手机号");
    };
    return {
      visible: false,
      rules: {
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" },
        { validator: checkPhone, len: 11, trigger: "blur" }
        ],
      },
      id: "",
      formDetail: {
        phone: "",
        gender: "",
      },
      spinning: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 监听修改信息对话框的关闭事件
    modalClosed() {
      this.$refs.ruleFormRef.resetFields()
    },
    updateMsg() {

      axios.patch('user/' + this.id, {
        gender: this.formDetail.gender,
        phone: this.formDetail.phone,
      })
        .then((res) => {
          console.log(res)
          if (res.message === 'success') {
            this.$emit('change', {
              gender: this.formDetail.gender,
              phone: this.formDetail.phone,
            })
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
        });
      this.visible = false
      this.spinning = true
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    },
  },
  watch: {
    parentmsg(v) {
      this.formDetail.phone = v.phone;
      this.formDetail.gender = v.gender;
    },
  },
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.id = userInfo.id
    // 从父组件接收到的数据赋给formDetail
    this.formDetail.phone = this.parentmsg.phone
    this.formDetail.gender = this.parentmsg.gender
  }
}
</script>
<style lang="less" scoped>
</style>