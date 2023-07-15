import request from '../index'
import {Result} from "@/util/interface/result";

const notebookApi = '/notebook'
const folderApi = '/folder'
export function getFolderTree() {
  return request({
    url: `${folderApi}/selectFolder`,
    method: 'get',
  })
}


interface Notebook {
  id: string,
  name: string,
  authorId: string,
  content: string,
  createTime: string,
  updateTime: string,
  folderId: string,
}

export function getNotebookList(params: {folderId: string}):Promise<Result<Notebook[]>> {
  return request({
    url: `${notebookApi}/selectNotebookList`,
    method: 'get',
    params,
  })
}

interface Base {
  id: string,
  createTime?: Date,
  updateTime?: Date,
  isDeleted?: number,
}

interface Folder extends Base {
  name: string,
  parentFolderId: string,
  authorId: string,
}

export function postCreateFolder(params: {parentFolderId?: string, newFolderName: string}): Promise<Result<Folder>> {
  return request({
    url: `${folderApi}/createFolder`,
    method: 'post',
    params,
  })
}
