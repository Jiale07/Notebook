import {defineStore} from 'pinia'
import {store} from '@/store'
import {matterSetType} from "./types";
import {MattersSaveMode} from '@/util/constant/matters'

export const mattersSettingStore = defineStore({
    id: 'matter-setting',
    state: (): matterSetType => ({
        saveMode: MattersSaveMode.LocalStorage // 默认本地长期保存
    }),
    getters: {
        getSaveSetting(): number {
            return this.saveMode
        }
    },
    actions: {
        changeSaveMode(value: number): void {
            // eslint-disable-next-line no-prototype-builtins
            if (this.hasOwnProperty('saveMode')) {
                this.saveMode = value;
            }
        }
    }
})

export function useSettingStoreHook() {
    return mattersSettingStore(store)
}

