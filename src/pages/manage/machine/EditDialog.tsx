import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateMachine } from '@/store/reducers/machine'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const EditDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'HONDA')
  const machines = useSelector((store: any) => store.machine.machines)
  const exsistMachine = machines.find((item: any) => item.id == props.id)
  const dispatch = useDispatch<AppDispatch>()
  const [address, setAddress] = React.useState(warehouses.address)

  const [values, setValues] = React.useState(exsistMachine)
  const [open, setOpen] = React.useState(true)

  const changeHandler = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const selectHandler = (e: any) => {
    setAddress(e.address)
  }

  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  const handleSubmit = () => {
    dispatch(updateMachine({ id: props.id, machine: values }))
    handleClose()
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle variant='h3'>
          {'Chỉnh sửa máy quét'}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              left: '60%'
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        </DialogTitle>

        <Divider variant='middle' />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box component='form' noValidate autoComplete='off' flexDirection='row'>
            <TextField
              label='Tên'
              variant='outlined'
              name='name'
              defaultValue={exsistMachine.name}
              onChange={changeHandler}
              sx={{
                m: 5,
                width: '25ch'
              }}
            />
            <TextField
              select
              label='Loại'
              variant='outlined'
              name='type'
              defaultValue={exsistMachine.type}
              onChange={changeHandler}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              <MenuItem key={1} value={'MOVING'}>
                Di động
              </MenuItem>
              <MenuItem key={2} value={'FIXED'}>
                Cố định
              </MenuItem>
            </TextField>
            <TextField
              select
              label='Kho'
              name='warehouseId'
              variant='outlined'
              defaultValue={exsistMachine.warehouseId}
              onChange={changeHandler}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              {warehouses.map((items: any) => (
                <MenuItem key={items.id} value={items.id} onClick={() => selectHandler(items)}>
                  {items.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label='Trạng thái'
              select
              variant='outlined'
              name='state'
              defaultValue={exsistMachine.state}
              onChange={changeHandler}
              sx={{
                m: 5,
                width: '25ch'
              }}
            >
              <MenuItem key={1} value={'ACTIVE'}>
                Đang hoạt động
              </MenuItem>
              <MenuItem key={2} value={'INACTIVE'}>
                Không hoạt động
              </MenuItem>
              <MenuItem key={3} value={'MAINTAIN'}>
                Bảo trì
              </MenuItem>
            </TextField>
            <TextField
              label='Vị trí'
              variant='outlined'
              value={address}
              defaultValue={warehouses.find((item: any) => item.id == exsistMachine.warehouseId).address}
              multiline
              rows={2}
              sx={{
                m: 5,
                width: '90%'
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
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
