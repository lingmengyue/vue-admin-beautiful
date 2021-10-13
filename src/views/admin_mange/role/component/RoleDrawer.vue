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
        <a-tree
          checkable
          :tree-data="routes"
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
          :replace-fields="replaceFields"
        />
      </a-form-item>
      <a-form-item label="启用状态" name="status">
        <a-switch
          checked-children="开"
          un-checked-children="关"
          v-model:checked="this.formState.status"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
        <a-button style="margin-left: 10px" @click="initFormState">
          Reset
        </a-button>
      </a-form-item>
    </a-form>
    <!--    <div>raw:{{ this.extraData.raw_data }}</div>-->
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, watch } from 'vue'
  import { mapGetters } from 'vuex'
  import { roleMange } from '@/api/auth'
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
    computed: {
      ...mapGetters({
        routes: 'routes/menuList',
      }),
    },
    setup() {
      const expandedKeys = ref([])
      const selectedKeys = ref([])
      const checkedKeys = ref([])
      const replaceFields = {
        title: 'meta_title',
        key: 'id',
      }
      watch(expandedKeys, () => {
        console.log('expandedKeys', expandedKeys)
      })
      watch(selectedKeys, () => {
        console.log('selectedKeys', selectedKeys)
      })
      watch(checkedKeys, () => {
        console.log('checkedKeys', checkedKeys)
      })

      const formRef = ref()
      // 表单字段
      const formState = reactive({
        role_name: null, //角色名称
        role_auth: null, //角色权限
        status: true, //角色启用状态
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
      }
      // 提交
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            roleMange({ value: checkedKeys.value })
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
      // 初始化表单字段值
      const initFormState = () => {
        formState.role_name = null
        formState.status = true
      }
      return {
        expandedKeys,
        selectedKeys,
        checkedKeys,
        replaceFields,
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
        onSubmit,
        initFormState,
      }
    },
    created() {
      console.log('routes', this.routes)
      this.actionChoice('test')
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
  })
</script>
