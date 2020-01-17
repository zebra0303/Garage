import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

Vue.use(Vuex);

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

const db = firebase.initializeApp(config).firestore();
firebase.analytics();

export default new Vuex.Store({
  // setup the reactive posts property
  state: {
    user: {
      info: {},
      status: null,
      error: null
    },
    posts: []
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    ...vuexfireMutations
  },
  actions: {
    signInAction({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(rep => {
          console.log(rep.user);
          commit('setUser', rep.user.uid);
          commit('setStatus', 'success');
        })
        .catch(error => {
          console.log(error.code);
          console.log(error.message);
        });
    },
    addPostAction({ commit }, payload) {
      db.collection("posts")
        .add({
          title: payload.title,
          content: payload.content,
          datetime: new Date()
        })
        .then(rep => {
          console.log(rep);
        })
        .catch(error => {
          console.log(error.code);
          console.log(error.message);
        });
    },
    bindPostsRef: firestoreAction(context => {
      // context contains all original properties like commit, state, etc
      // and adds `bindFirestoreRef` and `unbindFirestoreRef`
      // we return the promise returned by `bindFirestoreRef` that will
      // resolve once data is ready
      console.log("bind!!!");
      return context.bindFirestoreRef("posts", db.collection("posts"));
    })
  }
});
