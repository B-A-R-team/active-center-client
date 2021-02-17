<!--
 * @Author: lts
 * @Date: 2021-01-18 17:14:19
 * @LastEditTime: 2021-02-17 20:22:18
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
        <swiper-slide v-for="(item,index) in teamsInfo" :key="index">
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
                <span class="team_name">{{item.name}}</span>
                <span class="team_desc">团队老师：{{item.teacher}}</span>
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
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.less";
import "swiper/components/navigation/navigation.less";
import "swiper/components/scrollbar/scrollbar.less";
SwiperCore.use([Autoplay, Pagination, Navigation, Scrollbar]);
import { SettingOutlined } from "@ant-design/icons-vue";
import "./TeamsInfo.less";
import { onMounted, reactive, ref } from "vue";
import axios from "../../../api";
export default {
  name: "TeamsInfo",
  components: {
    SettingOutlined,
    Swiper,
    SwiperSlide,
  },
  setup() {
    let teamsInfo = ref([
      {
        name: "",
        teacher: "",
      },
    ]);
    let swiper_options = reactive({
      loop: true,
      slidesPerView: 4,
      // slidesPerGroup: 4,
      spaceBetween: 20,
      scrollbar: {
        scrollbarElRef: ".swiper-scrollbar",
      },
    });
    onMounted(async () => {
      const res = await axios("/team");
      // console.log(res);
      teamsInfo.value  = res.data
      // console.log(teamsInfo)
    });
    return {
      swiper_options,
      teamsInfo
    };
  },
};
</script>