import { STATE } from '@/api/enum'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: string
  firstName: string
  lastName: string
  displayName: string
  phone: string
  email: string
  role: string
  deliveryId: null
  warehouseId: string | null
  password: string
  rfid: string | null
  token: string | null
  state: STATE
  option: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
