import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import createPersistedState from "vuex-persistedstate";

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // { 
      //   id: 1,
      //   title: 'Wake Up',
      //   done: false,
      //   dueDate: '2020-10-16'
      // },
      // { 
      //   id: 2,
      //   title: 'Get bananas',
      //   done: false,
      //   dueDate: '2020-10-17'
      // },
      // { 
      //   id: 3,
      //   title: 'Eat bananas',
      //   done: false,
      //   dueDate: null
      // }
    
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false,
    drawer: true 
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
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
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    },
    TOGGLE_DRAWER: state => (state.drawer = !state.drawer),
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackBar', `${newTaskTitle} added!`)
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackBar', `Task deleted!`)
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackBar', `Task updated!`)
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackBar', `Due Date updated!`)
      })

    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks =>{
        commit('setTasks', tasks)
      })
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      } 
      return state.tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    },
    drawerState: (state) => state.drawerState
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
