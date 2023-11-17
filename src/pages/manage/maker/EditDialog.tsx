import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateWarehouse } from '@/store/reducers/warehouse'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const EditDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const exsistWarehouse = warehouses.filter((items: any) => items.id == props.id)[0]
  const [open, setOpen] = React.useState<boolean>(true)
  const [values, setValues] = React.useState(exsistWarehouse)
  const dispatch = useDispatch<AppDispatch>()
  const changeHandler = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  const handleSubmit = () => {
    dispatch(updateWarehouse({ id: exsistWarehouse.id, warehouse: values }))
    handleClose()
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle variant='h3'>Chỉnh sửa Maker</DialogTitle>
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
              onChange={changeHandler}
            />
            <TextField
              select
              label='Trạng thái'
              variant='outlined'
              name='state'
              defaultValue={exsistWarehouse.state}
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
              name='description'
              variant='outlined'
              defaultValue={exsistWarehouse.description}
              multiline
              rows={2}
              onChange={changeHandler}
            />
            <TextField
              label='Địa chỉ'
              name='address'
              variant='outlined'
              defaultValue={exsistWarehouse.address}
              multiline
              rows={2}
              onChange={changeHandler}
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
