<template>
  <div class="index-container">
    <a-button type="primary" class="first_menu" @click="addMenu(null)">
      添加一级菜单
    </a-button>
    <a-table
      :columns="columns"
      :data-source="this.routes"
      :rowKey="(record) => record.path"
      :bordered="true"
      :defaultExpandAllRows="true"
      :pagination="false"
    >
      <!-- 图标插件 -->
      <template #icon="{ text: icon }">
        <vab-icon :icon="icon"></vab-icon>
      </template>

      <!-- 动作插件 -->
      <template #action="{ text: action }">
        <span>
          <a-button
            v-if="action.level != 3"
            type="link"
            @click="addMenu(action)"
          >
            添加
          </a-button>
          <a-divider type="vertical" v-if="action.level != 3" />
          <a-button type="link" @click="editMenu(action)">修改</a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="deleteMenu(action.id)">删除</a-button>
        </span>
      </template>
    </a-table>
    <!-- 菜单管理Drawer -->
    <a-drawer
      title="create"
      :width="720"
      :visible="menuDrawerStatus"
      @close="onClose"
    >
      <menu-drawer
        :raw_data="this.raw_data"
        :add_status="this.addStatus"
        @onClose="onClose"
      ></menu-drawer>
    </a-drawer>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import MenuDrawer from './component/MenuDrawer'
  import VabIcon from '@/layout/vab-icon'
  import { createVNode } from 'vue'
  import { Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { menuDelete } from '@/api/auth'
  // import io from 'socket.io-client'
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '图标',
      key: 'icon',
      dataIndex: 'meta.icon',
      width: '10%',
      align: 'center',
      slots: { customRender: 'icon' },
    },
    {
      title: '菜单标题',
      key: 'title',
      dataIndex: 'meta.title',
      width: '15%',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ]
  const menuData = []
  export default {
    name: 'AdminMangeMenu',
    components: { VabIcon, MenuDrawer },
    computed: {
      ...mapGetters({
        // 获取菜单列表数据
        routes: 'routes/menuList',
      }),
    },
    data() {
      return {
        columns,
        menuData,
        menuDrawerStatus: false,
        addStatus: true,
        raw_data: null,
      }
    },
    created() {
      this.testSocket()
    },
    methods: {
      ...mapActions({
        // 获取菜单列表数据
        setAllRoutes: 'routes/setAllRoutes',
      }),
      addMenu(data) {
        if (data instanceof Object) {
          this.raw_data = data
        } else {
          this.raw_data = null
        }
        this.addStatus = true
        this.menuDrawerStatus = true
      },
      editMenu(data) {
        this.addStatus = false
        this.raw_data = data
        this.menuDrawerStatus = true
      },
      deleteMenu(menuID) {
        let self = this
        Modal.confirm({
          title: '是否删除此条菜单数据',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode(
            'div',
            { style: 'color:red;' },
            '当前菜单有子菜单数据时也将一并清除'
          ),
          onOk() {
            // 直接发起删除请求
            menuDelete({ menuID: menuID }).then(() => {
              self.setAllRoutes()
            })
          },
        })
      },
      // 点击关闭menuDrawer
      onClose() {
        this.menuDrawerStatus = false
      },
      testSocket() {},
    },
  }
</script>

<style lang="less">
  .first_menu {
    margin: 10px 0;
    border-radius: 5px;
  }
</style>
