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