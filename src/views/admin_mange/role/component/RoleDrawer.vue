<template>
  <div class="index-container">
    <a-form
      ref="formRef"
      :model="this.formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="角色名称" name="role_name">
        <a-input
          v-model:value="this.formState.role_name"
          placeholder="输入角色名称"
        />
      </a-form-item>
      <a-form-item label="角色权限" name="role_auth">
        <a-input
          v-model:value="this.formState.role_auth"
          placeholder="输入角色权限"
        />
      </a-form-item>
      <a-form-item label="启用状态" name="status">
        <a-input v-model:value="this.formState.status" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
        <a-button style="margin-left: 10px" @click="initFormState">
          Reset
        </a-button>
      </a-form-item>
    </a-form>
    <div>raw:{{ this.extraData.raw_data }}</div>
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRaw, toRefs } from 'vue'
  import { mapGetters } from 'vuex'
  // 发起请求的方法
  import { menuMange } from '@/api/auth'
  export default defineComponent({
    props: {
      raw_data: {
        type: Object,
        default() {
          return null
        },
      },
    },
    setup(props) {
      const formRef = ref()
      // 表单字段
      const formState = reactive({
        role_name: null, //角色名称
        role_auth: null, //角色权限
        status: null, //角色启用状态
      })
      const { raw_data } = toRefs(props)
      const extraData = reactive({
        prefix_url: null, // 默认路由前缀，二级菜单启用
        subMenuStatus: false, // 当前是否要进行二级菜单的编辑
        raw_data,
      })
      // 表单验证规则
      const rules = {
        role_name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: '名称长度需在1-10之间',
            trigger: 'blur',
          },
        ],
        path: [
          {
            required: true,
            message: '请输入访问路径',
            trigger: 'blur',
          },
        ],
      }
      // 要传输的菜单数据
      const menuData = {
        id: null, // 菜单ID 添加动作id为null 修改动作id有值
        parentID: 0, // 父菜单ID，默认0 0为一级菜单
        path: null, // 组件访问路径
        name: null, // 组件name,一级菜单不填，二级菜单填
        component: 'Layout', // 用于加载的组件路径
        componentName: null, // 用于展示用的组件名
        meta: {
          title: null, // 菜单标题
          icon: null, // 菜单icon图标值
        },
        redirect: null, // 一级菜单默认重定向地址,目前仅在一级菜单使用
        alwaysShow: true, // 一级菜单使用，是否展示下属子菜单
      }
      // 提交
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            menuData.meta.icon = formState.meta_icon
            menuData.meta.title = formState.meta_title
            menuMange(menuData)
            console.log('values', menuData, toRaw(menuData))
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
      // 初始化表单字段值
      const initFormState = () => {
        formState.meta_title = null
        formState.meta_icon = null
        formState.path = null
        formState.name = null
      }
      return {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
        other: '',
        formRef,
        formState,
        rules,
        menuData,
        extraData,
        onSubmit,
        initFormState,
      }
    },
    watch: {
      // 监控传输数据的变化，触发条件：对不同的菜单进行添加或修改动作
      raw_data(newValue) {
        this.actionChoice(newValue)
      },
    },
    created() {
      this.actionChoice(this.extraData.raw_data)
      this.submitTest()
    },
    methods: {
      // 动作行为选择
      actionChoice(data) {
        console.log('data', data)
      },
      editMenu() {
        // 初始化路由路径前缀，只有添加动作才有这个值
        this.extraData.prefix_url = null
        // 给表单字段meta_title赋值
        this.formState.meta_title = this.extraData.raw_data.meta.title
        // 给表单字段meta_icon赋值
        this.formState.meta_icon = this.extraData.raw_data.meta.icon
        // 给表单字段path赋值
        this.formState.path = this.extraData.raw_data.path
        // 判断是否是一级菜单，一级菜单parentID为0 二三级菜单值不为0
        // 当前菜单不为一级菜单时
        if (this.raw_data.parentID) {
          // 设置子菜单状态为true 展示name字段
          this.extraData.subMenuStatus = true
          // 给表单字段name赋值
          this.formState.name = this.extraData.raw_data.name
        }
      },
      async submitTest() {
        await menuMange(this.routes)
      },
      getSaveData(data) {
        console.log(data)
      },
    },
    computed: {
      ...mapGetters({
        routes: 'routes/menuList',
      }),
    },
  })
</script>
