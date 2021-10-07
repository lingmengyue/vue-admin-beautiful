const data = [
  {
    id: '1',
    path: '/',
    component: 'Layout',
    componentName: '/',
    alwaysShow: true,
    redirect: '/index',
    parentID: 0,
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        id: '2',
        parentID: 1,
        path: 'index',
        name: 'Index',
        component: '@/views/index',
        componentName: '/index',
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    id: '3',
    path: '/admin_mange',
    component: 'Layout',
    componentName: '/admin_mange',
    // redirect: '/role/menu',
    parentID: 0,
    alwaysShow: true,
    meta: {
      title: '后台管理',
      icon: 'admin-line',
    },
    children: [
      {
        id: '4',
        parentID: 3,
        path: 'menu',
        name: 'AdminMangeMenu',
        component: '@/views/admin_mange/menu',
        componentName: 'admin_mange/menu',
        meta: {
          title: '菜单列表',
          icon: 'chat-private-line',
        },
      },
      {
        id: '12',
        parentID: 3,
        path: 'role',
        name: 'AdminMangeRole',
        component: '@/views/admin_mange/role',
        componentName: 'admin_mange/role',
        meta: {
          title: '角色列表',
          icon: 'user-3-line',
        },
      },
      {
        id: '5',
        parentID: 3,
        path: 'auth',
        name: 'AdminMangeAuth',
        component: '@/views/admin_mange/auth/',
        componentName: 'admin_mange/auth',
        meta: {
          title: '管理员列表',
          icon: 'file-list-3-line',
        },
      },
      {
        id: '9',
        parentID: 3,
        path: 'third',
        name: 'AdminMangeThirdIndex',
        component: '@/views/admin_mange/third',
        alwaysShow: true,
        componentName: 'admin_mange/third',
        meta: {
          title: '三级路由管理',
          icon: 'chat-private-line',
        },
        children: [
          {
            id: '10',
            parentID: 9,
            path: 'test',
            name: 'AdminMangeThirdTest',
            component: '@/views/admin_mange/third/test',
            componentName: 'admin_mange/menu/test',
            meta: {
              title: '测试路由test',
              icon: 'chat-private-line',
            },
          },
          {
            id: '11',
            parentID: 9,
            path: 'ling',
            name: 'AdminMangeThirdLing',
            component: '@/views/admin_mange/third/ling',
            componentName: 'admin_mange/menu/ling',
            meta: {
              title: '测试路由ling',
              icon: 'file-list-3-line',
            },
          },
        ],
      },
    ],
  },
  {
    id: '6',
    path: '/vab',
    component: 'Layout',
    componentName: '/vab',
    redirect: '/vab/table',
    parentID: 0,
    alwaysShow: true,
    meta: {
      title: '组件',
      icon: 'apps-line',
    },
    children: [
      {
        id: '7',
        parentID: 6,
        path: 'table',
        name: 'Table',
        component: '@/views/vab/table',
        level: 2,
        meta: {
          title: '表格',
          icon: 'table-2',
        },
      },
      {
        id: '8',
        parentID: 6,
        path: 'icon',
        name: 'Icon',
        component: '@/views/vab/icon',
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
      },
    ],
  },
]
module.exports = [
  {
    url: '/menu/navigate',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
