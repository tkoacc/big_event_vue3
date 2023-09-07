import request from '@/utils/request'

// registration API
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// login API
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 获取用户基本信息
export const userInfoService = () => request.get('/my/userinfo')
