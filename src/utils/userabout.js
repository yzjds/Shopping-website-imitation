// 这个文件是和用户相关的一些工具函数
// 专门用来生成用户的临时标识的
// 一般用户的临时标识都是唯一的，而且一旦生成不轻易改变

import { v4 as uuidv4 } from 'uuid';

export function getUserTempId() {
    // 先从loaclStorage中去获取用户的临时标识
    // 如果取到了，直接返回使用
    let userTempId = localStorage.getItem('USERTEMPID_KEY');
    // 如果没有获取到，再通过uuid重新创建，并且存储到localStorage中
    if(!userTempId){
        userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        localStorage.setItem('USERTEMPID_KEY',userTempId)
    };
    return userTempId;
}
