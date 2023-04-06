import request from "../index";

const userApi = '/user'

interface LoginFrom {
    phone: string,
    password: string,
}
function login(data: LoginFrom) {
    return request ({
        url: `${userApi}/login`,
        method: 'post',
        data
    })
}

export {
    login,
}
