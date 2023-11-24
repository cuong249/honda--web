import { DialogTitle, DialogContent, TextField, DialogActions, Dialog, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import React, { Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { STATE_MAINTAIN, TYPE_MACHINE } from '@/api/enum'
import { machine } from 'os'

interface Data {
  id: string
  show: Dispatch<SetStateAction<boolean>>
}
export const DetailDialog = (props: Data) => {
  const machines = useSelector((store: any) => store.machine.machines).find((item: any) => item.id == props.id)
  const handleClose = () => {
    props.show(false)
  }
  return (
    <>
      <Dialog open={true}>
        <DialogTitle variant='h3'>
          {'Thông tin máy quét'}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              left: '50%'
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
              defaultValue={machines.name}
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
              defaultValue={machines.type == TYPE_MACHINE.MOVING ? 'Di động' : 'Cố định'}
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
              defaultValue={machines.warehouse?.name}
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
                machines.state == STATE_MAINTAIN.ACTIVE
                  ? 'Đang hoạt động'
                  : machines.state == STATE_MAINTAIN.INACTIVE
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
              name='location'
              defaultValue={machines.location}
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
