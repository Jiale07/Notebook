<script setup lang="ts">
import {computed, getCurrentInstance, ref} from "vue";
import {CaretBottom, CaretLeft} from "@element-plus/icons-vue";

interface Base {
  id?: string,
  createTime?: Date,
  updateTime?: Date,
  isDeleted?: number,
}

interface Folder extends Base {
  name: string,
  parentFolderId: string,
  authorId: string,
}

interface FolderTree extends Folder {
  children?: Folder[];
  isOpen?: boolean;
  isSelected?: boolean
}

const props = defineProps({
  folderTree: {
    type: Object as () => FolderTree[],
    required: true
  },
})

const formatFolderTree = computed(() => {
  return props.folderTree?.map(item => {
    return {
      ...item,
      isOpen: false,
      isSelected: false
    }
  })
})

// 强行更新组件
const instance = getCurrentInstance();
function forceUpdate() {
  instance?.proxy?.$forceUpdate();
}

const emits = defineEmits(['change-folder-id'])
// 控制展开关闭
function handleClickItem(nodeItem: FolderTree) {
  if (nodeItem.children && nodeItem.children?.length > 0) {
    nodeItem.isOpen = !nodeItem.isOpen
  }
  if (nodeItem.id) {
    currFolderId.value = nodeItem.id
    emits('change-folder-id', nodeItem.id)
  }
  forceUpdate()
}

const currFolderId = ref<string>()
function handleChangeFolderId(id: string) {
  currFolderId.value = id
  emits('change-folder-id', id)
}


// provide('folderProvideSetting', {
//   currFolderId,
//
// })

// interface FolderProvideSetting {
//   currFolderId: string,
// }
// const newFolderId = inject<FolderProvideSetting>('folderProvideSetting')
// watch(, () => {
//   console.log('newFolderId', newFolderId)
// })
</script>

<template>
  <div>
    <div v-for="(nodeItem, index) in formatFolderTree" :key="index" class="folder-item">
      <!--    ${newFolderId.getCurrFolderId() === nodeItem.id ? 'folder-item-click-style': ''}-->
      <div :class="`folder-item__content hover-hand `" @click.stop="handleClickItem(nodeItem)">
      <span>
        {{ nodeItem.name }}
      </span>
        <div class="content-right">
        <span class="content-right__count">
          {{ nodeItem.children && nodeItem.children.length || 0 }}
        </span>
          <div v-if="nodeItem.children && nodeItem.children.length > 0">
            <el-icon>
              <CaretBottom v-if="nodeItem.isOpen"/>
              <CaretLeft v-else/>
            </el-icon>
          </div>
        </div>
      </div>

      <transition name="folder-list">
        <div
            v-if="nodeItem.children && nodeItem.children.length > 0"
            class="folder-item hover-hand nest-style"
            :style="{ maxHeight: nodeItem.isOpen ? `${(nodeItem.children.length + 1)*40.6}px` : '0' }"
        >
          <folder-tree-list :folder-tree="nodeItem.children" @change-folder-id="handleChangeFolderId"></folder-tree-list>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.folder-item {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.folder-item__content {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;


  .content-right {
    display: flex;
    align-items: center;

    .content-right__count {
      color: #c0c3c7;
      font-size: 14px;
    }
  }
}

.folder-item__content:hover {
  background-color: #eff5ff;
}

.folder-item-click-style {
  background-color: aliceblue;
}

.nest-style {
  padding-left: 10px;
}
</style>
