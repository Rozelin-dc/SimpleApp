<template>
  <el-card class="links">
    <h2>Save Links</h2>
    <div>
      <li v-for="link in links" :key="link.url" style="margin-bottom: 5px">
        <el-link :href="link.url" style="margin-right: 5px">
          {{ link.detail }}
        </el-link>
        <el-tooltip
          effect="light"
          placement="top"
          content="クリックでリンクアドレスをコピー"
        >
          <el-button
            v-clipboard="link.url"
            v-clipboard:success="copySuccess"
            v-clipboard:error="copyError"
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
          />
        </el-tooltip>
        <el-button type="info" size="small" @click="deleteLink(link)">
          削除
        </el-button>
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

    this.$refs[this.formName].validate((isValid) => {
      this.isValid = isValid
    })
    return this.isValid
  }

  mounted() {
    const localLinks = localStorage.getItem('RozelinAppLinks')
    if (localLinks) this.links = JSON.parse(localLinks)
  }

  addLink() {
    if (this.newLink.detail === '') this.newLink.detail = this.newLink.url
    this.links.push({ ...this.newLink })
    localStorage.setItem('RozelinAppLinks', JSON.stringify(this.links))
    this.newLink.url = ''
    this.newLink.detail = ''
  }

  async deleteLink(deleteLink: Link) {
    try {
      await this.$confirm(
        '次のリンクを削除します。よろしいですか？\nURL: ' +
          deleteLink.url +
          '\n詳細: ' +
          deleteLink.detail,
        { customClass: 'delete-link-confirm' }
      )
    } catch {
      return
    }

    this.links = this.links.filter((link) => link.url !== deleteLink.url)
    localStorage.setItem('RozelinAppLinks', JSON.stringify(this.links))
  }

  copySuccess() {
    this.$message({
      message: 'URLをコピーしました',
      type: 'success',
      duration: 5 * 1000,
    })
  }

  copyError() {
    this.$message({
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
