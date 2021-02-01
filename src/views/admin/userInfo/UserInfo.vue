<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-01-23 18:05:27
 * @FilePath: \active-center-client\src\views\admin\userInfo\UserInfo.vue
-->
<template>
  <div class="person_info">
    <transition
      name="component-fade"
      mode="out-in"
    >
      <component
        :is="comName"
        :parentmsg="userInfoForm"
        @change="dataChange"
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
        <div
          class="pict_box"
          @click="showModal"
        >
          <img
            :src="'http://www.barteam.cn:2048'+ userInfoForm.avatar_url"
            alt=""
          >
        </div>
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
    <!-- 修改头像弹框 -->
    <a-modal
      v-model:visible="visible"
      :footer="null"
    >
      <a-upload
        v-model:fileList="fileList"
        class="avatar-uploader"
        list-type="picture-card"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
      >
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="avatar"
        />
        <div v-else>
          <plus-outlined/>
          <div class="ant-upload-text">上传头像</div>
        </div>
      </a-upload>
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        style="margin-top: 16px"
        @click="upDataPic"
      >
        更新
      </a-button>
    </a-modal>
    <!-- 头像预览 -->
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        alt="example"
        style="width: 100%"
        :src="previewImage"
      />
    </a-modal>
  </div>
</template>
<script>
import DetailInfo from "./detailInfo/DetailInfo";
import DescInfo from "./descInfo/DescInfo";
import "./UserInfo.less";
import axios from "../../../api"
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  name: "UserInfo",
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
      visible: false,
      previewVisible: false,
      previewImage: "",
      file: '',
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
    showModal() {
      this.visible = true;
    },

    handleChange(e) {
      this.file = e.file;
    },
    // 返回false手动上传
    beforeUpload() {
      return false;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview() {
      if (!this.file.url && !this.file.preview) {
        this.file.preview = await getBase64(this.file.originFileObj);
      }
      this.previewImage = this.file.url || this.file.preview;
      this.previewVisible = true;
    },
    // 上传头像
    upDataPic() {
      const formData = new FormData();
      formData.append('avatar', this.file);
      axios.post('upload/avatar/' + this.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          if (res.message == 'success') {
            message.success('上传头像成功')
          
            this.fileList = []
            // this.userInfoForm.avatar_url = res.data.avatar_url
          } else {
            message.error('上传头像失败')
          }
        })
    },

    dataChange({ gender, phone, comment }) {
      this.userInfoForm.gender = gender;
      this.userInfoForm.phone = phone;
      this.userInfoForm.comment = comment;
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