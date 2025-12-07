<script lang="ts" setup>
import SvgIcon from '@/components/svgIcon/index.vue'
import {Matter} from "@/util/interface/matter";
const props = defineProps({
  matterList: {
    type: Array,
    default: () => []
  },
  matterLoading: {
    type: Boolean,
    default: false,
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
    <el-skeleton :loading="matterLoading" :rows="5" animated>
      <template #template>
        <div v-for="item in 3" :key="`skeleton-${item}`" class="skeleton-item">
          <el-skeleton-item/>
        </div>
      </template>
      <template #default>
        <div v-if="matterList?.length">
          <div class="matters-item" v-for="(item, index) in props.matterList" :key="`matter-${index}}`"  @click="handleClick(item)">
            <svg-icon
                v-if="item.isComplete === 0"
                icon-class="circle"
                class-name="svg-icon"
                @click.stop="handleDeleteMatter(item.id)"
            ></svg-icon>
            <div class="content-box">
              <div>
                <span style="" class="name">{{ item.name }}</span>
              </div>
              <div>
                <span class="content">{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <span>暂无更多......</span>
        </div>
      </template>
    </el-skeleton>
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
    border-radius: 30px;
    border: 1px solid #039BD2;

    .content-box {
      margin-left: 10px;
      // 单行文本超出范围隐藏，省略显示 ...
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .name {
        font-weight: 500;
        //font-size: 20px;
      }

      .content{
        color: #999999;
      }
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

.skeleton-item {

  .el-skeleton__item {
    margin-top: 10px;
    height: 30px;
    padding: 10px 0;
    border-radius: 30px;
  }
}
</style>
