import auth from '~/utils/auth'
import jwt from 'jwt-decode'
import * as Cookies from 'js-cookie'

const state = {
  authenticated: false,
  name: '',
  authority: '',
  error: ''
}

const getters = {
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
}

const mutations = {
  OAUTH_AUTHEN: (state, payload) => {
    state.authenticated = payload.status
    state.name = payload.name
    state.authority = payload.authority
    state.error = payload.error
  }
}

const actions = {
  nuxtServerInit: (context, vc) => {
    if (vc.isServer && vc.req.headers.cookie) {
      var result = {}
      vc.req.headers.cookie.split('; ').forEach(function (sp) {
        var arr = sp.split('=')
        arr[1] && (result[arr[0]] = arr[1])
      })
      if (result.at) {
        context.commit('OAUTH_AUTHEN', { status: true, error: '', name: jwt(result.at).name, authority: jwt(result.at).authorities[0] })
      } else {
        context.commit('OAUTH_AUTHEN', { status: false, error: '' })
      }
    }
  },
  login: (context, vc) => {
    auth.login(vc).then((data) => {
      Cookies.set('at', data.data.access_token, { expires: 1, secure: false })
      Cookies.set('rt', data.data.refresh_token, { expires: 1, secure: false })
      context.commit('OAUTH_AUTHEN', { status: true, error: '', name: jwt(data.data.access_token).name, authority: jwt(data.data.access_token).authorities[0] })
      vc.$router.push('/')
    }, (data) => {
      if (data.response.status === 500) {
        context.commit('OAUTH_AUTHEN', { status: false, error: 'เกิดความผิดพลาดจากการเชื่อมต่อ Mirtphol API' })
      } else if (data.response.status === 401) {
        context.commit('OAUTH_AUTHEN', { status: false, error: 'Username หรือ Password ไม่ถูกต้อง' })
      } else {
        context.commit('OAUTH_AUTHEN', { status: false, error: 'เกิดความผิดพลาดในการเข้าสู่ระบบ กรุณาลองอีกครั้ง' })
      }
    })
  },
  logout: (context, vc) => {
    Cookies.remove('at', { secure: false })
    Cookies.remove('rt', { secure: false })
    context.commit('OAUTH_AUTHEN', { status: false, error: '' })
    vc.$router.replace('/login')
  },
  checkAuth: (context, router) => {
    let rt = Cookies.get('at')
    if (rt) {
      auth.checkAuth(rt).then((data) => {
        context.commit('OAUTH_AUTHEN', { status: true, error: '', name: jwt(rt).name, authority: jwt(rt).authorities[0] })
      }, (data) => {
        context.commit('OAUTH_AUTHEN', { status: false, error: 'Session ของคุณหมดอายุ' })
        router.replace('/login')
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
