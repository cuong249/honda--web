import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  IconButton,
  MenuItem,
  Button,
  Divider,
  InputAdornment,
  Select
} from '@mui/material'
import { Box } from '@mui/system'
import { AppDispatch } from '@/store'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { createAccount } from '@/store/reducers/account'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ROLE, STATE } from '@/api/enum'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Account } from '@/api/types'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const AddDialog = () => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const maker = useSelector((store: any) => store.maker.makers)
  const concat = warehouses.concat(maker)
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Tên không được để trống !'),
    lastName: Yup.string().required('Họ và tên đệm không được để trống !'),
    birthday: Yup.string().required('Ngày sinh không được để trống !'),
    phone: Yup.string()
      .required('Số điện thoại không được để trống !')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại chưa đúng định dạng')
      .max(10, 'Số điện thoại chưa đúng định dạng'),
    email: Yup.string().lowercase().required('Email không được để trống !').email('Email không đúng định dạng'),
    state: Yup.string().required('Trạng thái không được để trống !'),
    warehouseId: Yup.string().required('Nhà kho không được để trống !'),
    role: Yup.string().required('Vai trò không được để trống !'),
    password: Yup.string().required('Mật khẩu không được để trống')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState, getValues, setValue } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(e: any) {
    dispatch(createAccount(getValues() as Account))

    window.location.reload()
  }
  const [eye, setEye] = React.useState<boolean>(false)
  const [role, setRole] = React.useState<ROLE.MAKER | ROLE.WAREHOUSE>()
  const dispatch = useDispatch<AppDispatch>()

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }
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
        &nbsp; Thêm nhà kho
      </Button>
      <Dialog open={open} maxWidth={'md'} fullWidth>
        <DialogTitle variant='h3'>Thêm tài khoản</DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, width: '25ch' },
              p: 2
            }}
            autoComplete='off'
            flexDirection='column'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...register('lastName')}
              name='lastName'
              type='text'
              id='lastName'
              label='Họ và tên đệm'
              variant='outlined'
              error={errors.lastName && true}
              helperText={errors.lastName?.message?.toString()}
            />
            <TextField
              {...register('firstName')}
              name='firstName'
              type='text'
              id='firstName'
              label='Tên'
              variant='outlined'
              error={errors.firstName && true}
              helperText={errors.firstName?.message?.toString()}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...register('birthday')}
                label='Ngày sinh'
                onChange={(newValue: any) => setValue('birthday', new Date(newValue).getTime())}
                format='DD/MM/YYYY'
                slotProps={{
                  textField: {
                    name: 'birthday',
                    id: 'birthday',
                    error: errors.birthday && true,
                    helperText: errors.birthday?.message?.toString()
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              {...register('phone')}
              name='phone'
              type='text'
              id='phone'
              label='Số điện thoại'
              variant='outlined'
              error={errors.phone && true}
              helperText={errors.phone?.message?.toString()}
            />
            <TextField
              {...register('email')}
              name='email'
              id='email'
              type='text'
              label='Email'
              variant='outlined'
              error={errors.email && true}
              helperText={errors.email?.message?.toString()}
            />
            <TextField
              {...register('state')}
              name='state'
              id='state'
              select
              defaultValue=''
              label='Trạng thái'
              variant='outlined'
              error={errors.state && true}
              helperText={errors.state?.message?.toString()}
            >
              <MenuItem value={STATE.ACTIVE}>Đang hoạt động</MenuItem>
              <MenuItem value={STATE.INACTIVE}>Không hoạt động</MenuItem>
            </TextField>
            <TextField
              {...register('role')}
              name='role'
              id='role'
              select
              label='Vai trò'
              variant='outlined'
              defaultValue=''
              onChange={(e: any) => setRole(e.target.value)}
              error={errors.role && true}
              helperText={errors.role?.message?.toString()}
            >
              <MenuItem value={ROLE.ADMIN}>Admin</MenuItem>
              <MenuItem value={ROLE.DELIVERY}>Tài xế</MenuItem>
              <MenuItem value={ROLE.MAKER}>Nhà sản xuất</MenuItem>
              <MenuItem value={ROLE.WAREHOUSE}>Quản lí kho</MenuItem>
            </TextField>
            <TextField
              {...register('warehouseId')}
              name='warehouseId'
              id='warehouseId'
              label='Kho'
              select
              variant='outlined'
              defaultValue=''
              error={errors.warehouseId && true}
              helperText={errors.warehouseId?.message?.toString()}
              SelectProps={{ MenuProps: MenuProps }}
            >
              {role === ROLE.MAKER
                ? maker
                    .filter((maker: any) => maker.state == STATE.ACTIVE)
                    .map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)
                : role === ROLE.WAREHOUSE
                ? warehouses
                    .filter((warehouses: any) => warehouses.state == STATE.ACTIVE)
                    .map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)
                : concat
                    .filter((concat: any) => concat.state == STATE.ACTIVE)
                    .map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
            </TextField>
            <TextField
              {...register('password')}
              name='password'
              id='password'
              type={eye ? 'text' : 'password'}
              label='Mật khẩu'
              variant='outlined'
              error={errors.password && true}
              helperText={errors.password?.message?.toString()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setEye(!eye)}>
                      {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Divider variant='middle' />
            &nbsp;
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
