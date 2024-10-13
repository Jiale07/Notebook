function isEmpty(data: any) {
    return [undefined, 'undefined', null, 'null', ''].includes(data);
}

export {
    isEmpty
}