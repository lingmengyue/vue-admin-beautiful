<template>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <!--头像下拉组件-->
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  // 获取recordRoute的状态,布尔值,true:token失效回退到登录页时是否记录本次的路由
  import { recordRoute } from '@/config'
  import { DownOutlined } from '@ant-design/icons-vue'
  // 使用vuex
  import { useStore } from 'vuex'
  // 使用vue的computed组件
  import { computed } from 'vue'
  // 调用vue-router的方法
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VabAvatar',
    components: { DownOutlined },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      // 用户退出方法
      const logout = async () => {
        await store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = route.fullPath
          router.push(`/login?redirect=${fullPath}`)
        } else {
          router.push('/login')
        }
      }

      const buy = () => {
        window.open('http://vue-admin-beautiful.com/authorization/')
      }

      return {
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
        logout,
        buy,
      }
    },
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }
  }
</style>
