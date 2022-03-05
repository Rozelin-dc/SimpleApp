<template>
  <div class="container">
    <h1>This is an about page.</h1>
    Vue.jsとTypeScriptで作ったWeb上で動く簡単なアプリです
    <br />
    view on
    <el-link href="https://github.com/Rozelin-dc/SimpleApp" type="primary">
      Git Hub
    </el-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About'
})
</script>
