import Vuex from 'vuex'

import auth from './modules/auth'
import course from './modules/course'

const store = () => new Vuex.Store({
  modules: {
    auth: auth,
    course: course
  }
})

export default store
