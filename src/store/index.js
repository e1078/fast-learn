import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "@/db.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindLists: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("lists", db.collection("lists"));
    }),
    addList(context, list) {
      return db
        .collection("lists")
        .doc(list.id)
        .set(list);
    }
  }
});
