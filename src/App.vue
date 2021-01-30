<!--
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-15 15:32:42
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\App.vue
-->
<template>
  <div id="nav">
    <router-link to="/"></router-link> 
    <router-view  v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="less">

</style>
