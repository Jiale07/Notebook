import {defineStore} from 'pinia'
import {store} from '@/store'
import {folderSetType} from "./types";

export const FolderSettingStore = defineStore({
  id: 'folder-setting',
  state: (): folderSetType => ({
    currFolderId: '',
  }),
  getters: {
    getCurrFolderId(): string {
      return this.currFolderId
    }
  },
  actions: {
    changeSaveMode(value: string): void {
      this.currFolderId = value;
      // if (this.hasOwnProperty('currFolderId')) {
      //   this.currFolderId = value;
      // }
    }
  }
})

export function useSettingStoreHook() {
  return FolderSettingStore(store)
}

