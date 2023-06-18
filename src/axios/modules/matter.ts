import request from "../index";
import {ResponseMatter} from "@/util/interface/matter";
import {Result} from '@/util/interface/result'

const matterApi = '/matter'
// interface submitMatter {
//     name: string
// }
interface GetMatterListParams {
    matterTypeId?: string
    isComplete?: number
}
interface FinishMatterParams {
    id: string
}
interface CreateMatterParams {
    name: string,
    content: string,
    typeId?: number,
    priority?: number,
}
interface UpdateMatterParams {
    id: string,
    isComplete?: number,
    name?: string,
    content?: string,
    typeId?: string,
    priority?: number,
}


export function getMatterList(params: GetMatterListParams): Promise<Result<ResponseMatter[]>> {
    return request({
        url: `${matterApi}/`,
        method: 'get',
        params: params
    })
}
export function postCreateMatter(params: CreateMatterParams): Promise<Result<unknown>> {
    return request({
        url: `${matterApi}/postCreateMatter`,
        method: 'post',
        params
    })
}

export function postUpdateMatter(params: UpdateMatterParams): Promise<Result<unknown>> {
    return request({
        url: `${matterApi}/postUpdateMatter`,
        method: 'post',
        data: params
    })
}

export function postDeleteMatter(params: object) {
    return request({
        url: `${matterApi}/postDeleteMatter`,
        method: 'post',
        params
    })
}
export function finishMatter(params: FinishMatterParams): Promise<Result<unknown>> {
    return request({
        url: `${matterApi}/postFinishMatter`,
        method: 'post',
        params,
    })
}

export function postShiftDeleteMatter(params: object) {
    return request({
        url: `${matterApi}/postShiftDeleteMatter`,
        method: 'post',
        params
    })
}
