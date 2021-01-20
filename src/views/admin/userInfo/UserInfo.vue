<!--
 * @Author: lts
 * @Date: 2021-01-16 09:31:10
 * @LastEditTime: 2021-01-20 12:50:05
 * @FilePath: \active-center-client\src\views\admin\userInfo\UserInfo.vue
-->
<template>
  <a-row>
    <a-col :span="12">
      <a-card title="个人信息">
        <template #extra><a-button type="primary">修改</a-button> </template>
        <p>头像</p>
        <a-divider/>
        <p>姓名</p>
        <a-divider/>
        <p>学号</p>
        <a-divider/>
        <p>性别</p>
        <a-divider/>
        <p>班级</p>
        <a-divider/>
        <p>联系方式</p>
        <a-divider/>
        <p>描述</p>
        <a-divider/>
        <p>团队</p>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: "UserInfo",
};
</script>