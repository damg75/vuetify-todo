import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      { 
        id: 1,
        title: 'Wake Up',
        done: false
      },
      { 
        id: 2,
        title: 'Get bananas',
        done: false
      },
      { 
        id: 3,
        title: 'Eat bananas',
        done: false
      }
    
    ],
    snackbar: {
      show: false,
      text: ''
    }
  },
  mutations: {
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false
      }
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    showSnackBar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() =>{
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackBar(state) {
      state.snackbar.show = false
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackBar', `${newTaskTitle} added!`)
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('showSnackBar', `Task deleted!`)
    },
    updateTaskTitle({ commit }, payload) {
      commit('updateTaskTitle', payload)
      commit('showSnackBar', `Task updated!`)
    }
  },
  modules: {
  }
})
