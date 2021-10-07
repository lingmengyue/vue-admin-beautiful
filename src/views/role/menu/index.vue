<template>
  <div class="index-container">
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
            type="link"
            @click="addMenu(action)"
            v-if="action.parentID == 0"
          >
            添加
          </a-button>
          <a-divider type="vertical" v-if="action.parentID == 0" />
          <a-button type="link">修改</a-button>
          <a-divider type="vertical" />
          <a-button type="link">删除</a-button>
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
      <menu-drawer></menu-drawer>
    </a-drawer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuDrawer from './component/MenuDrawer'
  import VabIcon from '@/layout/vab-icon'
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
      title: '重定向地址',
      dataIndex: 'redirect',
      key: 'redirect',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ]
  const menuData = []
  export default {
    name: 'RoleMenu',
    components: { VabIcon, MenuDrawer },
    data() {
      return {
        columns,
        menuData,
        menuDrawerStatus: false,
      }
    },
    computed: {
      ...mapGetters({
        routes: 'routes/menuList',
      }),
    },
    created() {
      console.log(this.routes)
    },
    methods: {
      editMenu() {},
      deleteMenu() {},
      addMenu(data) {
        console.log(data)
        this.menuDrawerStatus = true
      },
      // 点击关闭menuDrawer
      onClose() {
        this.menuDrawerStatus = false
      },
    },
  }
</script>
