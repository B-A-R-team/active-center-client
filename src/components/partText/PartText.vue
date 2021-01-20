<!--
 * @Author: lts
 * @Date: 2021-01-19 12:40:30
 * @LastEditTime: 2021-01-19 15:21:15
 * @FilePath: \active-center-client\src\components\partText\PartText.vue
-->
<template>
  <a-row type="flex" justify="space-between">
    <a-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="24"
      :xl="24"
      :style="{ textAlign: 'center' }"
      ><div class="title_text">
        <p>{{textName}}</p>
        </div>
    </a-col>
  </a-row>
</template>
<script>
import './PartText.less'
export default {
    name:'PartText',
    props:{
        textName:String
    },
    setup() {
    }
}
</script>