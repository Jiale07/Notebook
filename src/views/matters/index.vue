<script lang="ts" setup>
import {
  Edit,
  Setting
} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue'
import MatterSetting from "@/views/matters/components/matterSetting.vue";
import MatterEdit from "@/views/matters/components/matterEdit.vue";
import {getMatter, deleteMatter} from './matterApi'
import {ElMessage, ElTabs} from "element-plus";
import {simpleUUID} from '@/util/uuid'
import MatterList from './components/matterList.vue'
import {MatterTypeList} from "@/util/constant/matters";

const tabList = ref(MatterTypeList)
const allTabIdList = MatterTypeList.map(item => item.id)
const currTabValue = ref('10001')

function handleTabClick(index: number) {
  let {id} = tabList.value[index]
  currTabValue.value = id
  getMatterList()
}

let listKey = ref(simpleUUID())

const editDialogVisible = ref(false)

function visibleDialog() {
  editDialogVisible.value = true
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

function getMatterList() {
  if (currTabValue.value === '10005') {
    matterList = getMatter().filter(item => item.isDeleted === 0 && !allTabIdList.includes(String(item.typeId)))
  } else {
    matterList = getMatter().filter(item => item.isDeleted === 0 && item.typeId === currTabValue.value)
  }
  listKey.value = simpleUUID()
}

getMatterList() // 初始化事项列表

let editDialogKey = ref(simpleUUID())

function handleCallback() {
  getMatterList()
  editDialogKey.value = simpleUUID()
}

function handleDeleteMatter(id: string) {
  deleteMatter(id).then(() => {
    ElMessage.success('删除成功')
    getMatterList()
  }).catch(err => {
    ElMessage.error(err.message)
  })
}


// 列表展示
</script>

<template>
  <div class="matters-box">
    <el-tabs type="border-card" @tab-change="handleTabClick">
      <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :label="item.name"
      >
        <MatterList
            :key="listKey"
            :matter-list="matterList"
            @on-delete-matter="handleDeleteMatter"
        >
          <template v-slot:header>
            <div class="header">
              <div class="title-box">
                <span>
                  代办事项
                </span>
              </div>
              <div class="button-list">
                <el-button type="primary" :icon="Edit" circle @click="visibleDialog"></el-button>
                <el-button :icon="Setting" circle @click="matterSaveSetting"></el-button>
              </div>
            </div>
          </template>
        </MatterList>
      </el-tab-pane>
    </el-tabs>

    <MatterEdit
        v-model:visible="editDialogVisible"
        @on-close="handleEditDialogVisible"
        @on-callback="handleCallback"
        :key="editDialogKey"
    ></MatterEdit>
    <MatterSetting v-model:visible="settingDialogVisible" @on-close="handleChangeSettingVisible"></MatterSetting>
  </div>
</template>

<style scoped lang="scss">
.matters-box {

  .matter-list-box {

    .header {
      padding: 10px 0;
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
</style>
