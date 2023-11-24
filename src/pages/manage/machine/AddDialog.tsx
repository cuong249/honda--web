import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  IconButton,
  MenuItem,
  Button,
  Divider
} from '@mui/material'
import { Box } from '@mui/system'
import { AppDispatch } from '@/store'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { STATE, STATE_MAINTAIN, TYPE_MACHINE } from '@/api/enum'
import React from 'react'
import { createMachine } from '@/store/reducers/machine'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Machine } from '@/api/types'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const AddDialog = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được để trống !'),
    type: Yup.string().required('Loại không được để trống !'),
    warehouseId: Yup.string().required('Kho không được để trống !'),
    state: Yup.string().required('Trạng thái không được để trống !'),
    location: Yup.string().required('Vị trí không được để trống !')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState, getValues } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(e: any) {
    dispatch(createMachine(getValues() as Machine))
    handleClose()
    window.location.reload()
  }
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        <AddCircleIcon />
        &nbsp; Thêm máy quét
      </Button>
      <Dialog open={open}>
        <DialogTitle variant='h3'>
          {'Thêm máy quét'}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              left: '60%'
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        </DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box component='form' noValidate autoComplete='off' flexDirection='row' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('name')}
              label='Tên'
              variant='outlined'
              name='name'
              helperText={errors.name?.message?.toString()}
              error={errors.name && true}
              sx={{
                m: 5,
                width: '25ch'
              }}
            />
            <TextField
              {...register('type')}
              select
              label='Loại'
              variant='outlined'
              name='type'
              defaultValue={''}
              helperText={errors.type?.message?.toString()}
              error={errors.type && true}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              <MenuItem key={TYPE_MACHINE.MOVING} value={TYPE_MACHINE.MOVING}>
                Di động
              </MenuItem>
              <MenuItem key={TYPE_MACHINE.FIXED} value={TYPE_MACHINE.FIXED}>
                Cố định
              </MenuItem>
            </TextField>
            <TextField
              {...register('warehouseId')}
              select
              label='Kho'
              name='warehouseId'
              variant='outlined'
              defaultValue=''
              helperText={errors.warehouseId?.message?.toString()}
              error={errors.warehouseId && true}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              {warehouses
                .filter((warehouses: any) => warehouses.state == STATE.ACTIVE)
                .map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                    {items.name}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              {...register('state')}
              label='Trạng thái'
              select
              variant='outlined'
              name='state'
              defaultValue=''
              helperText={errors.state?.message?.toString()}
              error={errors.state && true}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              <MenuItem key={STATE_MAINTAIN.ACTIVE} value={STATE_MAINTAIN.ACTIVE}>
                Đang hoạt động
              </MenuItem>
              <MenuItem key={STATE_MAINTAIN.INACTIVE} value={STATE_MAINTAIN.INACTIVE}>
                Không hoạt động
              </MenuItem>
              <MenuItem key={STATE_MAINTAIN.MAINTAIN} value={STATE_MAINTAIN.MAINTAIN}>
                Bảo trì
              </MenuItem>
            </TextField>
            <TextField
              {...register('location')}
              label='Vị trí'
              variant='outlined'
              name='location'
              defaultValue=''
              multiline
              helperText={errors.location?.message?.toString()}
              error={errors.location && true}
              rows={3}
              sx={{
                m: 5,
                width: '90%'
              }}
            />
            <DialogActions>
              <Button variant='outlined' color='error' onClick={handleClose}>
                Đóng
              </Button>
              <Button variant='outlined' color='success' type='submit'>
                Xác nhận
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
