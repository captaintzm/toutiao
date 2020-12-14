/* 
    频道相关请求模块
*/

import request from '@/util/request'

/* 
  获取所欲频道列表
*/
export const getAllChannels = data =>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels'
    })
}

export const addUserChannel = data =>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data
    })
}

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = channelId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/user/channels/${channelId}`
    })
  }
  