import {Matter as MatterInterface} from '@/util/interface/matter'
class Matter implements MatterInterface{
  content: string;
  createTime: string;
  id: string;
  isComplete: number;
  name: string;
  priority: number;
  typeId: string;
  updateTime: string;

  constructor(id: string, name: string, isComplete: number, priority: number, typeId: string, updateTime: string, createTime: string, content: string,) {
    this.id = id
    this.name = name
    this.content = content
    this.createTime = createTime
    this.isComplete = isComplete
    this.priority = priority
    this.typeId = typeId
    this.updateTime = updateTime
  }
}

export {
  Matter,
}
