<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {MatterSortValue, MatterSortValueList} from "@/util/constant/matters";
import {MatterType} from "@/util/interface/matter";
import {simpleUUID} from "@/util/uuid";
import {getMatterTypeList} from "@/axios/modules/matterType";
import {postCreateMatter, postUpdateMatter} from "@/axios/modules/matter";

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
  },
  matter: {
    type: Object,
    default: () => {
    }
  }
})
const dialogVisible = ref(false)
watch(
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
  name?: string,
  content?: string,
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
  isSelect?: boolean
  options?: Array<Options>
}

interface Options {
  key: string,
  label: string,
  value: string | number
}
let matterTypeList:MatterType[] = []
async function initTabList() {
  return await getMatterTypeList().then(res => {
    let {code, data, message} = res
    if (code === 200) {
      matterTypeList = data.sort((curr, next) => curr.sortValue - next.sortValue)
      matterFromItemList.find(item => item.key === 'type')?.options?.push(...formatOptions(matterTypeList))
    } else {
      ElMessage.warning(message)
    }
  }).finally(

  )
}
onMounted(async () => {
  await initTabList()
})

function formatOptions(list: Array<MatterType>): Array<Options> {
  return list.map(item => {
    return {
      label: item.name,
      key: item.id,
      value: item.id
    }
  })
}
let matterFromItemList = reactive<Array<MatterFromItem>>([
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
    options: []
  },
  {
    key: 'priority',
    label: '优先级',
    value: MatterSortValue.Fifth,// 默认最低优先级
    isSelect: true,
    options: MatterSortValueList
  }
])
interface CreateMatterParams {
  name: string,
  content: string,
  typeId?: number,
  priority?: number,
}
const matterFrom: MatterFrom = emptyMatter
function submit() {
  if (currDialogEditStatus()) {
    let submitObj = getSubmitParams<{ [key: string]: string | number }>()
    let params: { [key: string]: string | number } = {}
    Object.keys(submitObj).forEach(key => {
      if (props.matter[key] !== submitObj[`${key}`]) {
        params[key] = submitObj[`${key}`]
      }
    })
    postUpdateMatter(Object.assign({}, params, {id: props.matter.id})).then(res => {
      const {code, message} = res
      ElMessage({
        message: message,
        type: code === 200 ? 'success' : 'error'
      })
      if (code === 200) {
        handleClose()
        emit('on-callback')
      }
    })
  } else {
    let submitObj = getSubmitParams<CreateMatterParams>()
    if (submitObj['name'] === '' || submitObj['content'] === '') {
      ElMessage.error('事项的名称和内容不能为空！')
      return
    }
    postCreateMatter(submitObj).then(res => {
      const {code, message} = res
      ElMessage({
        message: message,
        type: code === 200 ? 'success' : 'error'
      })
      if (code === 200) {
        handleClose()
        emit('on-callback')
      }
    })
  }
}

function currDialogEditStatus() {
  return Object.keys(props.matter).length > 0
}

function getSubmitParams<T>(): T {
  let submitMatterObj: T
  submitMatterObj = Object.assign({}, ...matterFromItemList.map(item => {
    if (item.key === 'type') {
      return {
        ['typeId']: item.value
      }
    } else {
      return {
        [item.key]: item.value
      }
    }
  }))
  return submitMatterObj
}

const elFormKey = ref(simpleUUID())
watch(
    () => props.matter,
    value => {
      if (Object.keys(value).length) {
        matterFromItemList = reactive(matterFromItemList.map(item => {
          return {
            ...item,
            value: item.key === 'type'? value['typeId'] : value[item.key]
          }
        }))
      } else {
        matterFromItemList = reactive(matterFromItemList.map(item => {
          return {
            ...item,
            value: ''
          }
        }))
      }
      elFormKey.value = simpleUUID()
    }
)
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
  >
    <template #header>
      添加事项
    </template>
    <template #default>
      <el-form :model="matterFrom" :key="elFormKey">
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
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
