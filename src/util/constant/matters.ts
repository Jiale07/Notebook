const MatterSettingInfoSaveKey = 'matter-setting-info'
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

const MatterSortValue = {
    First: 1,
    Second: 2,
    Third: 3,
    Fourth: 4,
    Fifth: 5,
}

const MatterSortValueList = [
    {
        key: 'first',
        label: '最高',
        value: MatterSortValue.First
    },
    {
        key: 'second',
        label: '高',
        value: MatterSortValue.Second
    },
    {
        key: 'third',
        label: '中',
        value: MatterSortValue.Third
    },
    {
        key: 'fourth',
        label: '低',
        value: MatterSortValue.Fourth
    },
    {
        key: 'fifth',
        label: '最低',
        value: MatterSortValue.Fifth
    }
]

export {
    MatterSettingInfoSaveKey,
    MattersSaveKey,
    MatterSettingInfoKeys,
    MattersSaveMode,
    MattersSaveModeName,
    MatterSaveModeKey,

    // MatterTypeList,
    MatterSortValueList,
    MatterSortValue
}
