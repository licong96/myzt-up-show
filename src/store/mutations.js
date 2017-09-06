import * as types from './mutations-type'

const matutaions = {
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_MUDIALOG](state, muDialog) {
    state.muDialog = muDialog
  },
  [types.SET_MUDIALOGTEXT](state, muDialogText) {
    state.muDialogText = muDialogText
  },
  [types.SET_MUDIALOGURL](state, muDialogUrl) {
    state.muDialogUrl = muDialogUrl
  },
  [types.SET_LOGINLINK](state, loginLink) {
    state.loginLink = loginLink
  }
}

export default matutaions
