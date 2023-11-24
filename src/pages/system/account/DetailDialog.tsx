import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { STATE } from '@/api/enum'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const accounts = useSelector((store: any) => store.account.accounts).find((item: any) => item.id == props.id)
  const maker = useSelector((store: any) => store.maker.makers)
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
    .concat(maker)
    .find((item: any) => item.id == accounts.warehouseId)
  const handleClose = () => {
    console.log(accounts)
    props.show(false)
  }
  return (
    <>
      <Dialog open={true}>
        <DialogTitle variant='h3'>Thông tin tài khoản</DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, width: '25ch' }
            }}
            flexDirection='column'
          >
            <TextField
              label='Họ và tên đệm'
              variant='outlined'
              defaultValue={accounts.lastName}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Tên'
              variant='outlined'
              name='firstName'
              defaultValue={accounts.firstName}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Ngày sinh'
              variant='outlined'
              name='birthday'
              defaultValue={
                new Date(accounts.birthday).getDate() +
                '/' +
                (new Date(accounts.birthday).getMonth() + 1) +
                '/' +
                new Date(accounts.birthday).getFullYear()
              }
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Số điện thoại'
              variant='outlined'
              name='phone'
              defaultValue={accounts.phone}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Email'
              variant='outlined'
              defaultValue={accounts.email}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Vai trò'
              variant='outlined'
              name='role'
              defaultValue={
                accounts.role == 'ADMIN'
                  ? 'Quản trị viên'
                  : accounts.role == 'MAKER'
                  ? 'Maker'
                  : accounts.role == 'DELIVERY'
                  ? 'Tài xế'
                  : 'Quản lý kho'
              }
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Kho'
              variant='outlined'
              name='warehouseId'
              defaultValue={warehouses.name}
              InputProps={{
                readOnly: true
              }}
            />

            <TextField
              label='Trạng thái'
              variant='outlined'
              defaultValue={accounts.state == STATE.ACTIVE ? 'Đang hoạt động' : 'Không hoạt động'}
              InputProps={{
                readOnly: true
              }}
            />
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
          <Button variant='outlined' onClick={handleClose} color='error'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
