import request from "../index";
import {Matter as MatterInterface} from "@/util/interface/matter";
import {Result} from '@/util/interface/result'

const matterApi = '/matter'
interface submitMatter {
    name: string
}
interface GetMatterListParams {
    typeId: string
}

export function getMatterList(params: GetMatterListParams): Promise<Result<MatterInterface[]>> {
    return request({
        url: `${matterApi}/`,
        method: 'get',
        params: params
    })
}
export function postCreateMatter(params: submitMatter) {
    return request({
        url: `${matterApi}/postCreateMatter`,
        method: 'post',
        params
    })
}

// export function postUpdateMatter(params: submitMatter) {
//     return request({
//         url: `${matterApi}/postUpdateMatter`,
//         method: 'post',
//         data: params
//     })
// }

export function postDeleteMatter(params: object) {
    return request({
        url: `${matterApi}/postDeleteMatter`,
        method: 'post',
        params
    })
}

export function postShiftDeleteMatter(params: object) {
    return request({
        url: `${matterApi}/postShiftDeleteMatter`,
        method: 'post',
        params
    })
}
