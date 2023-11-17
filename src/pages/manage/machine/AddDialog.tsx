import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  IconButton,
  MenuItem,
  Button,
  Divider,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { AppDispatch } from '@/store'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { createMachine, getAllMachine } from '@/store/reducers/machine'
import { getAllWarehouse } from '@/store/reducers/warehouse'
interface Data {
  show: Dispatch<SetStateAction<boolean>>
}
export const AddDialog = (props: Data) => {
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'HONDA')
  const machine = useSelector((store: any) => store.machine.machines)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllWarehouse())
    dispatch(getAllMachine())
  }, [])
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    type: '',
    warehouseId: '',
    state: '',
    option: ''
  })
  const [error, setError] = React.useState({
    name: false,
    type: false,
    warehouseId: false,
    state: false,
    option: false
  })
  const [helperText, setHelperText] = React.useState<string>()
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (nameConfirm() && data.state !== '' && data.type !== '' && data.warehouseId !== '') {
      console.log('cool')
      // dispatch(createMachine(data))
      // handleClose()
    } else {
      console.log('not cool')
    }
    // dispatch(createMachine(data))
    // handleClose()
  }
  const nameConfirm = () => {
    if (machine.find((item: any) => item.name == data.name)) {
      setHelperText('Tên máy quét đã tồn tại')
      // setError(...error,[error.name]:true)
      return false
    } else if (data.name == '' || data.name == undefined || data.name == null) {
      setHelperText('Tên không được để trống')
    }
    return true
  }
  const handleClose = () => {
    props.show(false)
  }
  return (
    <Dialog open={true}>
      <DialogTitle variant='h3'>
        {'Thêm máy quét'}
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
          {/* Tên máy quét */}
          <TextField
            label='Tên'
            variant='outlined'
            name='name'
            onChange={changeHandler}
            helperText={helperText}
            error={error.name}
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
            defaultValue={''}
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
            defaultValue=''
            onChange={changeHandler}
            sx={{
              m: 5,
              width: '25ch'
            }}
          >
            {warehouses.map((items: any) => (
              <MenuItem key={items.id} value={items.id}>
                {items.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Trạng thái'
            select
            variant='outlined'
            name='state'
            defaultValue=''
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
            onChange={changeHandler}
            defaultValue=''
            multiline
            rows={3}
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
  )
}
