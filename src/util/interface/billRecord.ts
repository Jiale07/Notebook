interface BillRecord {
    id: bigint,
    name: string,
    description?: string,
    direction_id: bigint,
    recipient?: string,
    statusId?: bigint;
    paymentTime?: string,
    amount: string, // 字符串类型存储高精度的金钱数据类型
    typeId?: bigint,
    currencyId?: bigint,
    authorId: bigint,
    createTime: string,
    updateTime: string,
}

enum DirectionIdEnum {
    Income = 0,
    expenses= 1
}

export {
    BillRecord,
    DirectionIdEnum
}