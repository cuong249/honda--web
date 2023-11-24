import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { AccountTable } from '@/pages/system/account/AccountTable'
import { STATE } from '@/api/enum'
interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const maker = useSelector((store: any) => store.maker.makers).find((items: any) => items.id == props.id)
  const handleClose = () => {
    props.show(false)
  }
  return (
    <>
      <Dialog open={true} maxWidth={'xl'}>
        <DialogTitle variant='h3'>Thông tin Maker</DialogTitle>

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
              defaultValue={maker.name}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Địa chỉ'
              name='warehouseId'
              variant='outlined'
              defaultValue={maker.address}
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
              defaultValue={maker.description}
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
              defaultValue={maker.state == STATE.ACTIVE ? 'Đang hoạt động' : 'Không hoạt động'}
              InputProps={{
                readOnly: true
              }}
            />
          </Box>
          Danh sách tài khoản quản lý Maker
          <AccountTable warehouseType='MAKER' />
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
