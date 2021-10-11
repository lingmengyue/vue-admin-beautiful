<template>
  <div class="index-container">
    <a-form
      ref="formRef"
      :model="this.formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="菜单名称" name="meta_title">
        <a-input
          v-model:value="this.formState.meta_title"
          placeholder="输入菜单名称"
        />
      </a-form-item>
      <a-form-item label="菜单图标" name="meta_icon">
        <a-input
          v-model:value="this.formState.meta_icon"
          placeholder="输入菜单图标值"
        />
      </a-form-item>
      <a-form-item label="访问路径" name="path">
        <a-input
          v-model:value="this.formState.path"
          placeholder="输入菜单访问路径"
          :addon-before="this.extraData.prefix_url"
          :disabled="!this.extraData.add_status"
        />
      </a-form-item>
      <a-form-item
        label="组件NAME"
        name="name"
        v-if="this.extraData.subMenuStatus"
      >
        <a-input
          v-model:value="this.formState.name"
          placeholder="输入当前菜单的name"
          :disabled="!this.extraData.add_status"
        />
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
  import { defineComponent, reactive, ref, toRefs } from 'vue'
  import { useStore } from 'vuex'
  // 发起请求的方法
  export default defineComponent({
    props: {
      raw_data: {
        type: Object,
        default() {
          return null
        },
      },
      // 是否是新增动作，默认是新增
      add_status: {
        type: Boolean,
        default() {
          return true
        },
      },
    },
    setup(props) {
      const store = useStore()
      const formRef = ref()
      // 表单字段
      const formState = reactive({
        meta_title: null, //菜单名称
        meta_icon: null, //菜单图标,待完成
        path: null, //菜单访问路径
        name: null, //子菜单标识名，一级菜单没有
      })
      const { raw_data } = toRefs(props)
      const { add_status } = toRefs(props)
      const extraData = reactive({
        prefix_url: null, // 默认路由前缀，二级菜单启用
        subMenuStatus: false, // 当前是否要进行二级菜单的编辑
        raw_data,
        add_status,
      })
      // 表单验证规则
      const rules = {
        meta_title: [
          {
            required: true,
            message: '请输入菜单名称',
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
        parent_id: 0, // 父菜单ID，默认0 0为一级菜单
        path: null, // 组件访问路径
        name: null, // 组件name,一级菜单不填，二级菜单填
        component: 'Layout', // 用于加载的组件路径
        component_name: null, // 用于展示用的组件名
        meta: {
          title: null, // 菜单标题
          icon: null, // 菜单icon图标值
          affix: false, // 菜单是否不显示关闭按钮
        },
        redirect: null, // 一级菜单默认重定向地址,目前仅在一级菜单使用
        alwaysShow: true, // 一级菜单使用，是否展示下属子菜单
        level: null, // 菜单层级
      }
      // 提交
      const onHandleSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            menuData.meta.icon = formState.meta_icon
            menuData.meta.title = formState.meta_title
            if (extraData.add_status) {
              if (extraData.subMenuStatus) {
                menuData.path = extraData.prefix_url + formState.path
                menuData.component_name = extraData.prefix_url + formState.path
                menuData.component =
                  '@/views' + extraData.prefix_url + formState.path
                menuData.parent_id = raw_data.value.id
                menuData.name = formState.name
              } else {
                // 一级菜单时触发
                menuData.component_name = formState.path
                menuData.component = 'Layout'
                menuData.path = formState.path
                menuData.level = 1
                menuData.parent_id = 0
                menuData.name = null
              }
              menuData.id = null
            } else {
              menuData.path = raw_data.value.path
              menuData.component_name = raw_data.value.component_name
              menuData.component = '@/views' + raw_data.value.path
              menuData.parent_id = raw_data.value.parent_id
              menuData.name = raw_data.value.name
              menuData.id = raw_data.value.id
              menuData.level = raw_data.value.level
            }
            // 将处理好的数据上传后台保存
            store.dispatch('auth/menuMange', menuData)
            store.getters('auth/menuMange')
            store.getters('auth/menuMange')
            return menuData
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
      // 初始化表单字段值
      const initFormState = () => {
        formState.meta_title = null
        formState.meta_icon = null
        if (extraData.add_status) {
          formState.path = null
          formState.name = null
        }
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
        onHandleSubmit,
        initFormState,
      }
    },
    watch: {
      // 监控增加还是修改状态，触发条件：对同一个菜单进行添加与修改动作
      add_status(newValue) {
        this.actionChoice(this.extraData.raw_data, newValue)
      },
      // 监控传输数据的变化，触发条件：对不同的菜单进行添加或修改动作
      raw_data(newValue) {
        this.actionChoice(newValue, this.extraData.add_status)
      },
    },
    created() {
      this.actionChoice(this.extraData.raw_data, this.extraData.add_status)
    },
    methods: {
      // 动作行为选择
      actionChoice(data, status) {
        // 判断状态 true：添加行为 false：修改行为
        if (status) {
          // 初始化表单字段值
          this.initFormState()
          // 当前数据是否是对象 true：添加子菜单 false：添加一级菜单
          if (data instanceof Object) {
            // 设置添加子菜单状态为真
            this.extraData.subMenuStatus = true
            // 设定路由路径前缀，值为父组件路由路径
            this.extraData.prefix_url = data.path
          } else {
            // 设置添加子菜单状态为假
            this.extraData.subMenuStatus = false
            // 设定路由路径前缀为null
            this.extraData.prefix_url = null
          }
        } else {
          // 修改动作响应
          this.editMenu()
        }
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
        // 判断是否是一级菜单，一级菜单parent_id为0 二三级菜单值不为0
        // 当前菜单不为一级菜单时
        if (this.raw_data.parent_id) {
          // 设置子菜单状态为true 展示name字段
          this.extraData.subMenuStatus = true
          // 给表单字段name赋值
          this.formState.name = this.extraData.raw_data.name
        }
      },
      getSaveData(data) {
        console.log(data)
      },
      async onSubmit() {
        const data = await this.onHandleSubmit()
        console.log('test_data', data)
      },
    },
  })
</script>
