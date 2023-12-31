import {
  ROLE,
  STATE,
  STATE_MAINTAIN,
  TYPE_MACHINE,
  TYPE_WAREHOUSE,
  STATUS_TRANSFER,
  STATUS_TRANSFERDETAIL,
  IMPORT_SCAN,
  STATE_MAINTENANCE
} from '@/api/enum'

type Account = {
  id: string
  firstName: string
  lastName: string
  displayName: string
  birthday: Date
  phone: string
  email: string
  role: ROLE
  deliveryId: string | null
  warehouseId: string | null
  password: string
  rfid: string | null
  token: string | null
  state: STATE
  option: string | null
  createdAt: number
  updatedAt: number
}

type Category = {
  id: string
  parentId: string | null
  name: string
  color: string
  description: string
  state: STATE
  option: string | null
  createdAt: number
  updatedAt: number
}

type Delivery = {
  id: string
  name: string
  option: string | null
  state: STATE
  createdAt: number
  updatedAt: number
}

type Machine = {
  id: string
  name: string
  type: TYPE_MACHINE
  warehouseId: string
  state: STATE_MAINTAIN
  option: string | null
  createdAt: number
  updatedAt: number
}

type Permission = {
  id: string
  name: string
  description: string
  option: string | null
  state: STATE
  createdAt: number
  updatedAt: number
}

type Maintenance = {
  id: string
  startDate: number
  finishDate: number
  description: string
  state: STATE_MAINTENANCE
  createdAt: number
  updatedAt: number
}

type Product = {
  id: string
  name: string
  rfid: string
  qrcode: string
  numberCode: string
  category: Category
  categoryId: string
  storageWarehouseId: string
  deliveryWarehouseId: string
  currentWarehouseId: string
  storageWarehouse: Warehouse
  deliveryWarehouse: Warehouse
  currentWarehouse: Warehouse
  maintenance: Maintenance
  maintainNext: number

  //property to maintain
  descriptionMaintenance: string
  nextDate: number

  state: STATE_MAINTAIN
  option: string | null
  createdAt: number
  updatedAt: number
}

type Role = {
  id: string
  name: string
  description: string
  option: string | null
  state: STATE
  listPermission: Permission[]
  createdAt: number
  updatedAt: number
}

type TransferDetail = {
  id: string
  productId: string
  categoryId: string
  transferId: string
  description: string
  status: STATUS_TRANSFERDETAIL
  state: STATE
  option: string | null
  createdAt: number
  updatedAt: number
}

type Scan = {
  id: string
  productId: string
  transferId: string
  machineId: string
  import: IMPORT_SCAN
  state: STATE
  option: string | null
  createdAt: number
  updatedAt: number
}

type transferProduct = {
  id: string
  scanId: string | null
  productId: string | null
  categoryId: string | null
  description: string
  status: STATUS_TRANSFERDETAIL
  state: STATE
  option: string
  machineId: string | null
  import: IMPORT_SCAN
}

type Takeout = {
  id: string
  title: string | null
  deliveryId: string | null
  fromWarehouseId: string
  fromWarehouse: Warehouse
  toWarehouseId: string
  toWarehouse: Warehouse
  machineId: string | null
  machine: Machine
  transferDate: string
  status: STATUS_TRANSFER
  state: STATE
  listProduct: transferProduct[]
  option: string | null
  createdAt: number
  updatedAt: number
}

type Warehouse = {
  id: string
  name: string
  address: string
  type: TYPE_WAREHOUSE
  description: string
  state: STATE
  option: string
  createdAt: number
  updatedAt: number
}

type Maker = {
  id: string
  name: string
  address: string
  type: TYPE_WAREHOUSE
  description: string
  state: STATE
  option: string
  createdAt: number
  updatedAt: number
}

interface getParams {
  query?: string
  id: string
}
interface getListParams {
  limit?: number
  offset?: number
  order?: string
  search?: string
  arrange?: string
  query?: string
}

interface maintainProductParams {
  id?: string
  description?: string
}
interface completeMaintainProductParams {
  id?: string
  nextDate?: number
}
export type {
  Account,
  Category,
  Delivery,
  Machine,
  Maintenance,
  Product,
  Role,
  Takeout,
  Warehouse,
  Maker,
  getListParams,
  getParams,
  maintainProductParams,
  completeMaintainProductParams
}
