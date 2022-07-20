import { getToken } from '@/utils/myAuth'

export default {
  data() {
    return {
      paginationParams: {
        start: 1,
        limit: 10,
        totalPage: 0,
        pageSizes: [10, 20, 30, 40]
      },
      uploadFileOss: '/lejuAdmin/material/uploadFileOss'
    }
  },
  computed: {
    token() {
      return {
        token: getToken()
      }
    }
  }
}
