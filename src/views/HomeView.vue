<template>
  <div class="notes">
    <div class="container">
      <NoteCreate />
      <div class="notes__wrapper" v-if="notes.length">
        <Note v-for="note in notes" :key="note.id" :note="note" />
      </div>
      <div v-else>No notes!!!!</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Note from '@/components/Note'
import NoteCreate from '@/components/NoteCreate';

export default {
  components: {
    Note,
    NoteCreate
  },
  computed: {
    ...mapGetters(['notes'])
  },
}
</script>
