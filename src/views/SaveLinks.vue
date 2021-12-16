<template>
  <el-card class="links">
    <h2>Save Links</h2>
    <div>
      <li v-for="link in links" :key="link.url" style="margin-bottom: 5px">
        <el-link :href="link.url" style="margin-right: 5px">
          {{ link.detail }}
        </el-link>
        <el-button
          v-clipboard="link.url"
          v-clipboard:success="copySuccess"
          v-clipboard:error="copyError"
          type="primary"
          icon="el-icon-edit"
          size="small"
          circle
        />
        <el-popconfirm
          confirm-button-text="はい"
          cancel-button-text="いいえ"
          :icon="InfoFilled"
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

    <el-form ref="newLink" :inline="true" :model="newLink" :rules="inputError">
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
import { Vue, Options } from 'vue-class-component'

interface Link {
  url: string
  detail: string
}

@Options({
  name: 'SaveLinks',
})
export default class extends Vue {
  newLink: Link = {
    url: '',
    detail: '',
  }

  inputError = {
    url: [{ required: true, message: 'リンク先のURLを入力してください' }],
  }

  links: Link[] = []
  formName = 'newLink'
  isValid = true

  get addOk() {
    if (this.newLink.url === '') return false

    this.$refs[this.formName].validate((isValid: boolean) => {
      this.isValid = isValid
    })
    return this.isValid
  }

  mounted() {
    const localLinks = localStorage.getItem('RozelinAppLinks')
    if (localLinks) this.links = JSON.parse(localLinks)
  }

  addLink() {

    if (this.newLink.detail === '') {
      this.newLink.detail = this.newLink.url
    }
    this.links.push({ ...this.newLink })
    localStorage.setItem('RozelinAppLinks', JSON.stringify(this.links))
    this.newLink.url = ''
    this.newLink.detail = ''
  }

  async deleteLink(deleteLink: Link) {
    this.links = this.links.filter((link) => link.url !== deleteLink.url)
    localStorage.setItem('RozelinAppLinks', JSON.stringify(this.links))
  }

  copySuccess() {
    ElNotification({
      message: 'URLをコピーしました',
      type: 'success',
      duration: 5 * 1000,
    })
  }

  copyError() {
    ElNotification({
      message: 'URLのコピーに失敗しました',
      type: 'error',
      duration: 5 * 1000,
    })
  }
}
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
