<template>
  <el-card class="card">
    <h2>Todo List</h2>
    <el-table
      ref="tasksTable"
      :key="key"
      :data="tasks"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column prop="name" label="タスク" />
      <el-table-column prop="date" label="期限" />
      <el-table-column prop="status" label="状態" />
      <el-table-column label="完了/削除">
        <template #default="scope">
          <el-button
            type="success"
            size="small"
            @click="taskComplete(scope.row.number)"
          >
            完了
          </el-button>
          <el-button
            type="info"
            size="small"
            @click="taskDelete(scope.row.number)"
          >
            削除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-wrapper">
      <el-button type="success" @click="taskCompleteBulk">
        まとめて完了
      </el-button>
      <el-button type="info" @click="taskDeleteBulk"> まとめて削除 </el-button>
    </div>
    <el-divider />
    <el-form ref="newTask" :inline="true" :model="newTask" :rules="inputError">
      <el-form-item label="タスク" prop="name">
        <el-input
          v-model="newTask.name"
          type="text"
          placeholder="タスクの名前を入力"
          name="name"
        />
      </el-form-item>
      <el-form-item label="期限" prop="date">
        <el-input v-model="newTask.date" type="date" name="date" />
        <!-- <el-date-picker v-model="newTaskDate" name="date" /> -->
      </el-form-item>
      <el-form-item label="状態" prop="status">
        <el-input
          v-model="newTask.status"
          type="text"
          name="status"
          placeholder="タスクの状態を入力"
        />
      </el-form-item>
      <el-button :disabled="!addOk" type="primary" @click="addTask">
        add
      </el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

interface Task {
  number: number
  name: string
  date: string
  status: string
}

@Options({
  name: 'TodoList',
})
export default class extends Vue {
  inputError = {
    name: [{ required: true, message: 'タスクの名前を入力してください。' }],
  }

  newTask = {
    name: '',
    date: '',
    status: '',
  }

  tasks: Task[] = []
  multipleSelection: Task[] = []
  newTaskNumber = 0
  formName = 'newTask'
  isValid = true
  key: 'a' | 'b' = 'a'

  get addOk() {
    if (this.newTask.name === '') return false

    this.$refs[this.formName].validate((isValid) => {
      this.isValid = isValid
    })
    return this.isValid
  }

  mounted() {
    const localTask = localStorage.getItem('RozelinAppTasks')
    if (localTask) {
      this.tasks = JSON.parse(localTask)
      this.newTaskNumber = this.tasks[this.tasks.length - 1].number + 2
    }
  }

  addTask() {
    if (this.newTask.date === '') {
      this.newTask.date = 'なし'
    }
    if (this.newTask.status === '') {
      this.newTask.status = '未完'
    }
    this.tasks.push({
      ...this.newTask,
      number: this.newTaskNumber,
    })
    this.newTaskNumber = this.newTaskNumber + 1
    this.newTask.name = ''
    this.newTask.date = ''
    this.newTask.status = ''
    this.refleshTable()
  }

  taskComplete(taskId: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      const index = this.tasks[i]
      if (index.number === taskId) {
        this.tasks[i] = { ...index, status: '完了' }
        break
      }
    }
    this.refleshTable()
  }

  taskDelete(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.number !== taskId)
    this.refleshTable()
  }

  taskCompleteBulk() {
    this.tasks.forEach((task) => {
      if (
        this.multipleSelection.some(
          (selected) => selected.number === task.number
        )
      ) {
        task.status = '完了'
      }
    })
    this.refleshTable()
  }

  taskDeleteBulk() {
    this.tasks = this.tasks.filter(
      (task) =>
        !this.multipleSelection.some(
          (selected) => selected.number === task.number
        )
    )
    this.refleshTable()
  }

  handleSelectionChange(val: Task[]) {
    this.multipleSelection = val
  }

  refleshTable() {
    if (this.key === 'a') this.key = 'b'
    else this.key = 'a'
    localStorage.setItem('RozelinAppTasks', JSON.stringify(this.tasks))
  }
}
</script>

<style scoped>
.card {
  width: 80%;
  margin: 0 auto;
}

.button-wrapper {
  width: 265px;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
