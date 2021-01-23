<template>
  <div class="detail_info">
    <div class="inner_box">
      <div class="more_info">
        <p class="info-title">学号 : 184804500</p>
        <p class="info-title">性别 : 暂无</p>
        <p class="info-title">班级 : 暂无</p>
        <p class="info-title">联系方式 : 暂无</p>
        <p class="info-title">团队 : Bar Tearm</p>
        <a-button
          ghost
          size="large"
          @click="showModal"
        >修改</a-button>
      </div>
    </div>
    <!-- 修改对话框 -->
    <a-modal
      v-model:visible="visible"
      title="修改信息"
      ok-text="确认"
      cancel-text="取消"
      @cancel="modalClosed"
    >
      <a-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
      >
        <a-form-item
          name="class_name"
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
          label="班级"
        >
          <a-input v-model:value="form.class_name" />
        </a-form-item>
        <a-form-item
          name="gender"
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
          label="性别"
        >
          <a-radio v-model:value="form.gender">男</a-radio>
          <a-radio v-model:value="form.gender">女</a-radio>
        </a-form-item>
        <a-form-item
          name="phone"
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
          label="电话"
          has-feedback
        >
          <a-input v-model:value="form.phone" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import "./DetailInfo.less";
export default {
  name: "DetailInfo",
  data() {
    // 验证电话号码规则
    var checkPhone = (rule, value, callback) => {
      const regphone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regphone.test(value)) {
        //  手机号合法
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      visible: false,
      form: {
        class_name: '',
        phone: '',
        gender: ''
      },
      rules: {
        class_name: [{ required: true, message: "请输入班级", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" },
        {validator: checkPhone, trigger: "blur"}
        ],
      },
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 监听修改信息对话框的关闭事件
    modalClosed(){
      this.$refs.ruleFormRef.resetFields()
    }
  },
}
</script>
<style lang="less" scoped>
</style>