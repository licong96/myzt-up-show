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
export const setLoginLink = function ({commit, state}, {loginLink}) {       //  修改登录之后，要跳转的地方
  commit(types.SET_LOGINLINK, loginLink)
}
export const setHomeItem = function ({commit, state}, {homeItem}) {       //  首页的列表详情页的数据
  commit(types.SET_HOMEITEM, homeItem)
}
export const setAlloyCountHeight = function ({commit, state}, {alloyCountHeight}) {       // 图片加载完成，计算min
  commit(types.SET_ALLOYCOUNTHEIGHT, alloyCountHeight)
}
