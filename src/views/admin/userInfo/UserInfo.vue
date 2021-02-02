<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-01-31 17:27:00
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
      v-model="visible"
      :footer="null"
    >
      <div
        class="bigImg-div"
        @click="toGetImg"
      >
        <img
          class="bigImg"
          :src=valueUrl
          v-if="valueUrl"
        >
      </div>
      <a-button
        type="primary"
        @click="uploadFile"
      >更新</a-button>
    </a-modal>
  </div>
</template>
<script>
import DetailInfo from "./detailInfo/DetailInfo";
import DescInfo from "./descInfo/DescInfo";
import "./UserInfo.less";
import axios from "../../../api";
import { message } from 'ant-design-vue';

let inputElement = null
export default {
  name: "UserInfo",
  components: {
    DetailInfo,
    DescInfo,
  },
  data() {
    return {
      comName: 'DetailInfo',
      isTrue: true,
      isFalse: false,
      id: "",
      userInfoForm: {
      },
      visible: false,
      valueUrl: '',
      files: ''
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

    // 点击动态生成input控件
    toGetImg() {
      if (inputElement === null) {
        // 生成文件上传的控件
        inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'file')
        inputElement.style.display = 'none'

        if (window.addEventListener) {
          inputElement.addEventListener('change', this.onGetLocalFile, false)
        } else {
          inputElement.attachEvent('onchange', this.onGetLocalFile)
        }
        document.body.appendChild(inputElement)
      }
      inputElement.click()
    },
    // 获取当地图片
    onGetLocalFile(el) {
      if (el && el.target && el.target.files && el.target.files.length > 0) {
        this.files = el.target.files[0]
        const isLt2M = this.files.size / 1024 / 1024 < 2
        // 判断上传文件的大小
        if (!isLt2M) {
          message.error('上传头像图片大小不能超过 2MB!')
        } else if (this.files.type.indexOf('image') === -1) { //如果不是图片格式
          message.error('请选择图片文件');
        } else {
          const that = this;
          const reader = new FileReader(); // 创建读取文件对象
          reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
          reader.onload = function () { // 文件读取完成后
            // 读取完成后，将结果赋值给img的src
            that.valueUrl = this.result;
          };
        }
      }
    },
    // 上传图片
    uploadFile() {
      // 数据传到后台
      const formData = new FormData()
      formData.append('avatar', this.files);
      axios.post('upload/avatar/' + this.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          if (res.message == 'success') {
            message.success('上传头像成功')
            this.userInfoForm.avatar_url = res.data.avatar_url
            this.valueUrl = ''
          } else {
            message.error('上传头像失败')
          }
        })
    },
    dataChange(data) {
      if (this.comName === 'DetailInfo') {
        this.userInfoForm.gender = data.gender;
        this.userInfoForm.phone = data.phone;
      } else {
        this.userInfoForm.comment = data.comment;
      }
    },
  },
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.id = userInfo.id
    this.getUserInfo()
  },
  // 清除文件上传的控件
  beforeUnmount() {
    if (inputElement) {
      if (window.addEventListener) {
        inputElement.removeEventListener('change', this.onGetLocalFile, false)
      } else {
        inputElement.detachEvent('onchange', this.onGetLocalFile)
      }
      document.body.removeChild(inputElement)
      inputElement = null
      console.log('========inputelement destroy')
    }
  },
}
</script>
<style lang="less" scoped>
.bigImg-div {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #ddd;
  margin: 0 auto;
  cursor: pointer;
  .bigImg {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
}
.ant-btn {
  margin-left: calc(50% - 31.92px);
  margin-top: 10px;
}
</style>