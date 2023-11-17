import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { updateMachine } from '@/store/reducers/machine'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses)
  const machines = useSelector((store: any) => store.machine.machines)
  const exsistMachine = machines.find((item: any) => item.id == props.id)
  const [open, setOpen] = React.useState(true)
  const handleClose = () => {
    props.show(false)
    setOpen(false)
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle variant='h3'>
          {'Thông tin máy quét'}
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
              sx={{
                m: 5,
                width: '25ch'
              }}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Loại'
              variant='outlined'
              name='type'
              defaultValue={exsistMachine.type == 'MOVING' ? 'Di động' : 'Cố định'}
              sx={{
                m: 5,
                width: '25ch'
              }}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Kho'
              name='warehouseId'
              variant='outlined'
              defaultValue={warehouses.find((item: any) => item.id == exsistMachine.warehouseId).name}
              sx={{
                m: 5,
                width: '25ch'
              }}
              InputProps={{
                readOnly: true
              }}
            />

            <TextField
              label='Trạng thái'
              variant='outlined'
              name='state'
              defaultValue={
                exsistMachine.state == 'ACTIVE'
                  ? 'Đang hoạt động'
                  : exsistMachine.state == 'INACTIVE'
                  ? 'Không hoạt động'
                  : 'Bảo trì'
              }
              sx={{
                m: 5,
                width: '25ch'
              }}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              label='Vị trí'
              variant='outlined'
              defaultValue={warehouses.find((item: any) => item.id == exsistMachine.warehouseId).address}
              sx={{
                m: 5,
                width: '90%'
              }}
              InputProps={{
                readOnly: true
              }}
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose} color='error'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
