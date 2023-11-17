import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateAccount } from '@/store/reducers/account'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const accounts = useSelector((store: any) => store.account.accounts)
  const exsistAccount = accounts.filter((item: any) => item.id == props.id)[0]

  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Thông tin tài khoản</DialogTitle>

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
                InputProps={{
                  readOnly: true
                }}
              />
             <TextField
                label='Email'
                variant='outlined'
                name='email'
                defaultValue={exsistAccount.email}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div>
              <TextField
                label='Kho'
                variant='outlined'
                name='warehouseId'
                defaultValue={warehouses.find((item: any) => item.id == exsistAccount. warehouseId).name}
                InputProps={{
                  readOnly: true
                }}
              /> 
              <TextField
                label='Tên'
                variant='outlined'
                name='lastName'
                defaultValue={exsistAccount.lastName}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div>
              <TextField
                label='Trạng thái'
                variant='outlined'
                name='state'
                defaultValue={
                  exsistAccount.state == 'ACTIVE'
                    ? 'Đang hoạt động'
                    : 'Không hoạt động'
                }
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                label='Ngày sinh'
                variant='outlined'
                name='birthday'
                defaultValue={exsistAccount.birthday}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div>
              <TextField
                label='Vai trò'
                variant='outlined'
                name='role'
                defaultValue={
                  exsistAccount.role == 'ADMIN'
                    ? 'Quản trị viên'
                    : exsistAccount.role == 'MAKER'
                    ? 'Maker'
                    : exsistAccount.role == 'DELIVERY'
                    ? 'Tài xế'
                    : 'Quản lý kho'
                }
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                label='Số điện thoại'
                variant='outlined'
                name='phone'
                defaultValue={exsistAccount.phone}
                InputProps={{
                  readOnly: true
                }}
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
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant='outlined' onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
