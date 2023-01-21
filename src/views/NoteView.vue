<template>
  <div class="note" v-if="note">
    <div class="container">
      <div class="note__top">
        <span @click="$router.back()" class="note__back">Go back</span>
        <div class="note__btns">
          <button class="btn danger" v-if="undo" @click="onUndo">undo</button>
          <button class="btn danger" v-if="note.configurable" @click="this.modalUnconfig = true">make unconfigurable</button>
          <button class="btn danger" @click="this.modalDelete = true">delete</button>
        </div>
      </div>
      <input type="text" class="input-text" v-model="title" :disabled="!note.configurable" />
      <hr class="hr">
      <form @submit.prevent="addTask" class="note__add-task" v-if="note.configurable">
        <input type="text" class="input-text" placeholder="Task title" v-model="taskText">
        <button type="submit" class="btn">add</button>
      </form>
      <div class="note__tasks">
        <div class="note__task" v-for="(task, idx) in tasks" :key="task.id">
          <div class="note__task-text" :class="{ completed: task.completed }">
            <span class="note__task-number">{{ idx + 1 }}).</span>
            <input type="text" class="input-text" v-model="task.text" :disabled="!note.configurable">
          </div>
          <div class="note__task-control">
            <input type="checkbox" class="checkbox" v-model="task.completed" :disabled="!note.configurable">
            <button class="note__task-delete" @click="removeTask(task.id)" v-if="note.configurable">&#9587;</button>
          </div>
        </div>
      </div>
      <button class="btn note__wide-btn" @click="onUpdate" v-if="updatable">update</button>
      <button class="btn danger note__wide-btn" @click="onReset" v-if="updatable">reset changes</button>
    </div>
    <modal v-if="modalDelete" @click="this.modalDelete = false">
      <template #text>
        Confirm delete {{ title }}
      </template>
      <template #btns>
        <button class="btn" @click="this.modalDelete = false">cancel</button>
        <button class="btn danger" @click="onDelete">confirm</button>
      </template>
    </modal>
    <modal v-if="modalUnconfig" @click="this.modalUnconfig = false">
      <template #text>
        Confirm unconfiguration {{ title }}
      </template>
      <template #btns>
        <button class="btn" @click="this.modalUnconfig = false">cancel</button>
        <button class="btn danger" @click="onUnconfig">confirm</button>
      </template>
    </modal>
  </div>
  <div v-else>Error - there is not this note</div>
</template>

<script>
export default {
  computed: {
    note() {
      return this.$store.getters.noteById(+this.$route.params.id)
    },
    updatable() {
      if (this.title !== this.note.title || JSON.stringify(this.tasks) !== JSON.stringify(this.note.tasks)) {
        return true
      } else {
        return false
      }
    },
    undo() {
      if (this.title !== this.resetedTitle || JSON.stringify(this.tasks) !== JSON.stringify(this.resetedTasks)) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      title: '',
      tasks: [],
      resetedTitle: '',
      resetedTasks: [],
      taskText: '',
      modalDelete: false,
      modalUnconfig: false
    }
  },
  mounted() {
    this.title = this.resetedTitle = this.note.title
    this.tasks = this.resetedTasks = JSON.parse(JSON.stringify(this.note.tasks))
  },
  methods: {
    onDelete() {
      this.modalDelete = false
      this.$store.dispatch('deleteNote', this.note)
      this.$router.push('/')
    },
    onUnconfig() {
      this.title = this.note.title
      this.tasks = JSON.parse(JSON.stringify(this.note.tasks))
      this.modalUnconfig = false
      this.$store.dispatch('unconfigNote', this.note)
    },
    onUpdate() {
      this.$store.dispatch('updateNote', {
        id: this.note.id,
        title: this.title,
        tasks: this.tasks
      })
      this.$router.push('/')
    },
    onReset() {
      this.resetedTitle = this.title
      this.resetedTasks = JSON.parse(JSON.stringify(this.tasks))
      this.title = this.note.title
      this.tasks = JSON.parse(JSON.stringify(this.note.tasks))
    },
    onUndo() {
      this.title = this.resetedTitle
      this.tasks = JSON.parse(JSON.stringify(this.resetedTasks))
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    addTask() {
      const task = {
        id: Date.now(),
        text: this.taskText,
        completed: false
      }

      if (this.taskText.trim()) {
        this.tasks.push(task)
        this.taskText = ''
      }
    }
  },
}
</script>