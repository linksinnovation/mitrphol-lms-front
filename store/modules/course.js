import http from '~/utils/http'

export default {
  namespaced: true,
  state: {
    courses: {}
  },
  getters: {
    courses: (state) => {
      return state.courses
    }
  },
  mutations: {
    load: (state, payload) => {
      state.courses = payload.courses
    },
    add: (state, payload) => {
      state.courses.push(payload.course)
    }
  },
  actions: {
    load: (context, token) => {
      http
        .get('/api/course', {
          headers: {
            Authorization: 'bearer ' + token
          }
        })
        .then((response) => {
          context.commit('load', { courses: response.data })
        })
        .catch(() => {
          context.commit('load', { courses: {} })
        })
    },
    add: (context, vc) => {
      http.post('/api/course', vc.data).then((response) => {
        context.commit('add', { course: response.data })
        vc.$router.push({ path: '/manage/' + response.data.id + '/setting' })
      })
    }
  }
}
