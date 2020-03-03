/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from 'axios';
import VueAxios from 'vue-axios';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'http://localhost:3000/';

export default new Vuex.Store({
  state: {
    loading: true,
    todos: [{}],
  },
  getters: {
    todos: (state: any) => state.todos,
  },
  mutations: {
    SET_LOADING: (state: any, flag) => {
      state.loading = flag;
    },
    SET_TODOS: (state, todos) => {
      state.todos = todos;
    },
    ADD_TODO: (state: any, todo: any) => {
      state.todos.push(todo);
    },
    TOGGLE_TODO: (state: any, id) => {

    },
    removeTodo: (state, id) => {
      state.todos = state.todos.filter((el) => el.id !== id);
    },
  },
  actions: {
    initTodos: ({ commit }) => {
      commit('SET_LOADING', true);
      axios
        .get('/notes')
        .then((r) => r.data.notes)
        .then((todos) => {
          commit('SET_TODOS', todos);
          commit('SET_LOADING', false);
        });
    },
    addTodo: ({ commit, dispatch }, todo) => {
      if (todo) {
        axios.post('/notes', todo).then(() => {
          dispatch('initTodos');
        });
      }
    },
    toggle: ({ commit, dispatch }, todo) => {
      const newTodo = todo;
      newTodo.done = !newTodo.done;

      axios
      .put('/notes', newTodo)
      .then((r) => r.data)
      .then(() => { 
        dispatch('initTodos');
      })

    },
    removeTodo: ({ commit, dispatch }, id) => {
      commit('removeTodo', {
        id: id
      });
      axios
      .delete('/notes/'+id)
      .then((r) => r.data)
      .then(() => { 
        dispatch('initTodos');
      })
    },
  },
  plugins: [vuexLocal.plugin],
});
