<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
import {
  MattersSaveMode,
  MattersSaveModeName,
  MatterSaveModeKey
} from '@/util/constant/matters'

const props = defineProps({
  visible: {
    type: Boolean,
    required: false
  }
})
const dialogVisible = ref(false)
watch(
    () => props.visible,
    value => {
      dialogVisible.value = value
    }
)
const emit = defineEmits(["update:visible"])

function handleClose() {
  emit('update:visible', false)
}

interface SettingListObj {
  key: string,
  label: string,
  component: string,
  options: Array<{
    key: string,
    label: string,
    value: string | number
  }>,
  value: string | number | null
}

const settingList = reactive<Array<SettingListObj>>([
  {
    key: 'saveMode',
    label: '事项列表保存方式',
    component: 'select',
    options: [
      {
        key: MatterSaveModeKey[MattersSaveMode.SessionStorage],
        label: MattersSaveModeName[MattersSaveMode.SessionStorage],
        value: MattersSaveMode.SessionStorage
      },
      {
        key: MatterSaveModeKey[MattersSaveMode.LocalStorage],
        label: MattersSaveModeName[MattersSaveMode.LocalStorage],
        value: MattersSaveMode.LocalStorage
      },
      {
        key: MatterSaveModeKey[MattersSaveMode.BackendStorage],
        label: MattersSaveModeName[MattersSaveMode.BackendStorage],
        value: MattersSaveMode.BackendStorage
      },
    ],
    value: null,
  }
])

</script>

<template>
  <el-drawer
      v-model="dialogVisible"
      title="Tips"
      :before-close="handleClose"
      :direction="'btt'"
      :size="'61.8%'"
      style="border-top-left-radius: 30px !important;
        border-top-right-radius: 30px !important;min-height: 80%;"
  >
    <template #default>
      <div v-for="settingItem in settingList" :key="`setting-${settingItem.key}`" class="setting-item">
        <div class="setting-item-label ellipsis">
          <span>{{ settingItem.label }}</span>
        </div>
        <el-select v-model="settingItem.value" class="m-2" placeholder="Select" size="large" style="flex: 1">
          <el-option
              v-for="item in settingItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.setting-item {
  padding: 10px;
  display: flex;
  align-items: center;

  .setting-item-label {
    margin-right: 10px;
  }
}

.ellipsis {
  white-space: nowrap;      /* 禁止换行 */
  overflow: hidden;        /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>
