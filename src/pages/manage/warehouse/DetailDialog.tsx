import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const exsistWarehouse = warehouses.filter((items: any) => items.id == props.id)[0]
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  return (
    <>
      <Dialog open={open} maxWidth={'xl'}>
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
              defaultValue={exsistWarehouse.name}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Địa chỉ'
              name='warehouseId'
              variant='outlined'
              defaultValue={exsistWarehouse.address}
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
              defaultValue={exsistWarehouse.description}
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
              defaultValue={exsistWarehouse.state == 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động'}
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
          Danh sách tài khoản quản lý kho
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
