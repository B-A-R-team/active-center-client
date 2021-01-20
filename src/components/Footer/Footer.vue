<!--
 * @Author: lts
 * @Date: 2021-01-15 18:13:24
 * @LastEditTime: 2021-01-19 20:29:47
 * @FilePath: \active-center-client\src\components\Footer\Footer.vue
-->
<template>
  <div class="footer">
    <a-row type="flex" justify="center">
      <a-col class="footer_center utils_left" :xs="24" :sm="24" :md="24" :lg="20" :xl="18">
        <div class="website_info">
          <div class="about_website">
            <p class="footer_title">关于网站</p>
            <p>安阳师范学院软件学院-大学生创新创业孵化基地网站</p>
            <p>学校地址-河南省安阳师文明大道265号</p>
          </div>
          <a-divider type="vertical" />
          <div class="maintain">
            <p class="footer_title">维护支持</p>
            <p>版权所有：BAR团队</p>
            <p>管理维护：BAR团队</p>
            <p>技术支持：BAR团队</p>
          </div>
          <a-divider type="vertical" />
          <div class="qrcode_box">
            <div class="qrcode">
              <img src="../../assets/weixin.jpg" alt="" />
              <p>安阳师范微信</p>
            </div>
          </div>
        </div>
        <div class="archival_information">
            <span>Copyright © 备案信息：豫ICP备xxxxxx号-x </span>
            <span>联系我们邮箱：xxxxxxxx</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import "./Footer.less";
export default {
  name: "Footer",
};
</script>