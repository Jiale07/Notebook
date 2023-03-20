function simpleUUID(): string {
    return Date.now().toString(36)
}

export {
    simpleUUID
}
