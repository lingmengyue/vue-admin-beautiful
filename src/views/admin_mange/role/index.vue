<template>
  <div class="index-container">
    <a-button type="primary" class="first_menu" @click="addMenu(null)">
      添加角色
    </a-button>
    <a-table
      :columns="columns"
      :data-source="this.roleList"
      :rowKey="(record) => record.id"
      :bordered="true"
      :defaultExpandAllRows="true"
      :pagination="true"
    >
      <!-- 开关插件 -->
      <template #status="{ text: status }">
        <span v-if="status" class="open">启用</span>
        <span v-else class="ban">禁用</span>
      </template>

      <!-- 动作插件 -->
      <template #action="{ text: action }">
        <span>
          <a-button type="link" @click="editRole(action)">修改</a-button>
          <a-divider type="vertical" />
          <a-button type="link">删除</a-button>
        </span>
      </template>
    </a-table>
    <!-- 角色管理Drawer -->
    <a-drawer
      title="角色"
      :width="720"
      :visible="roleDrawerStatus"
      @close="onClose"
    >
      <role-drawer :raw_data="this.raw_data"></role-drawer>
    </a-drawer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { roleList } from '@/api/auth'
  import RoleDrawer from './component/RoleDrawer'
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      key: 'role_name',
      dataIndex: 'role_name',
    },
    {
      title: '角色状态',
      key: 'status',
      dataIndex: 'status',
      width: '10%',
      align: 'center',
      slots: { customRender: 'status' },
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
      align: 'center',
    },
  ]
  export default {
    name: 'AdminMangeRole',
    components: { RoleDrawer },
    data() {
      return {
        columns,
        roleDrawerStatus: false,
        addStatus: true,
        raw_data: null,
        roleList: null,
      }
    },
    computed: {
      ...mapGetters({
        routes: 'routes/menuList',
      }),
    },
    created() {
      this.getRoleList()
    },
    methods: {
      // 获取角色权限表数据
      async getRoleList() {
        const { data } = await roleList()
        this.roleList = data
        console.log('role_data', this.roleList)
      },
      addMenu(data) {
        if (data instanceof Object) {
          this.raw_data = data
        } else {
          this.raw_data = null
        }
        this.addStatus = true
        this.roleDrawerStatus = true
      },
      editMenu(data) {
        this.addStatus = false
        this.raw_data = data
        this.roleDrawerStatus = true
      },
      // 点击关闭menuDrawer
      onClose() {
        this.roleDrawerStatus = false
      },

      onChange(checked) {
        console.log(`a-switch to ${checked}`)
      },
    },
  }
</script>
<style lang="less">
  .first_menu {
    margin: 10px 0;
    border-radius: 5px;
  }
  .open {
    color: #6ee54a;
  }
  .ban {
    color: #ef3310;
  }
</style>
