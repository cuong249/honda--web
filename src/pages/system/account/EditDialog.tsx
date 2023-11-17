import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateAccount } from '@/store/reducers/account'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const EditDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'MAKER')
  const accounts = useSelector((store: any) => store.account.accounts)
  const exsistAccount = accounts.filter((item: any) => item.id == props.id)[0]
  const dispatch = useDispatch<AppDispatch>()
  

  const [values, setValues] = React.useState(exsistAccount)
  const [open, setOpen] = React.useState(true)

  const changeHandler = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  const handleSubmit = () => {
    console.log(values)
    dispatch(updateAccount({ id: props.id, account: values }))
    handleClose()
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Chỉnh sửa thông tin tài khoản</DialogTitle>

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
              <TextField
                label='Họ và tên đệm'
                variant='outlined'
                name='firstName'
                defaultValue={exsistAccount.firstName}
                onChange={changeHandler}
              />
              <TextField
                label='Email'
                variant='outlined'
                name='email'
                defaultValue={exsistAccount.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <TextField select label='Kho' variant='outlined' name='warehouseId' defaultValue={exsistAccount.warehouseId} onChange={changeHandler}>
              {warehouses.map((items: any) => (
                  <MenuItem key={items.id} value={items.id}>
                    {items.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label='Tên'
                variant='outlined'
                name='lastName'
                defaultValue={exsistAccount.lastName}
                onChange={changeHandler}
              />
            </div>
            <div>
              <TextField
                label='Trạng thái'
                select
                variant='outlined'
                name='state'
                defaultValue={exsistAccount.state}
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
                defaultValue={exsistAccount.role}
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
              <TextField
                label='Số điện thoại'
                variant='outlined'
                name='phone'
                defaultValue={exsistAccount.phone}
                onChange={changeHandler}
              />
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
              color: (theme: { palette: { grey: any[] } }) => theme.palette.grey[500]
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
