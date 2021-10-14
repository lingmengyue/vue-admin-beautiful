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
  import { defineComponent, reactive, ref, watch, toRefs } from 'vue'
  import { mapGetters } from 'vuex'
  import { roleMange } from '@/api/auth'
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
    setup(props, context) {
      // 行数据
      const { raw_data } = toRefs(props)
      const expandedKeys = ref([])
      const selectedKeys = ref([])
      const checkedKeys = ref([])
      watch(expandedKeys, () => {
        console.log('expandedKeys', expandedKeys)
      })
      watch(selectedKeys, () => {
        console.log('selectedKeys', selectedKeys)
      })
      watch(checkedKeys, () => {
        console.log('checkedKeys', checkedKeys)
      })
      const replaceFields = {
        title: 'meta_title',
        key: 'id',
      }
      watch(raw_data, () => {
        actionChoice()
      })

      // 动作行为选择
      const actionChoice = async () => {
        let raw = raw_data.value
        if (raw) {
          formState.role_name = raw.role_name
          formState.status = raw.status ? true : false
          formState.id = raw.id
          let selected = await raw.auth_group.split(',').map(Number)
          expandedKeys.value = selected
          selectedKeys.value = selected
          checkedKeys.value = selected
        } else {
          initFormState()
        }
      }

      const formRef = ref()
      // 表单字段
      const formState = reactive({
        role_name: null, //角色名称
        auth_group: null, //角色权限
        status: true, //角色启用状态
        id: null, // 角色ID
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
            // 将选中的权限值进行赋予
            formState.auth_group = checkedKeys.value.join(',')
            roleMange(formState).then(() => {
              context.emit('onClose')
            })
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
      // 初始化表单字段值
      const initFormState = () => {
        formState.role_name = null
        formState.status = true
        formState.auth_group = null
        formState.id = null
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
        actionChoice,
      }
    },
    created() {
      this.actionChoice()
    },
  })
</script>
