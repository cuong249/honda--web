import CustomTextField from '@/@core/components/mui/text-field'
import { STATE, STATE_MAINTAIN } from '@/api/enum'
import { Product } from '@/api/types'
import { AppDispatch, RootState } from '@/store'
import { getListCategory } from '@/store/reducers/category'
import { getListWarehouse } from '@/store/reducers/warehouse'
import { getListMaker } from '@/store/reducers/maker'
import DialogCustomized from '@/views/components/dialogs/DialogCustomized'
import { FormControl, Grid, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  handleClose: () => void
  handleConfirm: () => Promise<boolean>
  takeout: Takeout | undefined
  setTakeout: any
}

export default function DialogCreate({ open, handleClose, handleConfirm, takeout, setTakeout }: Props) {
  // const { user } = useAuth()
  const query = JSON.stringify({
    state: STATE.ACTIVE
  })
  const dispatch = useDispatch<AppDispatch>()
  const category = useSelector((state: RootState) => state.category)
  const warehouse = useSelector((state: RootState) => state.warehouse)
  const maker = useSelector((state: RootState) => state.maker)
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getListCategory())
    dispatch(getListWarehouse({ query: query }))
    dispatch(getListMaker({ query: query }))
  }, [dispatch, query])

  return (
    <DialogCustomized
      open={open}
      handleClose={handleClose}
      handleConfirm={async () => {
        setSubmitted(await handleConfirm())
      }}
      title='Thêm XCD'
    >
      <FormControl onSubmit={handleConfirm}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={5} alignItems={'center'}>
            <CustomTextField
              label='Tên'
              fullWidth
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
              fullWidth
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
              fullWidth
              label='Loại'
              id='category'
              value={product?.category ? product?.category.name : ''}
              error={submitted && !product?.category}
              helperText={submitted && !product?.category ? 'Trường này là bắt buộc' : ' '}
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
              fullWidth
              label='Kho hiện tại'
              value={product?.currentWarehouse ? product?.currentWarehouse.id : ''}
              error={submitted && !product?.currentWarehouse}
              helperText={submitted && !product?.currentWarehouse ? 'Trường này là bắt buộc' : ' '}
              id='currentWarehouse'
              onChange={e => {
                const idFound = e.target.value
                const newWarehouse = warehouse.warehouses.find(warehouse => warehouse.id == idFound)

                if (newWarehouse) {
                  setProduct({
                    ...product,
                    currentWarehouse: newWarehouse,
                    currentWarehouseId: newWarehouse?.id
                  })

                  return
                }
                const newMaker = maker.makers.find(maker => maker.id == idFound)

                if (newMaker) {
                  setProduct({
                    ...product,
                    currentWarehouse: newMaker,
                    currentWarehouseId: newMaker?.id
                  })

                  return
                }
              }}
            >
              {warehouse.warehouses.map(warehouse => {
                return (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                )
              })}
              {maker.makers.map(maker => {
                return (
                  <MenuItem key={maker.id} value={maker.id}>
                    {maker.name}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </Grid>
          <Grid item xs={5}>
            <CustomTextField
              select
              fullWidth
              label='Kho sử dụng'
              value={product?.deliveryWarehouse ? product?.deliveryWarehouse.id : ''}
              error={submitted && !product?.deliveryWarehouse}
              helperText={submitted && !product?.deliveryWarehouse ? 'Trường này là bắt buộc' : ' '}
              id='deliveryWarehouse'
              onChange={e => {
                const idFound = e.target.value
                const newMaker = maker.makers.find(maker => maker.id == idFound)

                setProduct({
                  ...product,
                  deliveryWarehouse: newMaker,
                  deliveryWarehouseId: newMaker?.id
                })
              }}
            >
              {maker.makers.map(maker => {
                return (
                  <MenuItem key={maker.id} value={maker.id}>
                    {maker.name}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </Grid>
          <Grid item xs={5}>
            <CustomTextField
              select
              fullWidth
              label='Kho lưu trữ'
              value={product?.storageWarehouse ? product?.storageWarehouse.id : ''}
              error={submitted && !product?.storageWarehouse}
              helperText={submitted && !product?.storageWarehouse ? 'Trường này là bắt buộc' : ' '}
              id='storageWarehouse'
              onChange={e => {
                const idFound = e.target.value
                const newWarehouse = warehouse.warehouses.find(warehouse => warehouse.id == idFound)
                setProduct({
                  ...product,
                  storageWarehouse: newWarehouse,
                  storageWarehouseId: newWarehouse?.id
                })
              }}
            >
              {warehouse.warehouses.map(warehouse => {
                return (
                  <MenuItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </Grid>

          <Grid item xs={5}>
            <CustomTextField
              label='RFID'
              fullWidth
              value={product?.rfid ? product?.rfid : ''}
              error={submitted && !product?.rfid}
              helperText={submitted && !product?.rfid ? 'Trường này là bắt buộc' : ' '}
              id='rfid'
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
              fullWidth
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
            </CustomTextField>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </FormControl>
    </DialogCustomized>
  )
}
