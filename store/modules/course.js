import http from '~/utils/http'
import cookie from '~/utils/cookie'

const state = {
  courses: {}
}

const getters = {
  courses: (state) => {
    return state.courses
  }
}

const mutations = {
  LOAD_COURSES: (state, payload) => {
    state.courses = payload.courses
  }
}

const actions = {
  nuxtServerInit: (context, vc) => {
    if (vc.isServer && vc.req.headers.cookie) {
      var result = cookie(vc)
      if (result.at) {
        http
          .get('/api/course', {
            headers: {
              Authorization: 'bearer ' + result.at
            }
          })
          .then((response) => {
            context.commit('LOAD_COURSES', { courses: response.data })
          })
          .catch(() => {
            context.commit('LOAD_COURSES', { courses: {} })
          })
      }
    }
  },
  load: (context, at) => {
    http
      .get('/api/course', {
        headers: {
          Authorization: 'bearer ' + at
        }
      })
      .then((response) => {
        context.commit('LOAD_COURSES', { courses: response.data })
      })
      .catch(() => {
        context.commit('LOAD_COURSES', { courses: {} })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
