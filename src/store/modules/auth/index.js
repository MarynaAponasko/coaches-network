import getters from './getters'
import actions from './action'
import mutations from './mutation'

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false
    }
  },
  getters,
  actions,
  mutations
}
