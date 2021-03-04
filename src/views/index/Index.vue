<!--
 * @Author: lts
 * @Date: 2021-01-15 14:29:15
 * @LastEditTime: 2021-03-04 21:36:09
 * @FilePath: \active-center-client\src\views\index\Index.vue
-->
<template>
  <div>
    <my-swiper />
    <a-row type="flex" justify="center">
      <a-col
        class="content utils_left"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="20"
        :xl="18"
      >
        <PartText textName="公告" />
        <notification />
        <PartText textName="团队信息" />
        <TeamsInfo />
      </a-col>
    </a-row>
    <div class="my_backtop">
      <a-back-top :visibilityHeight="100" />
    </div>
  </div>
</template>
<script>
import "./Index.less";
import MySwiper from "./mySwiper/MySwiper";
import Notification from "./notification/Notification.vue";
import PartText from "../../components/partText/PartText";
import TeamsInfo from "./teamsInfo/TeamsInfo";
export default {
  name: "Index",
  components: {
    MySwiper,
    Notification,
    PartText,
    TeamsInfo,
  },
  setup() {
    // let teamArr = ref(["", "", "", "", "", "", "", ""]);
    // return {
    //   teamArr,
    // };
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