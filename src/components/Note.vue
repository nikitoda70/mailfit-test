<template>
  <div class="notes-item">
    <div class="notes-item__title">
      <div class="notes-item__title-text">{{ note.title }}</div>
      <div class="notes-item__btns">
        <button class="btn" @click="$router.push(`/note/${note.id}`)">open</button>
        <button class="btn danger" @click="this.modalDelete = true">delete</button>
      </div>
    </div>
    <hr class="hr">
    <div class="notes-item__tasks">
      <div class="notes-item__task" v-for="(task, idx) in note.tasks" :key="task.id"
        :class="{ completed: task.completed }">
        <span class="notes-item__task-number">{{ idx + 1 }}).&nbsp;</span>
        <span class="notes-item__task-text">{{ task.text }}</span>
      </div>
    </div>
    <modal v-if="modalDelete" @click="this.modalDelete = false">
      <template #text>
        Confirm delete {{ note.title }}
      </template>
      <template #btns>
        <button class="btn" @click="this.modalDelete = false">cancel</button>
        <button class="btn danger" @click="onDelete">confirm</button>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  props: ['note'],
  data() {
    return {
      modalDelete: false
    }
  },
  methods: {
    onDelete() {
      this.modalDelete = false
      this.$store.dispatch('deleteNote', this.note)
    }
  },
}
</script>