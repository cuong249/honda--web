import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  IconButton,
  MenuItem,
  InputAdornment
} from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ROLE, STATE } from '@/api/enum'
import { updateAccount } from '@/store/reducers/account'
import { Account } from '@/api/types'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const EditDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const accounts = useSelector((store: any) => store.account.accounts).find((item: any) => item.id === props.id)
  const maker = useSelector((store: any) => store.maker.makers)
  const concat = warehouses.concat(maker)

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Tên không được để trống !'),
    lastName: Yup.string().required('Họ và tên đệm không được để trống !'),
    birthday: Yup.string().required('Ngày sinh không được để trống !'),
    phone: Yup.string()
      .lowercase()
      .required('Số điện thoại không được để trống !')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại chưa đúng định dạng')
      .max(10, 'Số điện thoại chưa đúng định dạng'),
    email: Yup.string().required('Email không được để trống !').email('Email không đúng định dạng'),
    state: Yup.string().required('Trạng thái không được để trống !'),
    warehouseId: Yup.string().required('Nhà kho không được để trống !'),
    role: Yup.string().required('Vai trò không được để trống !'),
    password: Yup.string().required('Mật khẩu không được để trống')
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, formState, getValues, setValue } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(e: any) {
    console.log(getValues())
    dispatch(updateAccount({ id: props.id, account: getValues() as Account }))
    handleClose()
    window.location.reload()
  }
  useEffect(() => {
    setValue('firstName', accounts.firstName)
    setValue('lastName', accounts.lastName)
    setValue('birthday', accounts.birthday)
    setValue('phone', accounts.phone)
    setValue('email', accounts.email)
    setValue('state', accounts.state)
    setValue('warehouseId', accounts.warehouseId)
    setValue('role', accounts.role)
    setValue('password', accounts.password)
  }, [])
  const [eye, setEye] = React.useState<boolean>(false)
  const [role, setRole] = React.useState<ROLE.MAKER | ROLE.WAREHOUSE>(accounts.role)
  const dispatch = useDispatch<AppDispatch>()
  const handleClose = () => {
    console.log(concat.find((item: any) => item.id === accounts.warehouseId).id)
    console.log(warehouses)
    console.log(maker)

    console.log(concat)

    props.show(false)
  }
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
  return (
    <Dialog open={true} maxWidth={'md'} fullWidth>
      <DialogTitle variant='h3'>Chỉnh sửa tài khoản</DialogTitle>
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
            defaultValue={accounts.lastName}
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
            defaultValue={accounts.firstName}
            error={errors.firstName && true}
            helperText={errors.firstName?.message?.toString()}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...register('birthday')}
              label='Ngày sinh'
              format='DD/MM/YYYY'
              defaultValue={dayjs(new Date(accounts.birthday).getTime())}
              onChange={(newValue: any) => setValue('birthday', new Date(newValue).getTime())}
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
            defaultValue={accounts.phone}
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
            defaultValue={accounts.email}
            error={errors.email && true}
            helperText={errors.email?.message?.toString()}
          />
          <TextField
            {...register('state')}
            name='state'
            id='state'
            select
            defaultValue={accounts.state}
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
            onChange={(e: any) => setRole(e.target.value)}
            defaultValue={accounts.role}
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
            select
            label='Kho'
            variant='outlined'
            defaultValue={concat.find((item: any) => item.id === accounts.warehouseId).id}
            error={errors.warehouseId && true}
            helperText={errors.warehouseId?.message?.toString()}
            SelectProps={{ MenuProps: MenuProps }}
          >
            {role === ROLE.MAKER
              ? maker.map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)
              : role === ROLE.WAREHOUSE
              ? warehouses.map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)
              : concat.map((item: any) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
          </TextField>
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
  )
}
