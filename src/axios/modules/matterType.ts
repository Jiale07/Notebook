import request from "../index";
import {Result} from "@/util/interface/result";
import {MatterType as MatterTypeInterface} from "@/util/interface/matter";

const matterTypeApi = '/matterType'

export function getMatterTypeList(): Promise<Result<MatterTypeInterface[]>> {
  return request({
    url: `${matterTypeApi}/`,
    method: 'get',
  })
}
