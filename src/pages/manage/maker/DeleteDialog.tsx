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
import { deleteWarehouse } from '@/store/reducers/warehouse'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DeleteDialog = (props: Data) => {
  const [open, setOpen] = React.useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  const handleSubmit = () => {
    dispatch(deleteWarehouse(props.id))
    handleClose()
  }
  return (
    <>
      <Dialog
        open={open}
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
          <DialogContentText>Bạn có chắc chắn muốn vô hiệu hóa Maker này ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}