<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {isEmpty} from "@/util/public";
import { useDark, useToggle } from '@vueuse/core'

const theme = localStorage.getItem("theme");
const isDark = useDark({ valueDark: 'dark', valueLight: 'light' })
doSwitchTheme(theme === "dark")
const navList = reactive([
  {
    key: 'Matters',
    title: '事项',
    isHide: false,
  },
  {
    key: 'Note',
    title: '笔记',
    isHide: true,
  },{
    key: 'Bill',
    title: '账本',
    isHide: false,
  }
].filter(item => !item.isHide))

// let activeIndex = ref(navList[0].key) // 菜单默认选中项
let activeIndex = ref() // 菜单默认选中项
onMounted(() => {
  // 执行数据请求
  // 切换菜单
  if (!isEmpty(activeIndex.value)) {
    handleSelect(activeIndex.value)
  }
})

function handleSelect(index: string): void {
  const targetNav =  navList.find((item) => item.key === index)
  if (targetNav) {
    activeIndex.value = index
    router.push({name: `${targetNav.key}`})
  }
}

const userAboutButtonList = [
  {
    key: 'logout',
    label: '退出登录',
    clickFunction: logout
  },
  {
    key: 'changeTheme',
    label: '切换主题',
    clickFunction: switchTheme
  },
  {
    key: 'setting',
    label: '设置',
    clickFunction: toSetting
  }
]

function logout() {
  sessionStorage.removeItem('token')
  router.push({
    name: 'Login',
    query: {

    }
  })
}
function toSetting() {
  ElMessage.warning('暂不支持设置')
}

function switchTheme(event) {
  doSwitchTheme()
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

function doSwitchTheme(useDark?: boolean) {
  isDark.value = isEmpty(useDark) ? !isDark.value : useDark || false
}
</script>

<template>
  <div class="home-box">
    <div class="menu-box">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo flex-grow"
          mode="horizontal"
          @select="handleSelect"
      >
        <el-menu-item
            v-for="(item, index) in navList"
            :key="`${item.key}-${index}`"
            :index="item.key"
        >{{ item.title }}
        </el-menu-item>
      </el-menu>
      <el-dropdown>
        <div class="setting-box">
          <div class="setting-button">
            <div class="user-img">
              <img src="@/assets/logo.png" alt="">
            </div>
            <div class="user-name">
              <span>UserName</span>
            </div>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
                v-for="(item) in userAboutButtonList"
                :key="item.key"
                @click="item.clickFunction"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <router-view class="router-view-box"></router-view>
  </div>

</template>

<style scoped lang="scss">
.home-box {
  flex: 1; // 与app.vue中的main-body的flex布局先对应
  display: flex;
  flex-direction: column;

  .menu-box {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px var(--el-menu-border-color);
    flex-shrink: 0;

    .flex-grow {
      flex: 1;
    }

    .el-menu-demo {
      border-bottom: none
    }

    .setting-box {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;


      .setting-button {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-img {
          width: 30px;
          height: 30px;
          margin: 5px;
          border-radius: 50%;
          overflow: hidden;
          border: solid 1px var(--el-menu-border-color);

          img {
            width: 30px;
            height: 30px;
          }
        }

        .user-name {
          font-size: 14px;
        }
      }
    }
  }

  .router-view-box {
    flex: 1;

    background-color: var(--bg-primary);
  }
}

:deep(focus-visible) {
  outline: none;
}
</style>
