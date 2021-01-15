<!--
 * @Author: lts
 * @Date: 2021-01-15 14:37:00
 * @LastEditTime: 2021-01-15 18:14:53
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\views\Home.vue
-->
<template>
  <div class="app">
    <Header />
    <a-row type="flex" justify="center">
      <a-col class="content" :xs="24" :sm="24" :md="24" :lg="20" :xl="18">
        <router-view></router-view>
      </a-col>
    </a-row>
    <Footer/>
  </div>
</template>
<script>
import Header from "../components/header/Header";
import Footer from '../components/Footer/Footer'
export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  setup() {},
};
</script>
<style lang="less">
.content {
  margin-top: 1rem;
  margin-left: 10px;
  border: 1px solid #eee;
  min-height: 800px;
}
</style>