<script lang="ts" setup>
import {
  Edit,
  Setting
} from '@element-plus/icons-vue'
import {ref, reactive, onMounted} from 'vue'
import MatterSetting from "@/views/matters/components/matterSetting.vue";
import MatterEdit from "@/views/matters/components/matterEdit.vue";
import {deleteMatter} from './matterApi'
import {dayjs, ElMessage, ElTabs} from "element-plus";
import {simpleUUID} from '@/util/uuid'
import MatterList from './components/matterList.vue'
import {Matter as MatterInterface} from "@/util/interface/matter";
import {getMatterList} from "@/axios/modules/matter";
import {getMatterTypeList} from "@/axios/modules/matterType";
import {MatterType} from '@/util/interface/matterType'

const tabList: MatterType[] = reactive([])
const currTypeId = ref<string>( '')
async function initTabList() {
  await getMatterTypeList().then(res => {
    let {code, data, message} = res
    if (code === 200) {
      data.forEach(item => {
        if (tabList.length && tabList.find(item => item.id !== item.id)) {
          tabList.push(item)
        }
      })
    } else {
      ElMessage.warning(message)
    }
  }).finally(

  )
  if (tabList.length) {
    currTypeId.value = tabList[0]?.id
  }
  console.log('currTypeId', currTypeId)
}
onMounted(() => {
  initTabList()
})

const allTabIdList = tabList.map(item => item.id)
// const currTabValue = ref('10001')
console.log('tabList', tabList)
console.log('allTabIdList', allTabIdList)



function handleTabClick(index: number) {
  let {id} = tabList[index]
  currTypeId.value = id
  initMatterList(currTypeId.value)
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

function initMatterList(typeId: string) {
  getMatterList({typeId: typeId}).then(res => {
    let {code, data, message} = res
    if (code === 200) {
      matterList = data.map(item => {
        return {
          ...item,
          createTime: dayjs(item.createTime).format('YYYY--mm-DD'),
          updateTime: dayjs(item.updateTime).format('YYYY--mm-DD')
        }
      })
    } else{
      ElMessage.warning(message)
    }
  }).finally(() => {
    listKey.value = simpleUUID()
  })
}
initMatterList(currTypeId.value) // 初始化事项列表

let editDialogKey = ref(simpleUUID())

function handleCallback() {
  initMatterList(currTypeId.value)
  editDialogKey.value = simpleUUID()
}

function handleDeleteMatter(id: string) {
  deleteMatter(id).then(() => {
    ElMessage.success('删除成功')
    initMatterList(currTypeId.value)
  }).catch(err => {
    ElMessage.error(err.message)
  })
}

let editMatter = ref({})
function handleRowOnClick(matter: MatterInterface) {
  editMatter.value = matter
  editDialogVisible.value = true
}
// 列表展示
</script>

<template>
  <div class="matters-box">
    <el-tabs type="border-card" @tab-change="handleTabClick($event)">
      <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :label="item.name"
      >
        <MatterList
            :key="listKey"
            :matter-list="matterList"
            @on-delete-matter="handleDeleteMatter"
            @on-click="handleRowOnClick"
        >
          <template v-slot:header>
            <div class="header">
              <div class="title-box">
                <span>
                  代办事项
                </span>
              </div>
              <div class="button-list">
                <el-button type="primary" :icon="Edit" circle @click="handleAddMatter"></el-button>
                <el-button :icon="Setting" circle @click="matterSaveSetting"></el-button>
              </div>
            </div>
          </template>
        </MatterList>
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
