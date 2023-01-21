<template>
  <form class="notes-form" @submit.prevent="createNote">
    <input type="text" placeholder="Title of note" v-model="title" class="input-text"/>
    <div class="notes-form__control">
      <input type="text" placeholder="Title of task" v-model="taskText" class="input-text" @keydown.enter="addTask" />
      <button class="btn" type="button" @click="addTask">add</button>
    </div>
    <div class="notes-form__tasks">
      <div class="notes-form__task" v-for="(task, idx) in tasks" :key="task.id">
        <div class="notes-form__task-number">{{ idx + 1 }}).&nbsp;</div>
        <div class="notes-form__task-text">{{ task.text }}</div>
      </div>
    </div>
    <button type="submit" class="btn notes-form__submit">create</button>
    <hr class="hr" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      taskText: '',
      tasks: []
    }
  },
  methods: {
    createNote() {
      const note = {
        id: Date.now(),
        title: this.title,
        configurable: true,
        tasks: this.tasks
      }

      if (this.title.trim() && this.tasks.length) {
        this.$store.dispatch('createNote', note)
        this.title = ''
        this.tasks = []
        this.taskText = ''
      }
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
  }
}
</script>