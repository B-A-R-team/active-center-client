<!--
 * @Author: lts
 * @Date: 2021-01-18 17:14:19
 * @LastEditTime: 2021-01-19 15:15:33
 * @FilePath: \active-center-client\src\views\index\teamsInfo\TeamsInfo.vue
-->
<template>
  <div>
    <a-row class="team_row_box">
      <swiper
        :autoplay="swiper_options.autoplay"
        :speed="swiper_options.speed"
        :spaceBetween="swiper_options.spaceBetween"
        :slidesPerView="swiper_options.slidesPerView"
        :slidesPerGroup="swiper_options.slidesPerGroup"
        :scrollbar="swiper_options.scrollbar"
        class="swiper"
      >
        <swiper-slide v-for="i in 5" :key="i">
          <div class="team_box">
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
          </div></swiper-slide
        >
      </swiper>
    </a-row>
  </div>
</template>
<script>
import SwiperCore, { Autoplay, Pagination, Navigation,Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.less";
import "swiper/components/navigation/navigation.less";
import 'swiper/components/scrollbar/scrollbar.less'
SwiperCore.use([Autoplay, Pagination, Navigation,Scrollbar]);
import { SettingOutlined } from "@ant-design/icons-vue";
import "./TeamsInfo.less";
import { reactive } from "vue";
export default {
  name: "TeamsInfo",
  components: {
    SettingOutlined,
    Swiper,
    SwiperSlide,
  },
  setup() {
    let swiper_options = reactive({

      loop: true,
      slidesPerView: 4,
      slidesPerGroup:4,
      spaceBetween: 20,
      scrollbar: {
        scrollbarElRef: ".swiper-scrollbar",
      },
    });
    return {
      swiper_options,
    };
  },
};
</script>