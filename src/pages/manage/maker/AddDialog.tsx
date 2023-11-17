import React from 'react'
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
import { useDispatch } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { createWarehouse } from '@/store/reducers/warehouse'

export const AddDialog = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    address: '',
    type: 'MAKER',
    description: '',
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
    dispatch(createWarehouse(data))
    handleClose()
  }
  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        <AddCircleIcon />
        &nbsp; Thêm Maker
      </Button>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Thêm Maker</DialogTitle>
        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, maxWidth: '90%', width: '200px' },
              width: '500px'
            }}
            noValidate
            autoComplete='off'
            flexDirection='row'
          >
            <TextField label='Tên' variant='outlined' name='name' style={{ width: '200' }} onChange={changeHandler} />
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
            <TextField
              label='Mô tả'
              variant='outlined'
              name='description'
              multiline
              rows={3}
              onChange={changeHandler}
            />
            <TextField
              label='Địa chỉ'
              variant='outlined'
              name='address'
              onChange={changeHandler}
              multiline
              rows={3}
              fullWidth={true}
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
          <Button variant='outlined' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='outlined' onClick={handleSubmit}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
