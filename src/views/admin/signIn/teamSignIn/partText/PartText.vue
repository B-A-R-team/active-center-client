<!--
 * @Date: 2021-01-23 13:02:50
 * @Author: smallBlack
 * @LastEditors: smallBlack
 * @LastEditTime: 2021-02-01 21:21:41
 * @FilePath: \active-center-client\src\views\admin\signIn\teamSignIn\partText\PartText.vue
-->

<template>
  <div class="part_text">
    <span class="tabs_title">{{ tabsTitle }}</span>
    <a-divider class="divider" />
  </div>
</template>
<script>

import "./PartText.less"
export default {
  name: "PartText",
  props: {
    tabsTitle: String
  }
};
</script>
<style lang="less" scoped>
</style>