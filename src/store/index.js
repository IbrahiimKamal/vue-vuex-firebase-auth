import { createStore } from 'vuex';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// firebase auth
import { auth } from '../firebase/config';

const store = createStore({
  state: {
    user: null,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    async signup({ commit }, { email, password }) {
      console.log('signup');

      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        commit('setUser', res.user);
      } else {
        throw new Error('could not complete signup');
      }
    },

    async login({ commit }, { email, password }) {
      console.log('login');

      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        commit('setUser', res.user);
        console.log('login', this.state.user);
      } else {
        throw new Error('could not complete login');
      }
    },

    async logout({ commit }) {
      console.log('logout');

      await signOut(auth);
      commit('setUser', null);
      console.log('logout', this.state.user);
    },
  },
});

export default store;
