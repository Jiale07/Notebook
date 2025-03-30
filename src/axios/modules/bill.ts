import request from "../index";
import {Result} from '@/util/interface/result'
import {BillRecord} from "@/util/interface/billRecord";

const billApiBase = 'billRecord'

function getBillRecordList(): Promise<Result<BillRecord[]>> {
    return request({
        url: `${billApiBase}/getBillRecordList`,
        method: 'post',
    })
}
function updateBillRecord(data: BillRecord): Promise<Result<object>> {
    return request({
        url: `${billApiBase}/updateBillRecord`,
        method: 'post',
        data,
    })
}

function createBillRecord(data: BillRecord): Promise<Result<object>> {
    return request({
        url: `${billApiBase}/createBillRecord`,
        method: 'post',
        data,
    })
}
export {
    getBillRecordList,
    updateBillRecord,
    createBillRecord
}