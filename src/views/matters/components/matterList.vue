<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import {Matter} from "@/util/interface/matter";
const props = defineProps({
  matterList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['on-deleteMatter', 'on-click'])

function handleDeleteMatter(id: string) {
  emit('on-deleteMatter', id)
}
function handleClick(matter: Matter) {
  emit('on-click', matter)
}
</script>

<template>
  <div class="matter-list-box">
    <slot name="header"></slot>
    <div v-if="matterList?.length">
      <div class="matters-item" v-for="(item, index) in props.matterList" :key="`matter-${index}}`">
        <svg-icon
            icon-class="circle"
            class-name="svg-icon"
            @click="handleDeleteMatter(item.id)"
        ></svg-icon>
        <div class="content-box" @click="handleClick(item)">
          <span class="content">{{ item.content }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <span>暂无更多......</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.matter-list-box {
  padding: 10px;

  .matters-item {
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid #039BD2;

    .content-box {
      margin-left: 10px;
      // 单行文本超出范围隐藏，省略显示 ...
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .matters-item:not(:last-child) {
    margin-bottom: 10px;
  }
  .matters-item:first-child {
    margin-top: 10px;
  }
}

.svg-icon {
  width: 30px;
  height: 30px;
}
</style>
