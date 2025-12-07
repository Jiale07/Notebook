<script lang="ts" setup>
import {ref, onMounted, onBeforeMount, reactive, getCurrentInstance} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import {getFolderTree, getNotebookList, postCreateFolder} from "@/axios/modules/notebook";
import FolderTreeList from "@/views/note/components/folderTreeList.vue";
import {FolderAdd} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

interface Base {
  id: string,
  createTime: Date,
  updateTime: Date,
  isDeleted?: number,
}

interface Folder extends Base {
  name: string,
  parentFolderId: string,
  authorId: string,
}

interface FolderTree extends Folder {
  children?: Folder[];
}


const title = ref('')
const vditor = ref<Vditor | null>(null);
onMounted(async () => {
  vditor.value = new Vditor('vditor', {
    after() {
      vditor.value?.setValue('');
    },
    placeholder: "请输入...",
    height: '100%',
    toolbar: ['emoji', 'headings', 'br', 'bold', 'italic', '|', 'line', 'list', 'ordered-list', 'outdent', 'indent', '|', 'code', 'inline-code', 'table', '|', 'outline', 'edit-mode', 'export']
  });
});

function handleSubmitDoc() {
  const data = {
    title: title.value,
    content: vditor.value?.getValue(),
  }
}

function convertToFolderTree(folders: Folder[]): FolderTree[] {
  const folderTrees: FolderTree[] = [];
  folders
      .forEach(folder => {
        if (!folder.parentFolderId) {
          const folderTree: FolderTree = {
            ...folder,
            children: []
          };
          folderTrees.push(folderTree);
        } else {
          const parentFolderTree = findFolderTreeById(folderTrees, folder.parentFolderId);
          if (parentFolderTree) {
            const folderTree: FolderTree = {
              ...folder,
              children: []
            };
            // children可能为空
            parentFolderTree.children?.push(folderTree);
          }
        }
      });
  return folderTrees;
}

function findFolderTreeById(folderTrees: FolderTree[], parentFolderId: string): FolderTree | undefined {
  for (let i = 0; i < folderTrees.length; i++) {
    const folderTree = folderTrees[i];
    if (folderTree.id === parentFolderId) {
      return folderTree;
    } else if (folderTree.children) {
      const result = findFolderTreeById(folderTree.children, parentFolderId);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

// 导航栏
const folderTreeMenu = ref<FolderTree[]>([])

function initFolderTree() {
  return getFolderTree().then(res => {
    const {data} = res
    data.sort((curr: Folder, next: Folder) => new Date(curr.createTime) > new Date(next.createTime) ? 1 : -1)
    initFolderOption(data)
    folderTreeMenu.value = convertToFolderTree(data)
  })
}

onBeforeMount(async () => {
  await initFolderTree()
})

function handleOpen() {
}

function handleClose() {
}

interface Notebook {
  id: string,
  name: string,
  authorId: string,
  content: string,
  createTime: string,
  updateTime: string,
  folderId: string,
}

let notebookList = reactive<Notebook[]>([])
let notebookListLoading = ref<boolean>(false)
let currFolderId = ref<string>('')
const instance = getCurrentInstance();

function forceUpdate() {
  instance?.proxy?.$forceUpdate();
}

let setTimeoutId: number

function handleChangeFolderId(id: string) {
  if (!id || currFolderId.value === id) {
    return
  }

  // setTimeoutId = setTimeout(() => {
  //
  // })
  if (setTimeoutId) {
    clearTimeout(setTimeoutId)
  }
  setTimeoutId = setTimeout(() => {
    currFolderId.value = id
    notebookListLoading.value = true
    notebookList.splice(0, notebookList.length)
    getNotebookList({folderId: id}).then(res => {
      const {code, message, data} = res
      if ([200, 304].includes(code)) {
        notebookList.push(...data)
      }
    }).finally(() => {
      notebookListLoading.value = false
    })
  }, 500)
}

const dialogVisible = ref<boolean>(false)

function switchDialogVisible() {
  dialogVisible.value = !dialogVisible.value
}

const formComponentList = reactive([
  {
    key: 'parentFolderId',
    componentKey: 'select',
    label: '父级文件夹',
    value: null
  },
  {
    key: 'newFolderName',
    componentKey: 'folderName',
    label: '名称',
    value: null
  },
])

interface SelectOption {
  key: string,
  label: string,
  value: string
}

let folderOption = reactive<SelectOption[]>([])

function initFolderOption(data: Folder[]) {
  folderOption.splice(0, folderOption.length, ...data.map(item => {
    return {
      key: item.id,
      label: item.name,
      value: item.id,
    }
  }))
}

function handleClickFolderAddIcon() {

  switchDialogVisible()
}

function handleSubmitFolderInfo() {
  // verify value
  for (let i = 0; i < formComponentList.length; i++) {
    const item = formComponentList[i]
    if ((item.value === null || item.value === '') && item.key === 'newFolderName') {
      ElMessage.warning(`‘${item.label}’不能为空`)
      return false
    }
  }

  // format params
  const params = Object.assign({}, ...formComponentList.map(item => {
    return {
      [item.key]: item.value
    }
  }))
  postCreateFolder(params).then(res => {
    const {code, message} = res
    if (code) {
      ElMessage.success("提交成功")
      initFolderTree()
    } else {
      ElMessage.info(message)
    }
    switchDialogVisible()
  }).catch(err => {
    ElMessage.error(err.message)
  })
}
</script>

<template>
  <div class="body ">
    <div class="node-box">
      <div class="node-container left">
        <div class="folder-tree-list__box">
          <FolderTreeList :folder-tree="folderTreeMenu" @change-folder-id="handleChangeFolderId"></FolderTreeList>
          <div class="folder-event-box">
            <el-icon>
              <FolderAdd @click="handleClickFolderAddIcon"/>
            </el-icon>
          </div>
        </div>
        <div class="file-list-box" v-loading="notebookListLoading">
          <div class="file-item__box" v-for="item in notebookList" :key="item.id">
            {{ item.name }}
          </div>
          <div v-show="notebookList.length <= 0 && currFolderId !== '' && !notebookListLoading">
            该目录下没有文件
          </div>
        </div>
      </div>
      <div class="node-container right doc-box">
        <div class="title-box">
          <div class="title">
            <el-input v-model="title" placeholder="请输入标题..."></el-input>
          </div>
          <div class="event-gather">
            <el-button type="primary" @click="handleSubmitDoc">提交</el-button>
          </div>
        </div>
        <div id="vditor" class="vditor"></div>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="添加文件夹" width="30%">
      <template #default>
        <el-form
            :label-position="'right'"
            label-width="100px"
            style="max-width: 460px"
        >
          <el-form-item v-for="(item, index) in formComponentList" :key="index" :label="item.label">
            <el-select v-if="item.componentKey === 'select'" v-model="item.value" class="m-2" placeholder="Select"
                       size="large">
              <el-option
                  v-for="item in folderOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-input v-else v-model.trim="item.value"/>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitFolderInfo">提交</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import "src/assets/styles/public.scss";

.node-box {
  //min-width: 1920px;
  display: flex;

  .node-container {
    padding: 10px;
    border-radius: 15px;
    margin: 10px 0;
  }

  .left {
    display: flex;
    margin-right: 10px;

    .el-menu-vertical-demo {
      width: 200px;
      border: none;
    }

    .file-list-box {
      width: 240px;
    }
  }

  .right {
    flex: 1;
  }
;

  .doc-box {
    display: flex;
    flex-direction: column;

    .title-box {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {

      }

      .event-gather {

      }
    }

    .vditor {
      flex: 1;
    }
  }
}

.folder-tree-list__box {
  width: 240px;
  border-right: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .folder-event-box {
    font-size: 24px;
  }
}

</style>
