import * as types from './mutations-type'

export const setUserInfo = function ({commit, state}, {userInfo}) {     // 用户信息
  commit(types.SET_USERINFO, userInfo)
}
export const setDialog = function ({commit, state}, {muDialog}) {       //  弹出框
  commit(types.SET_MUDIALOG, muDialog)
}
export const setDialogText = function ({commit, state}, {muDialogText}) {       //  弹出框文字
  commit(types.SET_MUDIALOGTEXT, muDialogText)
}
export const setDialogUrl = function ({commit, state}, {muDialogUrl}) {       //  弹出框url
  commit(types.SET_MUDIALOGURL, muDialogUrl)
}
