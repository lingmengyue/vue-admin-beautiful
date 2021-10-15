<template>
  <div class="index-container">
    <a-button type="primary" class="first_menu" @click="addAdministrator(null)">
      添加管理员
    </a-button>
    <a-table
      :columns="columns"
      :data-source="this.adminList"
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
          <a-button type="link" @click="editAdministrator(action)">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="deleteAdministrator(action.id)">
            删除
          </a-button>
        </span>
      </template>
    </a-table>
    <!-- 角色管理Drawer -->
    <a-drawer
      title="角色"
      :width="720"
      :visible="administratorDrawerStatus"
      @close="onClose"
    >
      <administrator-drawer
        :raw_data="this.raw_data"
        :role_data="this.role_data"
        @onClose="onClose"
      ></administrator-drawer>
    </a-drawer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { adminDelete, adminList, roleList } from '@/api/auth'
  import AdministratorDrawer from './component/AdministratorDrawer'
  import { Modal } from 'ant-design-vue'
  import { createVNode } from 'vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '管理员名称',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '管理员角色',
      key: 'rolename',
      dataIndex: 'role.role_name',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      slots: { customRender: 'action' },
      align: 'center',
    },
  ]
  export default {
    name: 'AdminMangeAdministrator',
    components: { AdministratorDrawer },
    data() {
      return {
        columns,
        administratorDrawerStatus: false,
        raw_data: null,
        role_data: null,
        roleList: null,
        adminList: null,
      }
    },
    computed: {
      ...mapGetters({
        routes: 'routes/menuList',
      }),
    },
    created() {
      this.getAdministratorList()
      this.getRoleList()
    },
    methods: {
      // 获取管理员表数据
      async getAdministratorList() {
        const { data } = await adminList()
        this.adminList = data
      },
      // 获取角色表数据
      async getRoleList() {
        const { data } = await roleList()
        this.role_data = data.map((item) => {
          return { label: item.role_name, value: item.id }
        })
        console.log('index_role_data', this.role_data)
      },
      // 增加管理员
      addAdministrator(data) {
        if (data instanceof Object) {
          this.raw_data = data
        } else {
          this.raw_data = null
        }
        this.administratorDrawerStatus = true
      },
      // 修改管理员
      editAdministrator(data) {
        this.raw_data = data
        this.administratorDrawerStatus = true
      },
      // 点击关闭administratorDrawer
      onClose() {
        this.administratorDrawerStatus = false
        this.getAdministratorList()
      },
      // 删除角色
      deleteAdministrator(adminID) {
        let self = this
        Modal.confirm({
          title: '是否删除此条管理员数据',
          icon: createVNode(ExclamationCircleOutlined),
          onOk() {
            // 直接发起删除请求
            adminDelete({ adminID: adminID }).then(() => {
              self.getAdministratorList()
            })
          },
        })
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
