<script lang="ts" setup>
import {
  Edit,
  Setting
} from '@element-plus/icons-vue'
import MatterListComponent from "@/views/matters/components/matterList.vue";
import {ref, reactive, onMounted} from 'vue'
import MatterSetting from "@/views/matters/components/matterSetting.vue";
import MatterEdit from "@/views/matters/components/matterEdit.vue";
import {dayjs, ElMessage, ElTabs} from "element-plus";
import {simpleUUID} from '@/util/uuid'
import {Matter as MatterInterface} from "@/util/interface/matter";
import {finishMatter, getMatterList} from "@/axios/modules/matter";
import {getMatterTypeList} from "@/axios/modules/matterType";
import {MatterType} from '@/util/interface/matterType'

const tabList: MatterType[] = reactive([])
const tabKey = ref(simpleUUID())
const currTypeId = ref<string>('')

async function initTabList() {
  tabLoading.value = true
  await getMatterTypeList().then(res => {
    let {code, data, message} = res
    if (code === 200 || code === 304) {
      tabList.push(...data.sort((curr, next) => curr.sortValue - next.sortValue))
      tabList.push({
        id: '',
        createTime: '',
        updateTime: '',
        name: '未分类',
        sortValue: 0
      },{
        id: 'complete',
        createTime: '',
        updateTime: '',
        name: '已完成',
        sortValue: 0
      })
    } else {
      ElMessage.warning(message)
    }
  }).finally(() => {
    tabLoading.value = false
    tabKey.value = simpleUUID()
  })
  if (tabList.length) {
    currTypeId.value = tabList[0]?.id
  }
}

onMounted(async () => {
  await initTabList()
  await initMatterList(currTypeId.value) // 初始化事项列表
})

function handleTabClick(index: number) {
  let {id} = tabList[index]

  if (id === 'complete') {
    initMatterList(undefined, 1)
  } else {
    currTypeId.value = id
    initMatterList(currTypeId.value)
  }
}

let listKey = ref(simpleUUID())

const editDialogVisible = ref(false)

function handleAddMatter() {
  editDialogVisible.value = true
  editMatter.value = {}
}

function handleEditDialogVisible() {
  editDialogVisible.value = false
}


let matterList = reactive<Array<object>>([])
let settingDialogVisible = ref(false)

function matterSaveSetting(): void {
  settingDialogVisible.value = true
}

function handleChangeSettingVisible() {
  settingDialogVisible.value = false
}

function initMatterList(typeId?: string, isComplete?: number) {
  matterLoading.value = true
  return getMatterList({matterTypeId: typeId, isComplete}).then(res => {
    let {code, data, message} = res
    if (code === 200 || code === 304) {
      matterList = data.map(item => {
        return {
          ...item,
          createTime: dayjs(item.createTime).format('YYYY--mm-DD'),
          updateTime: dayjs(item.updateTime).format('YYYY--mm-DD')
        }
      }).sort((curr, next) => {
        return curr.priority - next.priority;
      })
    } else {
      ElMessage.warning(message)
    }
  }).finally(() => {
    matterLoading.value = false
    listKey.value = simpleUUID()
  })
}


let editDialogKey = ref(simpleUUID())

function handleCallback() {
  initMatterList(currTypeId.value)
  editDialogKey.value = simpleUUID()
}

function handleDeleteMatter(id: string) {
  finishMatter({id: id}).then(res => {
    const {code, message} = res
    ElMessage({
      message: message,
      type: code === 200 || code === 304 ? 'success' : 'error'
    })
  }).finally(() => {
    initMatterList(currTypeId.value)
  })
}

let editMatter = ref({})

function handleRowOnClick(matter: MatterInterface) {
  editMatter.value = matter
  editDialogVisible.value = true
}

const matterLoading = ref(false)
const tabLoading = ref(false)
</script>

<template>
  <div class="body">
    <div class="container matters-box" v-loading="tabLoading">
      <el-tabs @tab-change="handleTabClick($event)">
        <el-tab-pane
            v-for="item in tabList"
            :key="item.id"
            :label="item.name"
        >
          <MatterListComponent
              :key="listKey"
              :matter-list="matterList"
              @on-delete-matter="handleDeleteMatter"
              @on-click="handleRowOnClick"
              class="matter-list-item"
              :matterLoading="matterLoading"
          >
            <template v-slot:header>
              <div class="header">
                <div class="title-box">
                  <span>
                    事项
                  </span>
                </div>
                <div class="button-list">
                  <el-button type="primary" :icon="Edit" circle @click="handleAddMatter"></el-button>
                  <el-button :icon="Setting" circle @click="matterSaveSetting"></el-button>
                </div>
              </div>
            </template>
          </MatterListComponent>
          </el-tab-pane>
      </el-tabs>
      <MatterEdit
          v-model:visible="editDialogVisible"
          :matter="editMatter"
          @on-close="handleEditDialogVisible"
          @on-callback="handleCallback"
          :key="editDialogKey"
      ></MatterEdit>
      <MatterSetting v-model:visible="settingDialogVisible" @on-close="handleChangeSettingVisible"></MatterSetting>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/styles/public.scss";

.matters-box {
  //min-width: 1920px;

  .matter-list-box {

    .header {
      //padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-box {
        font-size: 18px;
      }

      .button-list {

      }
    }
  }
}

.svg-icon {
  width: 30px;
  height: 30px;
}

.matter-list-item {
  transition: all 0.3s;
}
</style>
