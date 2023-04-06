<script lang="ts" setup>
import {reactive, ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";

const navList = reactive([
  {
    key: 'Matters',
    index: '1',
    title: '事项',
  },
  {
    key: 'Note',
    index: '2',
    title: '笔记'
  }
])

// 切换菜单
let activeIndex = ref('0') // 菜单默认选中项
function handleSelect(index: string): void {
  if (activeIndex.value !== index) {
    activeIndex.value = index
    router.push({name: `${navList[Number(index) - 1].key}`})
  }
}

let scrollHeight = ref((() => {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
})())


const userAboutButtonList = [
  {
    key: 'logout',
    label: '退出登录',
    clickFunction: logout
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
    name: 'Login'
  })
}
function toSetting() {
  ElMessage.warning('暂不支持设置')
}
</script>

<template>
  <div class="home-box" :style="{minHeight: `${scrollHeight}px`}">
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
            :index="item.index"
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
  display: flex;
  flex-direction: column;

  .menu-box {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
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
  }
}

:deep(focus-visible) {
  outline: none;
}
</style>
