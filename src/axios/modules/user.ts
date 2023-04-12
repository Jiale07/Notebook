import request from "../index";
import {Result} from '@/util/interface/result'

const userApi = '/user'

interface LoginFrom {
    phone: string,
    password: string,
}
interface UserInfo {
    name: string
}
function login(data: LoginFrom): Promise<Result<UserInfo>> {
    return request ({
        url: `${userApi}/login`,
        method: 'post',
        data
    })
}

export {
    login,
}
