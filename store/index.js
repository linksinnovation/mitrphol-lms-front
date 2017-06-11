import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import auth from './modules/auth'

const store = () => new Vuex.Store({
  modules: {
    auth: auth
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: false })
    })
  ]
})

export default store
