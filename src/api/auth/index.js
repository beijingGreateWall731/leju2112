import request from '@/api/request'

export function findAllPermissions() {
  return request({
    
    url: '/admin/sysAuth/permission/findAllPermissions'

  })
}

