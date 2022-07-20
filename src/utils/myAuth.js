const LEJU_ADMIN_TOKEN = 'leju-admin-token-2112'
const LEJU_ADMIN_USERINFO = 'leju-admin-userinfo-2112'
export function setToken(token) {
  window.localStorage.setItem(LEJU_ADMIN_TOKEN, token)
}

export function getToken() {
  const token = window.localStorage.getItem(LEJU_ADMIN_TOKEN)
  if (token) {
    return token
  } else {
    return null
  }
}

export function reomveToken() {
  window.localStorage.removeItem(LEJU_ADMIN_TOKEN)
}

export function setUserInfo(userInfo) {
  try {
    window.localStorage.setItem(LEJU_ADMIN_USERINFO, JSON.stringify(userInfo))
  } catch (error) {
    console.log(error)
  }
}

export function getUserInfo() {
  const userInfo = window.localStorage.getItem(LEJU_ADMIN_USERINFO)
  if (userInfo) {
    try {
      return JSON.parse(userInfo)
    } catch (error) {
      console.log(error)
    }
  } else {
    return null
  }
}

export function removeUserInfo() {
  window.localStorage.removeItem(LEJU_ADMIN_USERINFO)
}
