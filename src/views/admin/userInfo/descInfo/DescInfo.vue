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
          <FormOutlined :style="{ fontSize: '25px' }" @click="showModal"/>
          </div>
          {{parentmsg.comment}}
        </template>
      </a-card-meta>
    </a-card>
    <!-- 修改对话框 -->
    <a-modal
      v-model:visible="visible"
      title="修改信息"
      ok-text="确认"
      cancel-text="取消"
      @ok="updateCom"
    >
      <a-form
        :model="form"
      >
      <a-form-item label="修改信息" :label-col="{span:4}"
          :wrapper-col="{span:18}">
      <a-textarea v-model:value="form.comment"/>
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
  inject:['reload'],
  name: "DescInfo",
  props: ["parentmsg"],
  components: {
    FormOutlined,
  },
  data() {
    return {
      visible: false,
      form:{
        comment: ""
      },
      id:"",
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    updateCom() {
      axios.patch('user/' + this.id, {
        comment: this.form.comment,
      })
        .then((res) => {
          console.log(res)
          if (res.message === 'success') {
            message.success('修改成功');
          } else {
            message.error('修改失败');
          }
        });
        this.visible = false
        this.reload()
    }
  },
  created(){
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.id = userInfo.id
    // 从父组件接收到的数据赋给form
    this.form.comment = this.parentmsg.comment
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