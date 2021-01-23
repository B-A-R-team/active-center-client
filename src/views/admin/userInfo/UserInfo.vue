<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-01-23 18:05:27
 * @FilePath: \active-center-client\src\views\admin\userInfo\UserInfo.vue
-->
<template>
  <transition name="component-fade" mode="out-in">
  <component :is="comName"></component>
  </transition>
  <a-row type="flex" justify="center" class="person_info_list">
        <a-col :span="4" class="person_info_box">
          <!-- <div class="avatar_box"> -->
            <a-avatar :size="120">
                <template #icon><UserOutlined /></template>
            </a-avatar>
          <!-- </div> -->
        <a-divider/>
        <p class="user_name">姓名</p>
        <a-divider/>
        <p class="back_home" 
        :class="{'change_color' : isTrue, 'original_color' : isFalse}" 
        @click.prevent="DetailInfo"
        >主页
        </p>
        <a-divider/>
        <p class="describe_info"
        :class="{'change_color' : isFalse, 'original_color' : isTrue}" 
        @click.prevent="DescInfo"
        >关于我
        </p>
        <a-divider/>
    </a-col>
    </a-row>
</template>
<script>
import DetailInfo from "./detailInfo/DetailInfo";
import DescInfo from "./descInfo/DescInfo";
import "./UserInfo.less";
import { UserOutlined } from "@ant-design/icons-vue";
export default {
  components: {
      DetailInfo,
      DescInfo,
      UserOutlined
  },
  name: "UserInfo",
  data(){
    return{
      comName: 'DetailInfo',
      isTrue: true,
      isFalse: false
    }
  },
  methods:{
        DetailInfo(){
          this.comName='DetailInfo'
          this.isTrue = true
          this.isFalse = false
        },
        DescInfo(){
          this.comName='DescInfo'
          this.isFalse = true
          this.isTrue = false
        }
  }
};
</script>