import Vuex from 'vuex'
import jwt from 'jwt-decode'
import http from '~/utils/http'
import cookie from '~/utils/cookie'

import auth from './modules/auth'
import course from './modules/course'

const store = () => new Vuex.Store({
  actions: {
    nuxtServerInit: (context, vc) => {
      if (vc.isServer && vc.req.headers.cookie) {
        var result = cookie(vc)
        // load user
        context.commit('auth/authen', { status: true, error: '', name: jwt(result.at).name, authority: jwt(result.at).authorities[0] })

        // load courses
        if (result.at) {
          http.get('/api/course', {
            headers: { Authorization: 'bearer ' + result.at }
          }).then((response) => {
            context.commit('course/load', { courses: response.data })
          }).catch(() => {
            context.commit('course/load', { courses: {} })
          })
        }
      } else {
        context.commit('auth/authen', { status: false, error: '' })
      }
    }
  },
  modules: {
    auth: auth,
    course: course
  }
})

export default store
