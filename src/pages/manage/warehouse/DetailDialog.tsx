import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, CardHeader } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { AccountTable } from '@/pages/system/account/AccountTable'
import { STATE } from '@/api/enum'
import { AddDialog } from '@/pages/system/account/AddDialog'
interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).find((items: any) => items.id == props.id)
  const handleClose = () => {
    props.show(false)
  }
  return (
    <Dialog open={true} maxWidth={'xl'}>
      <DialogTitle variant='h3'>Thông tin kho</DialogTitle>

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
        >
          <TextField
            label='Tên'
            variant='outlined'
            name='name'
            defaultValue={warehouses.name}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label='Địa chỉ'
            name='warehouseId'
            variant='outlined'
            defaultValue={warehouses.address}
            multiline
            rows={2}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label='Mô tả'
            name='description'
            variant='outlined'
            defaultValue={warehouses.description}
            multiline
            rows={2}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label='Trạng thái'
            variant='outlined'
            name='state'
            defaultValue={warehouses.state == STATE.ACTIVE ? 'Đang hoạt động' : 'Không hoạt động'}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
        <CardHeader title=' Danh sách tài khoản quản lý kho' action={<AddDialog />} />
        <AccountTable warehouseType='WAREHOUSE' />
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
  )
}
