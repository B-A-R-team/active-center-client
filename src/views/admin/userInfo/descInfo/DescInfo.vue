<!--
 * @Author: lts
 * @Date: 2021-01-23 18:07:31
 * @LastEditTime: 2021-01-31 17:23:31
 * @FilePath: \active-center-client\src\views\admin\userInfo\descInfo\DescInfo.vue
-->
<template>
  <div class="desc_info_box">
    <a-card
      hoverable
      class="desc_info"
    >
      <!-- <template #cover> -->
      <img src="../../../../assets/desc_info.png" />
      <!-- </template> -->
      <a-card-meta title="描述">
        <template #description>
          <div class="custom-icons-list">
            <FormOutlined
              :style="{ fontSize: '25px' }"
              @click="showModal"
            />
          </div>
          {{parentmsg.comment}}
        </template>
      </a-card-meta>
    </a-card>
    <div class="spin_box_two">
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
      @ok="updateCom"
    >
      <a-form :model="formDesc">
        <a-form-item
          label="修改信息"
          :label-col="{span:4}"
          :wrapper-col="{span:18}"
        >
          <a-textarea v-model:value="formDesc.comment" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import "./DescInfo.less";
import axios from '../../../../api'
import { message } from 'ant-design-vue';
import { FormOutlined } from "@ant-design/icons-vue";
export default {
  name: "DescInfo",
  props: ['parentmsg'],
  emits: ['change'],
  components: {
    FormOutlined,
  },
  data() {
    return {
      visible: false,
      formDesc: {
        comment: ""
      },
      id: "",
      spinning: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    updateCom() {
      axios.patch('user/' + this.id, {
        comment: this.formDesc.comment,
      })
        .then((res) => {
          console.log(res)
          if (res.message === 'success') {
            this.$emit('change', {
              comment: this.formDesc.comment,
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
    }
  },
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.id = userInfo.id
    // 从父组件接收到的数据赋给form
    this.formDesc.comment = this.parentmsg.comment
  }
}
</script>
<style lang="less" scoped>
.custom-icons-list ::v-deep(.anticon) {
  margin: 0;
  padding: 0;
  float: right;
}
</style>