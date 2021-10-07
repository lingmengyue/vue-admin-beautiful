const roleList = [
  {
    id: '1',
    role_name: '超级管理员',
    role_status: true,
  },
  {
    id: '2',
    role_name: '管理员',
    role_status: true,
  },
  {
    id: '3',
    role_name: '测试',
    role_status: false,
  },
]
module.exports = [
  {
    url: '/auth/menuMange',
    type: 'post',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        data: config.body,
        test: 'success',
      }
    },
  },
  {
    url: '/auth/roleList',
    type: 'get',
    response(config) {
      return {
        code: 200,
        msg: 'success',
        config_data: config.body,
        data: roleList,
      }
    },
  },
]
