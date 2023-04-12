interface BaseClass {
  id: string,
  createTime: string,
  updateTime: string,
}

interface MatterType extends BaseClass {
  name: string,
  sortValue: number,
}

export {
  MatterType
}
