import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || `[]`)
  },
  getters: {
    notes: s => s.notes,
    noteById: s => id => s.notes.find(n => n.id === id),
  },
  mutations: {
    deleteNote(state, note) {
      state.notes = state.notes.filter(n => n.id !== note.id)

      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    unconfigNote(state, note) {
      const idx = state.notes.findIndex(n => n.id === note.id)
      state.notes[idx].configurable = false
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    createNote(state, note) {
      state.notes.unshift(note)

      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    updateNote(state, {id, title, tasks}) {
      const notes = state.notes.concat()
      const idx = notes.findIndex(n => n.id === id)
      const note = notes[idx]
      notes[idx] = {...note, title, tasks}
      state.notes = notes

      localStorage.setItem('notes', JSON.stringify(state.notes))
    }
  },
  actions: {
    deleteNote({ commit }, note) {
      commit('deleteNote', note)
    },
    unconfigNote({ commit }, note) {
      commit('unconfigNote', note)
    },
    createNote({ commit }, note) {
      commit('createNote', note)
    },
    updateNote({commit}, note) {
      commit('updateNote', note)
    }
  }
})
