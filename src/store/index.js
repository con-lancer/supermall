import Vue from 'vue'
import Vuex from 'vuex'

import getters from "@/store/getters";
import actions from "@/store/actions";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions,
  modules: {
  },
  getters
})
