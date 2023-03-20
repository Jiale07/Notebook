const MatterSettingInfoSaveKey = 'matter-setting-info'
import {MatterType} from '@/util/interface/matter'
const MattersSaveKey = 'matters'

const MatterSettingInfoKeys = {
    MatterSaveMode: 'MatterSaveMode'
}
const MattersSaveMode = {
    SessionStorage: 1,
    LocalStorage: 2,
    BackendStorage: 3
}

const MattersSaveModeName = {
    [MattersSaveMode.SessionStorage]: '本地临时保存',
    [MattersSaveMode.LocalStorage]: '本地长期保存',
    [MattersSaveMode.BackendStorage]: '云端临时保存',
}

const MatterSaveModeKey = {
    [MattersSaveMode.SessionStorage]: 'sessionStorage',
    [MattersSaveMode.LocalStorage]: 'localStorage',
    [MattersSaveMode.BackendStorage]: 'BackendStorage',
}

const SortValue = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
}

// 事项类型临时性使用常量的形式进行配置。
const MatterTypeList: Array<MatterType> = [
    {
        id: '10001',
        name: '重要且紧急',
        sortValue: SortValue.First,
        createTime: '1679277514036',
        updateTime: '1679277514036',
        isDeleted: 0
    },
    {
        id: '10002',
        name: '重要不紧急',
        sortValue: SortValue.Second,
        createTime: '1679277514036',
        updateTime: '1679277514036',
        isDeleted: 0
    },
    {
        id: '10003',
        name: '不重要但紧急',
        sortValue: SortValue.Third,
        createTime: '1679277514036',
        updateTime: '1679277514036',
        isDeleted: 0
    },
    {
        id: '10004',
        name: '不重要不紧急',
        sortValue: SortValue.Fourth,
        createTime: '1679277514036',
        updateTime: '1679277514036',
        isDeleted: 0
    },
    {
        id: '10005',
        name: '未分类',
        sortValue: SortValue.Fourth,
        createTime: '1679277514036',
        updateTime: '1679277514036',
        isDeleted: 0
    }
].filter(item => item.isDeleted === 0)

const MatterSortValueList = [
    {
        key: 'first',
        label: '最高',
        value: SortValue.First
    },
    {
        key: 'second',
        label: '高',
        value: SortValue.Second
    },
    {
        key: 'third',
        label: '中',
        value: SortValue.Third
    },
    {
        key: 'fourth',
        label: '低',
        value: SortValue.Fourth
    },
    {
        key: 'fifth',
        label: '最低',
        value: SortValue.Fifth
    }
]

export {
    MatterSettingInfoSaveKey,
    MattersSaveKey,
    MatterSettingInfoKeys,
    MattersSaveMode,
    MattersSaveModeName,
    MatterSaveModeKey,

    MatterTypeList,
    MatterSortValueList,
}
