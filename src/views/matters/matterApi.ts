import {LocalStorage} from '@/util/storageTool'
import {MattersSaveKey} from "@/util/constant/matters";
import {simpleUUID} from '@/util/uuid'
import {Matter, MatterFrom} from '@/util/interface/matter'

function setMatter(newMatterObj: MatterFrom) {
    return new Promise((resolve) => {
        const localStorage = new LocalStorage();
        const nowTime = new Date().getTime().toString()
        const srcMatterList = JSON.parse(localStorage.getItem(MattersSaveKey) || "[]")
        const newMatter: Matter = {
            ...newMatterObj,
            id: simpleUUID(),
            isComplete: 0,
            createTime: nowTime,
            updateTime: nowTime,
            isDeleted: 0,
        }
        updateMatterList([newMatter].concat(srcMatterList))
        resolve('success')
    })
}

function updateMatterList(newMatterList: Array<Matter>) {
    localStorage.setItem(MattersSaveKey, JSON.stringify(newMatterList))
}

function getMatter(): Array<Matter> {
    const localStorage = new LocalStorage()
    return JSON.parse(localStorage.getItem(MattersSaveKey) || '[]')
}

function deleteMatter(id: string) {
    return new Promise((resolve, reject) => {
        const matterList: Array<Matter> = getMatter()
        if (matterList.length <= 0) {
            reject({message: '请刷新页面'});
        }
        let deleteIndex = -1
        const currMatter = matterList.find((item, index) => {
            if (item.id === id) {
                deleteIndex = index
                return item
            }
        })
        if (deleteIndex > -1 && currMatter) {
            currMatter.isDeleted = 1
            updateMatterList(matterList)
            resolve('success')
        } else {
            reject({message: '没有找到对应的事项，请刷新页面'})
        }
    })
}

function updateMatter(matter: Matter) {
    return new Promise((resolve, reject) => {
        const {id} = matter
        if (id === undefined || id === '' || id === null) {
            reject({message: '请刷新页面'})
        }
        const matterList: Array<Matter> = getMatter()
        if (matterList.length <= 0) {
            reject({message: '请刷新页面'})
        }
        let updateMatterIndex = -1
        matterList.find((item, index) => {
            if (item.id === id) {
                updateMatterIndex = index
            }
        })
        if (updateMatterIndex === -1) {
            reject({message: '没有找到对应的事项，请刷新页面'})
        }
        matterList.splice(updateMatterIndex, 1, matter)
        console.log('matterList', matterList)
        updateMatterList(matterList)
        resolve('success')
    })
}

export {
    setMatter, // 新增
    getMatter, // 获取所有
    deleteMatter,
    updateMatter,
}
