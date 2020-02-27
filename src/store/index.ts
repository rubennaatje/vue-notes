/* eslint-disable linebreak-style */
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
      state.todos = state.todos.map((todo: any) => {
        // console.log(id);
        const newtodo: any = todo;
        if (newtodo.id === id) {
          newtodo.done = !todo.done;
        }
        return newtodo;
      });
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
    addTodo: ({ commit }, todo) => {
      if (todo) {
        axios.post('/notes', todo).then(() => {
          commit('ADD_TODO', todo);
        });
      }
    },
    toggle: ({ commit }, id) => {
      commit('toggle', id);
    },
    removeTodo: ({ commit }, id) => {
      commit('removeTodo', id);
    },
  },
  plugins: [vuexLocal.plugin],
});
