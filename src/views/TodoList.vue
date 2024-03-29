<template>
  <el-card class="container">
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
    <el-form ref="formRef" :inline="true" :model="newTask" :rules="inputError">
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
import { computed, defineComponent, reactive, ref, Ref, onMounted } from 'vue'

interface Task {
  number: number
  name: string
  date: string
  status: string
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const inputError = reactive({
      name: [{ required: true, message: 'タスクの名前を入力してください。' }]
    })

    let newTask = reactive({
      name: '',
      date: '',
      status: ''
    })

    const tasks: Ref<Task[]> = ref([])
    const formRef = ref()
    const key: Ref<'a' | 'b'> = ref('a')

    let multipleSelection: Task[] = []

    let isValid = true
    const addOk = computed(() => {
      if (newTask.name === '') return false

      formRef.value.validate((v: boolean) => {
        isValid = v
      })
      return isValid
    })

    let newTaskNumber = 0

    const addTask = () => {
      if (newTask.date === '') {
        newTask.date = 'なし'
      }
      if (newTask.status === '') {
        newTask.status = '未完'
      }

      tasks.value.push({
        ...newTask,
        number: newTaskNumber
      })

      newTaskNumber += 1
      newTask.name = ''
      newTask.date = ''
      newTask.status = ''
      refreshTable()
    }

    const taskComplete = (taskId: number) => {
      for (let i = 0; i < tasks.value.length; i++) {
        const index = tasks.value[i]
        if (index.number === taskId) {
          tasks.value[i] = { ...index, status: '完了' }
          break
        }
      }
      refreshTable()
    }

    const taskDelete = (taskId: number) => {
      tasks.value = tasks.value.filter(task => task.number !== taskId)
      refreshTable()
    }

    const taskCompleteBulk = () => {
      tasks.value.forEach(task => {
        if (
          multipleSelection.some(selected => selected.number === task.number)
        ) {
          task.status = '完了'
        }
      })
      refreshTable()
    }

    const taskDeleteBulk = () => {
      tasks.value = tasks.value.filter(
        task =>
          !multipleSelection.some(selected => selected.number === task.number)
      )
      refreshTable()
    }

    const handleSelectionChange = (val: Task[]) => {
      multipleSelection = val
    }

    const refreshTable = () => {
      if (key.value === 'a') {
        key.value = 'b'
      } else {
        key.value = 'a'
      }

      if (tasks.value.length === 0) {
        localStorage.removeItem('RozelinAppTasks')
      } else {
        localStorage.setItem('RozelinAppTasks', JSON.stringify(tasks.value))
      }
    }

    onMounted(() => {
      const localTask = localStorage.getItem('RozelinAppTasks')
      if (localTask) {
        tasks.value = JSON.parse(localTask)
        newTaskNumber = tasks.value[tasks.value.length - 1].number + 2
      }
    })

    return {
      inputError,
      newTask,
      tasks,
      formRef,
      key,
      addOk,
      addTask,
      taskComplete,
      taskDelete,
      taskCompleteBulk,
      taskDeleteBulk,
      handleSelectionChange
    }
  }
})
</script>

<style scoped>
.button-wrapper {
  width: 265px;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
