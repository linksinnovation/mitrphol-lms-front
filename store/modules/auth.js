import auth from '~/utils/auth'
import jwt from 'jwt-decode'
import * as Cookies from 'js-cookie'

const state = {
  authenticated: false,
  name: '',
  authority: ''
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
  }
}

const mutations = {
  OAUTH_AUTHEN: (state, payload) => {
    state.authenticated = payload.status
    state.name = payload.name
    state.authority = payload.authority
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
        context.commit('OAUTH_AUTHEN', { status: true, name: jwt(result.at).name, authority: jwt(result.at).authorities[0] })
      } else {
        context.commit('OAUTH_AUTHEN', { status: false })
      }
    }
  },
  login: (context, vc) => {
    auth.login(vc).then((data) => {
      Cookies.set('at', data.data.access_token, { expires: 1, secure: false })
      Cookies.set('rt', data.data.refresh_token, { expires: 1, secure: false })
      context.commit('OAUTH_AUTHEN', { status: true, name: jwt(data.data.access_token).name, authority: jwt(data.data.access_token).authorities[0] })
      vc.$router.push('/')
    }, (data) => {
      context.commit('OAUTH_AUTHEN', { status: false })
    })
  },
  logout: (context, vc) => {
    Cookies.remove('at', { secure: false })
    Cookies.remove('rt', { secure: false })
    context.commit('OAUTH_AUTHEN', { status: false })
    vc.$router.replace('/login')
  },
  checkAuth: (context, router) => {
    let rt = Cookies.get('at')
    if (rt) {
      auth.checkAuth(rt).then((data) => {
        context.commit('OAUTH_AUTHEN', { status: true, name: jwt(rt).name, authority: jwt(rt).authorities[0] })
      }, (data) => {
        context.commit('OAUTH_AUTHEN', { status: false })
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
