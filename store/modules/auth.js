import auth from '~/utils/auth'
import jwt from 'jwt-decode'
import * as Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    authenticated: false,
    name: '',
    authority: '',
    error: ''
  },
  getters: {
    authenticated: (state) => {
      return state.authenticated
    },
    name: (state) => {
      return state.name
    },
    authority: (state) => {
      return state.authority
    },
    error: (state) => {
      return state.error
    }
  },
  mutations: {
    authen: (state, payload) => {
      state.authenticated = payload.status
      state.name = payload.name
      state.authority = payload.authority
      state.error = payload.error
    }
  },
  actions: {
    login: (context, vc) => {
      auth.login(vc).then((data) => {
        Cookies.set('at', data.data.access_token, { expires: 1, secure: false })
        Cookies.set('rt', data.data.refresh_token, { expires: 1, secure: false })
        context.commit('authen', { status: true, error: '', name: jwt(data.data.access_token).name, authority: jwt(data.data.access_token).authorities[0] })
        context.dispatch('course/load', data.data.access_token, { root: true })
        vc.$router.push('/')
      }, (data) => {
        if (data.response.status === 500) {
          context.commit('authen', { status: false, error: 'เกิดความผิดพลาดจากการเชื่อมต่อ Mirtphol API' })
        } else if (data.response.status === 401) {
          context.commit('authen', { status: false, error: 'Username หรือ Password ไม่ถูกต้อง' })
        } else {
          context.commit('authen', { status: false, error: 'เกิดความผิดพลาดในการเข้าสู่ระบบ กรุณาลองอีกครั้ง' })
        }
      })
    },
    logout: (context, vc) => {
      Cookies.remove('at', { secure: false })
      Cookies.remove('rt', { secure: false })
      context.commit('authen', { status: false, error: '' })
      vc.$router.replace('/login')
    },
    checkAuth: (context, router) => {
      let rt = Cookies.get('at')
      if (rt) {
        auth.checkAuth(rt).then((data) => {
          context.commit('authen', { status: true, error: '', name: jwt(rt).name, authority: jwt(rt).authorities[0] })
        }, (data) => {
          context.commit('authen', { status: false, error: 'Session ของคุณหมดอายุ' })
          router.replace('/login')
        })
      }
    }
  }
}
