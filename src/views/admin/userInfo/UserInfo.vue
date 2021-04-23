<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-04-18 15:54:29
 * @FilePath: \active-center-client\src\views\admin\userInfo\UserInfo.vue
-->
<template>
  <div class="personal_box">
    <a-spin :spinning="loading" size="large">
      <div class="person_info">
        <transition name="component-fade" mode="out-in">
          <component
            :is="comName"
            :parentmsg="userInfoForm"
            @change="dataChange"
          ></component>
        </transition>
        <a-row type="flex" justify="center" class="person_info_list">
          <a-col class="person_info_box">
            <div class="pict_box" @click="showModal">
              <a-avatar
                :src="BASE_URL + userInfoForm.avatar_url"
                alt=""
                :size="85"
              />
              <div class="mask_box">更换头像</div>
            </div>
            <a-modal
              title="修改头像"
              v-model:visible="visible"
              :footer="null"
              class="updateAvatarModal"
            >
              <div
                class="clearfix"
                :style="{ height: '120px', display: 'flex' }"
              >
                <a-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  :file-list="fileList"
                  :headers="headers"
                  @preview="handlePreview"
                  @change="handleChange"
                  name="avatar"
                >
                  <div v-if="fileList.length === 0">
                    <plus-outlined />
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
                <div
                  :style="{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '20px',
                  }"
                >
                  <div
                    :style="{
                      color: '#f5222d',
                      height: '30px',
                    }"
                  >
                    提示：上传完头像后，该弹窗将会自动关闭
                  </div>
                  <div
                    v-if="countDown.flag"
                    :style="{
                      height: '50px',
                    }"
                  >
                    倒计时:{{ countDown.count }}
                  </div>
                </div>
              </div>
            </a-modal>
            <a-divider />
            <p class="user_name">{{ userInfoForm.name }}</p>
            <a-divider />
            <p
              class="back_home"
              :class="{ change_color: isTrue, original_color: isFalse }"
              @click.prevent="DetailInfo"
            >
              主页
            </p>
            <a-divider />
            <p
              class="describe_info"
              :class="{ change_color: isFalse, original_color: isTrue }"
              @click.prevent="DescInfo"
            >
              关于我
            </p>
            <a-divider />
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>
<script>
import DetailInfo from "./detailInfo/DetailInfo";
import DescInfo from "./descInfo/DescInfo";
import "./UserInfo.less";
import axios from "../../../api";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../utils/warnning";
import { BASE_URL } from "../../../utils/constantsUtil";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
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
      BASE_URL,
      countDown: {
        count: 3,
        flag: false,
      },
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      uploadUrl: BASE_URL + "/api/upload/avatar/",
      comName: "DetailInfo",
      isTrue: true,
      isFalse: false,
      id: "",
      userInfoForm: {},
      visible: false,
      confirmLoading: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      loading: true,
    };
  },
  inject: ["getAvatar"],
  methods: {
    // 切换子组件
    DetailInfo() {
      this.comName = "DetailInfo";
      this.isTrue = true;
      this.isFalse = false;
    },
    DescInfo() {
      this.comName = "DescInfo";
      this.isFalse = true;
      this.isTrue = false;
    },
    // 获取数据
    getUserInfo() {
      axios
        .get("user/" + this.id, {})
        .then((res) => {
          this.userInfoForm = res.data;
          this.loading = false

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showModal() {
      this.fileList = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: "http://www.barteam.cn:2048" + this.userInfoForm.avatar_url,
        },
      ];
      this.visible = true;
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      console.log(fileList);
      this.fileList = fileList;

      if (
        fileList[0] &&
        fileList[0].response &&
        fileList[0].response.code === 200
      ) {
        let fileName = fileList[0].name;
        let ext = fileName.substr(fileName.lastIndexOf(".") + 1);
        ext = ext.toLowerCase();
        if (ext != "jpg" && ext != "png" && ext != "jpeg" && ext != "gif") {
          this.fileList = [];
          return ErrorNotification("错误", "只能上传图片，请重新上传");
        }
        this.userInfoForm.avatar_url = fileList[0].response.data.avatar_url;
        SuccessNotification("提示", "修改成功！3秒后自动关闭该弹窗");
        //倒计时
        this.countDown.flag = true;
        //修改缓存中的头像
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        userInfo.avatar_url = fileList[0].response.data.avatar_url;
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.getAvatar();
        let timeInterval = setInterval(() => {
          this.countDown.count--;
        }, 1000);
        setTimeout(() => {
          clearInterval(timeInterval);
          this.visible = false;
          this.countDown = {
            count: 3,
            flag: false,
          };
        }, 3000);
      
      }
    },
    dataChange(data) {
      if (this.comName === "DetailInfo") {
        this.userInfoForm.gender = data.gender;
        this.userInfoForm.phone = data.phone;
      } else {
        this.userInfoForm.comment = data.comment;
      }
    },
  },
  created() {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.id = userInfo.id;
    this.getUserInfo();
    this.uploadUrl += userInfo.id;
  },
};
</script>
<style lang="less" scoped>
</style>