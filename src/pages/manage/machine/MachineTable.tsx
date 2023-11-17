import { AppDispatch } from '@/store'
import { getAllMachine } from '@/store/reducers/machine'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { EditDialog } from './EditDialog'
import { DetailDialog } from './DetailDialog'
import { DeleteDialog } from './DeleteDialog.'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { TablePagination } from '@mui/material'
import { getAllWarehouse } from '@/store/reducers/warehouse'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { color, display } from '@mui/system'
import { left, right } from '@popperjs/core'

var position = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5', 'Cổng 6']
export const MachineTable = () => {
  const data = useSelector((store: any) => store.machine.machines)
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'HONDA')
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllWarehouse())
    dispatch(getAllMachine())
  }, [])
  const [detailDialog, setDetailDialog] = useState<boolean>(false)
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [machineId, setMachineId] = useState<string>('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setDetailDialog(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      {editDialog ? <EditDialog id={machineId} show={setEditDialog} /> : null}
      {detailDialog ? <DetailDialog id={machineId} show={setDetailDialog} /> : null}
      {deleteDialog ? <DeleteDialog id={machineId} show={setDeleteDialog} /> : null}
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' width='50px' sx={{ paddingRight: '50px' }}>
                #
              </TableCell>
              <TableCell align='justify' width='150px'>
                Tên
              </TableCell>
              <TableCell align='center'>Loại</TableCell>
              <TableCell align='center'>Kho</TableCell>
              <TableCell align='center' width='320px'>
                Vị trí
              </TableCell>
              <TableCell align='center' width='160px'>
                Trạng thái
              </TableCell>
              <TableCell align='justify' width='30px'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rows: any, index: any) => (
              <TableRow
                hover
                key={rows.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setMachineId(rows.id)
                }}
              >
                <TableCell align='center' onClick={() => setDetailDialog(true)} sx={{ paddingRight: '50px' }}>
                  {index + 1}
                </TableCell>
                <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                  {rows.name}
                </TableCell>
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {rows.type == 'FIXED' ? 'Cố định' : 'Di động'}
                </TableCell>
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {warehouses.find((warehouses: any) => warehouses.id == rows.warehouseId).name}
                </TableCell>
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {position[Math.floor(Math.random() * position.length)]}
                </TableCell>
                <TableCell align='right' onClick={() => setDetailDialog(true)} sx={{ textAlign: 'left' }}>
                  {rows.state == 'ACTIVE' ? (
                    <FiberManualRecordIcon sx={{ color: '#40ed49', fontSize: '10px' }} />
                  ) : rows.state == 'INACTIVE' ? (
                    <FiberManualRecordIcon sx={{ color: '#fa2d53', fontSize: '10px' }} />
                  ) : (
                    <FiberManualRecordIcon sx={{ color: '#f5f24c', fontSize: '10px' }} />
                  )}
                  &nbsp;&nbsp;
                  {rows.state == 'ACTIVE' ? 'Đang hoạt động' : rows.state == 'INACTIVE' ? 'Không hoạt động' : 'Bảo trì'}
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='more'
                    id='long-button'
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Menu
            id='long-menu'
            MenuListProps={{
              'aria-labelledby': 'long-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch'
              }
            }}
          >
            <MenuItem
              key={1}
              onClick={() => {
                setEditDialog(true)
                setAnchorEl(null)
              }}
            >
              <ModeEditIcon /> Chỉnh sửa
            </MenuItem>

            <MenuItem
              key={2}
              onClick={() => {
                setDeleteDialog(true)
                setAnchorEl(null)
              }}
            >
              <DeleteIcon /> Xóa
            </MenuItem>
          </Menu>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
