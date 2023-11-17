import CustomTextField from '@/@core/components/mui/text-field'
import { STATE_MAINTAIN } from '@/api/enum'
import { Product } from '@/api/types'
import { AppDispatch, RootState } from '@/store'
import { getAllCategory } from '@/store/reducers/category'
import { getAllWarehouse } from '@/store/reducers/warehouse'
import DialogCustomized from '@/views/components/dialogs/DialogCustomized'
import { Grid, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  handleClose: () => void
  handleConfirm: () => Promise<boolean>
  product: Product | undefined
  setProduct: any
}

export default function DialogUpdate({ open, handleClose, handleConfirm, product, setProduct }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const category = useSelector((state: RootState) => state.category)
  const warehouse = useSelector((state: RootState) => state.warehouse)
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllWarehouse())
  }, [dispatch])

  return (
    <DialogCustomized
      open={open}
      handleClose={handleClose}
      handleConfirm={async () => {
        setSubmitted(await handleConfirm())
      }}
      title='Chỉnh sửa thông tin XCD'
    >
      <Grid container spacing={6} justifyContent='center'>
        <Grid item xs={5}>
          <CustomTextField
            label='Tên'
            value={product?.name ? product?.name : ''}
            error={submitted && !product?.name}
            helperText={submitted && !product?.name ? 'Trường này là bắt buộc' : ' '}
            id='name'
            onChange={e => {
              setProduct({
                ...product,
                [e.target.id]: e.target.value
              })
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Mã máy'
            value={product?.numberCode ? product?.numberCode : ''}
            error={submitted && !product?.numberCode}
            helperText={submitted && !product?.numberCode ? 'Trường này là bắt buộc' : ' '}
            id='numberCode'
            onChange={e => {
              setProduct({
                ...product,
                [e.target.id]: e.target.value
              })
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            select
            label='Loại'
            id='category'
            error={submitted && !product?.category}
            helperText={submitted && !product?.category ? 'Trường này là bắt buộc' : ' '}
            value={product?.category ? product?.category.name : ''}
            onChange={e => {
              const categoryName = e.target.value
              const newCategory = category.categories.find(category => category.name == categoryName)
              setProduct({
                ...product,
                category: newCategory,
                categoryId: newCategory?.id
              })
            }}
          >
            {category.categories.map(category => {
              return (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            select
            label='Kho hiện tại'
            value={product?.currentWarehouse ? product?.currentWarehouse.name : ''}
            error={submitted && !product?.currentWarehouse}
            helperText={submitted && !product?.currentWarehouse ? 'Trường này là bắt buộc' : ' '}
            id='currentWarehouse'
            onChange={e => {
              const warehouseName = e.target.value
              const newWarehouse = warehouse.warehouses.find(warehouse => warehouse.name == warehouseName)
              setProduct({
                ...product,
                currentWarehouse: newWarehouse,
                currentWarehouseId: newWarehouse?.id
              })
            }}
          >
            {warehouse.warehouses.map(warehouse => {
              return (
                <MenuItem key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            select
            label='Kho sử dụng'
            value={product?.deliveryWarehouse ? product?.deliveryWarehouse.name : ''}
            error={submitted && !product?.deliveryWarehouse}
            helperText={submitted && !product?.deliveryWarehouse ? 'Trường này là bắt buộc' : ' '}
            id='deliveryWarehouse'
            onChange={e => {
              const warehouseName = e.target.value
              const newWarehouse = warehouse.warehouses.find(warehouse => warehouse.name == warehouseName)
              setProduct({
                ...product,
                deliveryWarehouse: newWarehouse,
                deliveryWarehouseId: newWarehouse?.id
              })
            }}
          >
            {warehouse.warehouses.map(warehouse => {
              return (
                <MenuItem key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            select
            label='Kho lưu trữ'
            value={product?.storageWarehouse ? product?.storageWarehouse.name : ''}
            error={submitted && !product?.storageWarehouse}
            helperText={submitted && !product?.storageWarehouse ? 'Trường này là bắt buộc' : ' '}
            id='storageWarehouse'
            onChange={e => {
              const warehouseName = e.target.value
              const newWarehouse = warehouse.warehouses.find(warehouse => warehouse.name == warehouseName)
              setProduct({
                ...product,
                storageWarehouse: newWarehouse,
                storageWarehouseId: newWarehouse?.id
              })
            }}
          >
            {warehouse.warehouses.map(warehouse => {
              return (
                <MenuItem key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='QRcode'
            value={product?.qrcode ? product?.qrcode : ''}
            error={submitted && !product?.qrcode}
            helperText={submitted && !product?.qrcode ? 'Trường này là bắt buộc' : ' '}
            id='qrcode'
            onChange={e => {
              setProduct({
                ...product,
                [e.target.id]: e.target.value
              })
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            select
            label='Trạng thái'
            value={product?.state ? product?.state : ''}
            error={submitted && !product?.state}
            helperText={submitted && !product?.state ? 'Trường này là bắt buộc' : ' '}
            id='state'
            onChange={e => {
              setProduct({
                ...product,
                state: e.target.value
              })
            }}
          >
            <MenuItem value={STATE_MAINTAIN.ACTIVE}>Đang hoạt động</MenuItem>
            <MenuItem value={STATE_MAINTAIN.INACTIVE}>Không hoạt động</MenuItem>
            <MenuItem value={STATE_MAINTAIN.MAINTAIN}>Đang bảo trì</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </DialogCustomized>
  )
}
