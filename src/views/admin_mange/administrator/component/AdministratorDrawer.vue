<template>
  <div class="index-container">
    <a-form
      ref="formRef"
      :model="this.formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="管理员名称" name="username">
        <a-input
          v-model:value="this.formState.username"
          placeholder="输入管理员名称"
        />
      </a-form-item>
      <a-form-item label="管理员密码" name="password">
        <a-input
          v-model:value="this.formState.password"
          placeholder="输入管理员密码"
        />
      </a-form-item>
      <a-form-item label="管理员角色" name="role_id">
        <a-select
          v-model:value="this.formState.role_id"
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="role_data"
        ></a-select>
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
  import { adminMange } from '@/api/auth'
  export default defineComponent({
    props: {
      raw_data: {
        type: Object,
        default() {
          return null
        },
      },
      role_data: {
        type: Object,
        default() {
          return null
        },
      },
    },
    setup(props, context) {
      // 行数据
      const { raw_data } = toRefs(props)
      watch(raw_data, () => {
        actionChoice()
      })
      // 动作行为选择
      const actionChoice = async () => {
        let raw = raw_data.value
        if (raw) {
          formState.username = raw.username
          formState.role_id = raw.role.id
          formState.id = raw.id
          console.log('edit raw', formState)
        } else {
          initFormState()
        }
      }
      const formRef = ref()
      // 表单字段
      const formState = reactive({
        username: null, //角色名称
        password: null, //角色权限
        role_id: 1, //角色启用状态
        id: null, // 角色ID
      })
      // 表单验证规则
      const rules = {
        username: [
          {
            required: true,
            message: '请输入管理员名字',
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
        console.log('submit_data', formState)
        formRef.value
          .validate()
          .then(() => {
            adminMange(formState).then(() => {
              context.emit('onClose')
            })
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
      // 初始化表单字段值
      const initFormState = () => {
        formState.username = null
        formState.password = null
        formState.role_id = 1
        formState.id = null
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
