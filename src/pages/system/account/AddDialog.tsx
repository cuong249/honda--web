import React, { useEffect } from 'react'
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
import { createAccount } from '@/store/reducers/account'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllAccount } from '@/store/reducers/account'
import { getAllWarehouse } from '@/store/reducers/warehouse'

export const AddDialog = () => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'MAKER')
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllWarehouse())
  }, [])
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    displayName: '',
    birthday: '',
    phone: '',
    email: '',
    role: '',
    delivery: '',
    warehouseId: '',
    password: '',
    rfid: '',
    token: '',
    state: '',
    option: ''
  })
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = () => {
    console.log(data)
    dispatch(createAccount(data))
    handleClose()
  }
  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        <AddCircleIcon />
        &nbsp; Thêm tài khoản
      </Button>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Thêm tài khoản</DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, width: '25ch' }
            }}
            noValidate
            autoComplete='off'
            flexDirection='column'
          >
            <div>
              <TextField label='Họ và tên đệm' variant='outlined' name='firstName' onChange={changeHandler} />
              <TextField label='Email' variant='outlined' name='name' onChange={changeHandler} />
            </div>
            <div>
              <TextField select label='Kho' variant='outlined' name='warehouseId' defaultValue='' onChange={changeHandler}>
              {warehouses.map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label='Tên' variant='outlined' name='lastName' onChange={changeHandler} />
            </div>
            <div>
              <TextField
                label='Trạng thái'
                select
                variant='outlined'
                name='state'
                defaultValue=''
                onChange={changeHandler}
              >
                <MenuItem key={1} value={'ACTIVE'}>
                  Đang hoạt động
                </MenuItem>
                <MenuItem key={2} value={'INACTIVE'}>
                  Không hoạt động
                </MenuItem>
              </TextField>
              <TextField label='Ngày sinh' variant='outlined' name='birthday' onChange={changeHandler} />
            </div>
            <div>
              <TextField
                label='Vai trò'
                select
                variant='outlined'
                name='role'
                defaultValue=''
                onChange={changeHandler}
              >
                <MenuItem key={1} value={'ADMIN'}>
                  Quản trị viên
                </MenuItem>
                <MenuItem key={2} value={'WAREHOUSE'}>
                  Quản lý kho
                </MenuItem>
                <MenuItem key={2} value={'DELIVERY'}>
                  Tài xế
                </MenuItem>
                <MenuItem key={2} value={'MAKER'}>
                  Maker
                </MenuItem>
              </TextField>
              <TextField label='Số điện thoại' variant='outlined' name='phone' onChange={changeHandler} />
            </div>
          </Box>
        </DialogContent>
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
          <Button variant='outlined' color='success' onClick={handleSubmit}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
