import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { deleteAccount, getListAccount } from '@/store/reducers/account'
import { ROLE, STATE_MAINTAIN } from '@/api/enum'
import { useAuth } from '@/hooks/useAuth'
interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DeleteDialog = (props: Data) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const query =
    user?.role == ROLE.ADMIN
      ? JSON.stringify({
          state: [STATE_MAINTAIN.ACTIVE, STATE_MAINTAIN.INACTIVE, STATE_MAINTAIN.MAINTAIN]
        })
      : JSON.stringify({
          state: [STATE_MAINTAIN.ACTIVE, STATE_MAINTAIN.MAINTAIN]
        })
  const handleClose = () => {
    props.show(false)
  }
  const handleSubmit = () => {
    dispatch(deleteAccount(props.id))
    handleClose()
    window.location.reload()
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='customized-dialog-title' variant='h3'>
        Thông báo !
      </DialogTitle>
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
      <Divider variant='middle' />
      <DialogContent sx={{ m: 0, p: 2 }}>
        <DialogContentText>Bạn có chắc chắn muốn vô hiệu hóa tài khoản này ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='error'>
          Hủy
        </Button>
        <Button onClick={handleSubmit} color='success'>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  )
}
