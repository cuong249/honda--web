import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateWarehouse } from '@/store/reducers/warehouse'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { STATE } from '@/api/enum'
import { useForm } from 'react-hook-form'
import { Warehouse } from '@/api/types'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const EditDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).find((item: any) => item.id == props.id)
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên kho không được để trống !'),
    state: Yup.string().required('Trạng thái không được để trống !'),
    address: Yup.string().required('Địa chỉ không được để trống !'),
    description: Yup.string().required('Mô tả không được để trống !')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState, getValues } = useForm(formOptions)
  const { errors } = formState
  const dispatch = useDispatch<AppDispatch>()
  function onSubmit(e: any) {
    dispatch(updateWarehouse({ id: props.id, warehouse: getValues() as Warehouse }))
    handleClose()
    window.location.reload()
  }

  const handleClose = () => {
    props.show(false)
  }

  return (
    <Dialog open={true}>
      <DialogTitle variant='h3'>Chỉnh sửa kho</DialogTitle>
      <Divider variant='middle' />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 5, width: '25ch' }
          }}
          noValidate
          autoComplete='off'
          flexDirection='row'
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register('name')}
            label='Tên'
            variant='outlined'
            name='name'
            id='name'
            defaultValue={warehouses?.name}
            style={{ width: '200' }}
            error={errors.name && true}
            helperText={errors.name?.message?.toString()}
          />
          <TextField
            {...register('state')}
            label='Trạng thái'
            select
            variant='outlined'
            name='state'
            defaultValue={warehouses?.state}
            error={errors.state && true}
            helperText={errors.state?.message?.toString()}
          >
            <MenuItem key={STATE.ACTIVE} value={STATE.ACTIVE}>
              Đang hoạt động
            </MenuItem>
            <MenuItem key={STATE.INACTIVE} value={STATE.INACTIVE}>
              Không hoạt động
            </MenuItem>
          </TextField>
          <TextField
            {...register('description')}
            label='Mô tả'
            variant='outlined'
            name='description'
            multiline
            rows={3}
            defaultValue={warehouses?.description}
            error={errors.description && true}
            helperText={errors.description?.message?.toString()}
          />
          <TextField
            {...register('address')}
            label='Địa chỉ'
            variant='outlined'
            name='address'
            multiline
            rows={3}
            fullWidth={true}
            defaultValue={warehouses?.address}
            error={errors.address && true}
            helperText={errors.address?.message?.toString()}
          />
          <DialogActions>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
            <Button variant='outlined' onClick={handleClose} color='error'>
              Đóng
            </Button>
            <Button variant='outlined' type='submit' color='success'>
              Xác nhận
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
