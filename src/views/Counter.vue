<template>
  <el-card class="container">
    <h2>Σ(･ω･ﾉ)ﾉ！</h2>
    <div>{{ countMessage }}</div>
    <el-button type="success" @click="count++">
      ( ﾟ∀ﾟ)ｱﾊﾊ八八ﾉヽﾉヽﾉヽﾉ ＼ / ＼/ ＼
    </el-button>
    <el-button type="info" @click="count = 0"> ＼(゜ロ＼)(／ロ゜)／ </el-button>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Counter',
  setup() {
    const count = ref(0)

    const countMessage = computed(() => {
      return 'ｲｴｰｲヽ(^o^)丿: ' + count.value
    })

    return { count, countMessage }
  },
})
</script>
