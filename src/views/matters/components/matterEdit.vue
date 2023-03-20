<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {setMatter} from '../matterApi'
import {MatterTypeList, MatterSortValueList} from "@/util/constant/matters";
import {MatterType} from "@/util/interface/matter";

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
  }
})
const dialogVisible = ref(false)
watch (
    () => props.visible,
    value => {
      dialogVisible.value = value
    }
)
const emit = defineEmits(['update:visible', 'on-callback'])
function handleClose() {
  emit('update:visible', false)
}


interface MatterFrom {
  name: string,
  content: string,
  typeId?: number
  priority?: number
}
const emptyMatter = {
  name: '',
  content: '',
  typeId: 0,
  priority: 0
}
interface MatterFromItem {
  key: string,
  label: string,
  value: string | number
  isSelect? :boolean
  options?: Array<Options>
}
interface Options {
  key: string,
  label: string,
  value: string | number
}
function formatOptions(list: Array<MatterType>): Array<Options> {
  return list.map(item => {
    return {
      label: item.name,
      key: item.id,
      value: item.id
    }
  })
}
const matterFromItemList = reactive<Array<MatterFromItem>>([
  {
    key: 'name',
    label: '名称',
    value: '',
  },
  {
    key: 'content',
    label: '内容',
    value: ''
  },
  {
    key: 'type',
    label: '类型',
    value: '',
    isSelect: true,
    options: formatOptions(MatterTypeList)
  },
  {
    key: 'priority',
    label: '优先级',
    value: '',
    isSelect: true,
    options: MatterSortValueList
  }
])

const matterFrom: MatterFrom = emptyMatter
function handleAddMatter(): void {
  let submitMatterObj: MatterFrom = emptyMatter
  matterFromItemList.forEach(item => {
    let {key, value} = JSON.parse(JSON.stringify(item))
    if (key === 'name') {
      submitMatterObj.name = value
    } else if (key === 'content') {
      submitMatterObj.content = value
    } else if (key === 'type') {
      submitMatterObj.typeId = value
    } else if (key === 'priority') {
      submitMatterObj.priority = value
    }
  })

  if (submitMatterObj['name'] === '' || submitMatterObj['content'] === '') {
    ElMessage.error('事项的名称和内容不能为空！')
    return
  }

  setMatter(submitMatterObj).then(value => {
    if (value === 'success') {
      handleClose()
      emit('on-callback')
      ElMessage.success('保存成功')
    } else {
      ElMessage.warning('保存错误')
    }
  }).catch(e => {
    ElMessage.error(e.message)
  })
}

</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      title="添加事项"
      width="30%"
      :before-close="handleClose"
  >
    <template #default>
      <el-form :model="matterFrom">
        <el-form-item
            v-for="(item) in matterFromItemList"
            :key="`from-item-${item.key}`"
            :label="item.label"
        >
          <el-input v-if="['name', 'content'].includes(item.key)" v-model="item.value"></el-input>
          <el-select
              v-else-if="['type', 'priority'].includes(item.key)"
              v-model="item.value"
              class="m-2"
              placeholder="请选择"
              size="large"
          >
            <el-option
                v-for="item in item.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleAddMatter">提交</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
