<script setup lang="ts">
import {createBillRecord, getBillRecordList, updateBillRecord} from "@/axios/modules/bill";
import {ref} from "vue";
import {BillRecord} from '@/util/interface/billRecord'
import {dayjs, ElButton, ElMessage} from "element-plus";
import SvgIcon from "@/components/svgIcon/index.vue";
import cloneDeep from 'lodash/cloneDeep'
import {isEmpty} from "@/util/public";

// editComponentType 决定是否可以编辑
const BaseTargetKeyList: CellItem[] = [
  {
    key: 'name',
    label: '名称',
    editComponentType: 'Input',
  },
  {
    key: 'description',
    label: '描述',
    editComponentType: 'Input',
  },
  {
    key: 'amount',
    label: '金额',
    editComponentType: 'InputNumber',
  },
  {
    key: 'directionId',
    label: '方向',
    editComponentType: 'Select',
  },
  {
    key: 'recipient',
    label: '接收者',
    editComponentType: 'Input',
  },
  {
    key: 'paymentTime',
    label: '支付时间',
    editComponentType: 'DatePicker',
  },
  {
    key: 'statusId',
    label: '状态',
    editComponentType: 'Switch',
  },
  {
    key: 'typeId',
    label: '类型',
    editComponentType: 'Select',
  },
  {
    key: 'createTime',
    label: '创建时间'
  },
  {
    key: 'updateTime',
    label: '更新时间'
  }
]
const billRecordList = ref<BillRecord[]>()

function initPage() {
  refreshBillRecordList()
}
initPage()

function refreshBillRecordList() {
  getBillRecordList().then(res => {
    if (res.code === 200) {
      billRecordList.value = formatBillRecordList(res.data)
    }
  })
}

function formatBillRecordList(list: BillRecord[]) {
  return list.map(item => {
    return {
      ...item,
      createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      paymentTime: dayjs(item.paymentTime).format('YYYY-MM-DD HH:mm:ss')
    }
  })
}

const dialogTitle = ref<string>('')
const dialogCellItem = ref<CellItem[]>()
const editBillRecord =ref<BillRecord>()
const directionIdOptions = [
  {
    value: 0,
    label: '收入',
  },
  {
    value: 1,
    label: '支出',
  }
]

function handleToDetailPage(id: bigint) {
  const targetBillRecord = billRecordList.value?.find(item => item.id === id)
  if (!isEmpty(targetBillRecord)) {
    editBillRecord.value = targetBillRecord || {} as BillRecord
  }
  if (!isEmpty(targetBillRecord)) {
    const targetKeyList = cloneDeep(BaseTargetKeyList).map((item) => {
      const value = ((targetBillRecord as never)[item.key])
      const valueIsEmpty = isEmpty(value)
      if (item.key === 'name') {
        // 定义dialog的title
        dialogTitle.value = valueIsEmpty ? '' : value
      }
      item.value = valueIsEmpty ? '' : value
      item.orgValue = valueIsEmpty ? '' : value
      item.isHide = valueIsEmpty
      item.showValue = valueIsEmpty ? '' : value


      if (item.key === 'amount') {
        item.value = valueIsEmpty ? undefined : Number(value)
        item.orgValue = valueIsEmpty ? undefined : Number(value)
      }
      if (item.key === 'directionId') {
        item.showValue = directionIdOptions.find(item => Number(item.value) === Number(value))?.label || item.value
      }
      return item
    }).filter(item => !item.isHide)
    dialogCellItem.value = cloneDeep(targetKeyList)
    switchDrawerVisible(true)
  } else {
    ElMessage({
      message: '数据错误，请稍后重试！'
    })
  }
}

function handleCloseDialog() {
  isDialogEditMode.value = false
  editCellItemList.value = []
  editBillRecord.value = undefined
}

enum EditComponentType {
  Input = 'Input',
  InputNumber = 'InputNumber',
  Select = 'Select',
  Switch = 'Switch',
  DatePicker = 'DatePicker',
  Radio = 'Radio'
}

type EditComponentTypeKey = keyof typeof EditComponentType

interface CellItem {
  key: string,
  label?: string,
  value?: any,
  orgValue?: any,
  showValue?: any,
  editComponentType?: EditComponentTypeKey,
  isHide?: boolean
}

const isDialogEditMode = ref<boolean>(false)
const editCellItemList = ref<CellItem[]>()

function handleSwitchEdit() {
  if (isDialogEditMode.value) {
    // 切换回非编辑模式，还原数据
    isDialogEditMode.value = false
    editCellItemList.value = editCellItemList.value?.map((item) => {
      item.value = cloneDeep(item.orgValue)
      return item
    })
  } else {
    editCellItemList.value = dialogCellItem.value?.filter(item => !isEmpty(item.editComponentType))
    if (editCellItemList.value?.length) {
      isDialogEditMode.value = true
    } else {
      ElMessage({
        message: '没有可以编辑的项'
      })
    }
  }
}

function handleSubmitEdit() {
  if (editCellItemList.value && Array.isArray(editCellItemList.value) && editCellItemList.value.length > 0) {
    const billRecord: BillRecord = editCellItemList.value?.reduce((acc, curr) => {
      if (!isEmpty((curr.key)) && curr.value !== curr.orgValue) {
        Object.assign(acc, {[curr.key]: curr.value})
      }
      return acc
    }, {}) as BillRecord;
    if (editBillRecord.value?.id) {
      updateBillRecord(Object.assign({id: editBillRecord.value?.id}, billRecord)).then(res => {
        const isSuccess = res.code === 200
        if (isSuccess) {
          isDialogEditMode.value = false
          editCellItemList.value = []
          drawerVisible.value = false
          refreshBillRecordList()
        }
        ElMessage({
          message: res.message,
          type:isSuccess ? 'success' : 'warning'
        })
      })
    } else {
      createBillRecord(billRecord).then(res => {
        const isSuccess = res.code === 200
        if (isSuccess) {
          isDialogEditMode.value = false
          editCellItemList.value = []
          drawerVisible.value = false
          refreshBillRecordList()
        }
        ElMessage({
          message: res.message,
          type:isSuccess ? 'success' : 'warning'
        })
      })
    }
  }
}


const drawerVisible = ref<boolean>(false)

function switchDrawerVisible(specifiedState: boolean | undefined) {
  if (specifiedState !== undefined) {
    drawerVisible.value = specifiedState
  } else {
    drawerVisible.value = !drawerVisible.value
  }
}

function drawerHandleClose() {
  handleCloseDialog()
  switchDrawerVisible(false)
}

function handleAddNewBillRecord() {
  editCellItemList.value = cloneDeep(BaseTargetKeyList).filter(item => !isEmpty(item.editComponentType))
  isDialogEditMode.value = true
  switchDrawerVisible(true)
}
</script>

<template>
  <div class="body">
    <div class="container">
      <div class="container-header">
        <div class="header-left">我的账单记录</div>
        <div class="header-right">
          <svg-icon icon-class="round_add" @click="handleAddNewBillRecord"></svg-icon>
        </div>
      </div>
      <div class="bill-record-item" v-for="(item, index) in billRecordList" :key="index">
        <div class="bill-record-item-left">
          <div>{{ item.name }}</div>
          <div class="bill-record-item_createTime">{{ item.createTime }}</div>
        </div>
        <div class="bill-record-item-right">
          <div>{{ item.amount }}</div>
          <svg-icon
              icon-class="info"
              class-name="svg-icon"
              @click.stop="handleToDetailPage(item.id)"
          ></svg-icon>
        </div>
      </div>
    </div>
    <el-drawer
        v-model="drawerVisible"
        :direction="'btt'"
        :before-close="drawerHandleClose"
        :show-close="false"
        style="border-top-left-radius: 30px !important;
        border-top-right-radius: 30px !important;min-height: 80%;"
    >
      <template #header="{ close }">
        <div class="dialog-header">
          <div class="dialog-title-text">{{ dialogTitle }}</div>
          <div class="event-svg-group">
            <svg-icon icon-class="edit" class-name="svg-icon" @click="handleSwitchEdit"></svg-icon>
            <svg-icon icon-class="close" class-name="svg-icon" @click="close"></svg-icon>
          </div>
        </div>
      </template>
      <template #default>
        <template v-if="isDialogEditMode">
          <div class="edit-content-box">
            <div class="edit-content">
              <div class="bill-record-info-item" v-for="cell in editCellItemList" :key="cell.key">
                <div>{{ cell.label }}:</div>
                <div>
                  <template v-if="cell.editComponentType === EditComponentType.Select">
                    <el-select
                        v-model="cell.value"
                        placeholder="Select"
                        size="default"
                        style="width: 240px"
                    >
                      <el-option
                          v-for="item in directionIdOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </template>
                  <template v-else-if="cell.editComponentType === EditComponentType.Input">
                    <el-input style="width: 240px" v-model="cell.value"></el-input>
                  </template>
                  <template v-else-if="cell.editComponentType === EditComponentType.InputNumber">
                    <el-input-number style="width: 240px" v-model="cell.value" :precision="2" :step="0.1" />
                  </template>
                  <template v-else-if="cell.editComponentType === EditComponentType.DatePicker">
                    <el-date-picker
                        style="width: 240px"
                        v-model="cell.value"
                        type="datetime"
                        placeholder="请选择"
                        format="YYYY/MM/DD HH:mm:ss"
                        value-format="YYYY/MM/DD HH:mm:ss"
                        data-format="YYYY/MM/DD HH:mm:ss"
                        editable
                    />
                  </template>
                  <template v-else-if="cell.editComponentType === EditComponentType.Switch">
                    <el-switch
                        v-model="cell.value"
                        size="large"
                        active-text="Open"
                        inactive-text="Close"
                    />
                  </template>
                  <template v-else>
                    <div>{{ cell.showValue }}</div>
                  </template>
                </div>
              </div>
            </div>
            <div class="dialog-button-group">
              <el-button class="submit-class" type="primary" @click="handleSubmitEdit">提交</el-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="edit-content-box">
            <div class="edit-content">
              <div class="bill-record-info-item" v-for="cell in dialogCellItem" :key="cell.key">
                <div>{{ cell.label }}:</div>
                <div>{{ cell.showValue }}</div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/styles/public.scss";


.container-header {
  padding: 10px 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bill-record-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  box-sizing: border-box;
  border: 1px solid #039BD2;
  border-radius: 50px;

  .bill-record-item_createTime {
    font-size: 12px;
    color: #989898;
  }

  .bill-record-item-right {
    display: flex;
    align-items: center;
  }
}

.bill-record-item:not(:last-child) {
  margin-bottom: 10px;
}


.svg-icon {
  margin-left: 10px;
  width: 24px;
  height: 24px;
}


.dialog-header {
  display: flex;
  justify-content: space-between;
}

.dialog-button-group {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .submit-class {
    width: 100%;
  }
}

.svg-icon {
  width: 20px;
  height: 20px;
  cursor: pointer; // 小手
}

.edit-content-box {
  display: flex;
  flex-direction: column;
  height: 100%;

  .edit-content {
    flex: 1;

    .bill-record-info-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      align-items: center;
    }

    .bill-record-info-item:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}


</style>