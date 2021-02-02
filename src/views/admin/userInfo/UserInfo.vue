<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-01-31 17:27:00
 * @FilePath: \active-center-client\src\views\admin\userInfo\UserInfo.vue
-->
<template>
  <transition
    name="component-fade"
    mode="out-in"
  >
    <component
      :is="comName"
      :parentmsg="userInfoForm"
    ></component>
  </transition>
  <a-row
    type="flex"
    justify="center"
    class="person_info_list"
  >
    <a-col
      :span="4"
      class="person_info_box"
    >
      <a-upload
        v-model="userInfoForm.avatar_url"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @click="upDataPic($event)"
      >
        <img
          
        />
        <div>
          <plus-outlined />
          <div class="ant-upload-text">上传头像</div>
        </div>
      </a-upload>
      <a-divider />
      <p class="user_name">{{userInfoForm.name}}</p>
      <a-divider />
      <p
        class="back_home"
        :class="{'change_color' : isTrue, 'original_color' : isFalse}"
        @click.prevent="DetailInfo"
      >主页
      </p>
      <a-divider />
      <p
        class="describe_info"
        :class="{'change_color' : isFalse, 'original_color' : isTrue}"
        @click.prevent="DescInfo"
      >关于我
      </p>
      <a-divider />
    </a-col>
  </a-row>
</template>
<script>
import DetailInfo from "./detailInfo/DetailInfo";
import DescInfo from "./descInfo/DescInfo";
import "./UserInfo.less";
import axios from "../../../api"
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue'
export default {
  name: "UserInfo",
  inject: ['reload'],
  components: {
    DetailInfo,
    DescInfo,
    PlusOutlined,
  },
  data() {
    return {
      comName: 'DetailInfo',
      isTrue: true,
      isFalse: false,
      id: "",
      userInfoForm: {
      },
      fileList: [],
    }
  },
  methods: {
    // 切换子组件
    DetailInfo() {
      this.comName = 'DetailInfo'
      this.isTrue = true
      this.isFalse = false
    },
    DescInfo() {
      this.comName = 'DescInfo'
      this.isFalse = true
      this.isTrue = false
    },
    // 获取数据
    getUserInfo() {
      axios.get('user/' + this.id, {
      })
        .then((res) => {
          this.userInfoForm = res.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 限制头像大小
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isLt2M;
    },
    // 上传头像
    upDataPic(e) {
      let file = e.path[0].files[0];
      // var picData = new FormData();
      // picData.append('file', file, file.name); 
      axios.patch('user/' + this.id, {
        avatar_url: file.name
      })
        .then(res => {
          console.log(res)
          if (res.message == 'success') {
            message.success('上传头像成功')
          } else {
            message.error('上传头像失败')
          }
        })
    }
   },
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.id = userInfo.id
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>