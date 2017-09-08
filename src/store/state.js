const state = {
  userInfo: {},             // 用户是否登录
  muDialog: false,          // 弹出提示框
  muDialogText: '',         // 弹出提示框文字
  muDialogUrl: '',          // 弹出框确定之后，跳转地址
  loginLink: '',            // 登录之后，要跳转的地方
  homeItem: {},            // 首页的列表详情页的数据
  alloyCountHeight: 0      // 我的页面中的滑动，列表图片加载完成，计算min
}

export default state
