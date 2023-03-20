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
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <template #default>
      <div v-for="settingItem in settingList" :key="`setting-${settingItem.key}`" class="setting-item">
        <div class="setting-item-label">
          <span>{{ settingItem.label }}</span>
        </div>
        <el-select v-model="settingItem.value" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in settingItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
    </template>
  </el-dialog>
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

</style>
