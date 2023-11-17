// ** Type import
import { VerticalNavItemsType } from '@/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'material-symbols:dashboard-outline'
    },
    {
      title: 'Quản lý',
      icon: 'eos-icons:file-system-outlined',
      children: [
        {
          title: 'Takeout',
          icon: 'solar:bill-list-linear',
          path: '/manage/takeout'
        },
        {
          title: 'Máy quét',
          icon: 'material-symbols:scanner',
          path: '/manage/machine'
        },
        {
          title: 'Xe chuyên dụng',
          icon: 'tabler:trolley',
          path: '/manage/product'
        },
        {
          title: 'Kho',
          icon: 'ic:outline-warehouse',
          path: '/manage/warehouse'
        },
        {
          title: 'Maker',
          icon: 'material-symbols:factory-outline',
          path: '/manage/maker'
        },
        {
          title: 'Lịch sử',
          icon: 'material-symbols:history',
          path: '/manage/history'
        }
      ]
    },
    {
      title: 'Hệ thống',
      icon: 'fluent-mdl2:file-system',
      children: [
        {
          title: 'Loại xe',
          icon: 'carbon:category',
          path: '/system/category'
        },
        {
          title: 'Tài khoản',
          icon: 'mdi:account-outline',
          path: '/system/account'
        },
        {
          title: 'Phân quyền',
          icon: 'ic:baseline-category',
          path: '/system/role'
        },
        {
          title: 'Cài đặt',
          icon: 'uiw:setting-o',
          path: '/system/setting'
        }
      ]
    }
  ]
}

export default navigation
