<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Rozelin's Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'Home',
  components: {
    HelloWorld,
  },
})
export default class extends Vue {}
</script>
