
interface Storage {
    setItem(key: string, content: string): void
    getItem(key: string): string
}
class SessionStorage implements Storage{
    setItem (key: string, content: string): void {
        sessionStorage.setItem(key, content)
    }
    getItem (key: string): string {
        return sessionStorage.getItem(key) || ''
    }
    constructor() {
    }
}

class LocalStorage implements Storage {
    setItem(key: string, content: string) {
        localStorage.setItem(key, content)
    }
    getItem (key: string): string {
        return localStorage.getItem(key) || ''
    }
    constructor() {
    }
}

export {
    SessionStorage,
    LocalStorage
}
