import request from '@/utils/request'

// registration API
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// login API
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 获取用户基本信息
export const userInfoService = () => request.get('/my/userinfo')
// update user basic information
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
// 更新头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
// reset password
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
