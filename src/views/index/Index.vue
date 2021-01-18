<!--
 * @Author: lts
 * @Date: 2021-01-15 14:29:15
 * @LastEditTime: 2021-01-18 09:02:17
 * @FilePath: \active-center-client\src\views\index\Index.vue
-->
<template>
  <div>
    <!-- <a-button type="primary">Button</a-button> -->
    <!-- 首页 -->
    <a-row type="flex" justify="space-between" class="index_top">
      <a-col class="carousel_box" :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <a-carousel
          :autoplaySpeed="9000"
          autoplay
          effect="fade"
          style="
             {
              height: 100%;
            }
          "
        >
          <img src="../../assets/1.jpg" />
          <img src="../../assets/2.jpg" />
          <img src="../../assets/3.jpg" />
        </a-carousel>
      </a-col>
      <a-col class="notification" :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
        <span>
          <div>
            <a-divider type="vertical" />
            <span>公告栏 </span>
          </div>
          <NotificationOutlined />
        </span>
        <a-divider />

        <div class="notification_content">
          欢迎进入软件学院大学生创新创业基地！
        </div>
      </a-col>
    </a-row>
    <a-row class="team_row_box">
      <div class="team_box" v-for="(item, index) in teamArr" :key="index">
        <div class="team_img">
          <img
            alt="example"
            :style="{ width: '100%' }"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </div>
        <div class="team_info">
          <a-avatar class="team_avatar" />
          <div class="team_name_desc">
            <span class="team_name">团队名</span>
            <span class="team_desc">团队详情团队详情团队详详</span>
          </div>
        </div>
        <div class="team_homepage">
          <setting-outlined key="setting" class="team_homepage_icon" />
          <span>查看主页</span>
        </div>
      </div>
    </a-row>
    <div class="my_backtop">
      <a-back-top visibilityHeight="100" />
    </div>
  </div>
</template>
<script>
import "./Index.less";
import { NotificationOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
  name: "Index",
  components: {
    NotificationOutlined,
    SettingOutlined,
  },
  setup() {
    let teamArr = ref(["", "", "", "", "", "", "", ""]);
    return {
      teamArr,
    };
  },
};
</script>
<style lang="less" scoped>
.ant-carousel ::v-deep(.slick-slide) {
  text-align: center;
  height: 160px;
  //   line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel ::v-deep(.slick-slide h3) {
  color: #fff;
}
</style>