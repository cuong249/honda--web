import React from 'react'
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
import { useDispatch } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { createMaker } from '@/store/reducers/maker'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Maker } from '@/api/types'
import { STATE } from '@/api/enum'

export const AddDialog = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên maker không được để trống !'),
    state: Yup.string().required('Trạng thái không được để trống !'),
    address: Yup.string().required('Địa chỉ không được để trống !'),
    description: Yup.string().required('Mô tả không được để trống !')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState, getValues } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(e: any) {
    dispatch(createMaker(getValues() as Maker))
    handleClose()
    window.location.reload()
  }
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
        &nbsp; Thêm maker
      </Button>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Thêm maker</DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, maxWidth: '90%', width: '200px' },
              width: '500px'
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
            flexDirection='row'
          >
            <TextField
              {...register('name')}
              label='Tên'
              variant='outlined'
              name='name'
              id='name'
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
              defaultValue=''
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
    </>
  )
}
