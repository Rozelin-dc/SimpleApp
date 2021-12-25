<template>
  <el-card class="links">
    <h2>Save Links</h2>
    <div>
      <li v-for="link in links" :key="link.url" style="margin-bottom: 5px">
        <el-link :href="link.url" style="margin-right: 5px">
          {{ link.detail }}
        </el-link>
        <el-button
          circle
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click="copy(link.url)"
        />
        <el-popconfirm
          confirm-button-text="はい"
          cancel-button-text="いいえ"
          icon-color="red"
          title="リンクを削除します。よろしいですか？"
          @confirm="deleteLink(link)"
          @cancel="() => {}"
        >
          <template #reference>
            <el-button type="info" size="small"> 削除 </el-button>
          </template>
        </el-popconfirm>
      </li>
    </div>

    <el-form ref="formRef" :inline="true" :model="newLink" :rules="inputError">
      <el-form-item label="URL" prop="url">
        <el-input
          v-model="newLink.url"
          type="text"
          placeholder="リンク先のURLを入力"
          name="url"
        />
      </el-form-item>
      <el-form-item label="詳細" prop="detail">
        <el-input
          v-model="newLink.detail"
          type="text"
          name="detail"
          placeholder="リンクの詳細や説明を入力"
        />
      </el-form-item>
      <el-button :disabled="!addOk" type="primary" @click="addLink">
        add
      </el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus'
import { computed, defineComponent, onMounted, reactive, ref, Ref } from 'vue'

interface Link {
  url: string
  detail: string
}

export default defineComponent({
  name: 'SaveLinks',
  setup() {
    let newLink: Link = reactive({
      url: '',
      detail: '',
    })
    const links: Ref<Link[]> = ref([])
    const formRef = ref()
    const inputError = reactive({
      url: [{ required: true, message: 'リンク先のURLを入力してください' }],
    })

    let isValid = true
    const addOk = computed(() => {
      if (newLink.url === '') return false

      formRef.value.validate((v: boolean) => {
        isValid = v
      })
      return isValid
    })

    const addLink = () => {
      if (newLink.detail === '') {
        newLink.detail = newLink.url
      }
      links.value.push({ ...newLink })
      setLinks()
      newLink.url = ''
      newLink.detail = ''
    }

    const deleteLink = (deleteLink: Link) => {
      links.value = links.value.filter((link) => link.url !== deleteLink.url)
      setLinks()
    }

    const setLinks = () => {
      if (links.value.length === 0) {
        localStorage.setItem('RozelinAppLinks', JSON.stringify([]))
      } else {
        localStorage.setItem('RozelinAppLinks', JSON.stringify(links.value))
      }
    }

    const copy = (value: string) => {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          ElNotification({
            message: 'URLのコピーに成功しました',
            type: 'success',
            duration: 5 * 1000,
          })
        })
        .catch((e) => {
          console.error(e)
          ElNotification({
            message: 'URLのコピーに失敗しました',
            type: 'error',
            duration: 5 * 1000,
          })
        })
    }

    onMounted(() => {
      const localLinks = localStorage.getItem('RozelinAppLinks')
      if (localLinks) links.value = JSON.parse(localLinks)
    })

    return {
      newLink,
      links,
      inputError,
      formRef,
      addOk,
      addLink,
      deleteLink,
      copy,
    }
  },
})
</script>

<style>
.delete-link-confirm {
  white-space: pre-line;
}
</style>

<style scoped>
.links {
  width: 80%;
  margin: 0 auto;
}
</style>
