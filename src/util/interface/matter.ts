interface BaseClass {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted?: number;
}
interface Matter extends BaseClass {
    name: string;
    content: string;
    typeId?: string,
    priority?: number,
    isComplete: number;
}

interface ResponseMatter extends BaseClass {
    name: string;
    content: string;
    typeId?: string,
    priority: number,
    isComplete: number;
}

interface MatterType extends BaseClass {
    name: string;
    sortValue: number;
}

interface MatterTypeGrade extends BaseClass {
    value: number
}

// const SortValue = {
//     First: 1,
//     Second: 2,
//     Third: 3,
//     Fourth: 4,
//     Fifth: 5,
// }

interface MatterFrom {
    name: string,
    content: string,
}

export {
    Matter,
    MatterType,
    MatterTypeGrade,
    ResponseMatter,

    MatterFrom,
}
