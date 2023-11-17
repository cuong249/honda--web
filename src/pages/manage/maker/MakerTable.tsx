import { AppDispatch } from '@/store'
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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { TablePagination } from '@mui/material'
import { getAllWarehouse } from '@/store/reducers/warehouse'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { DetailDialog } from './DetailDialog'

export const MakerTable = () => {
  const warehouse = useSelector((store: any) => store.warehouse.warehouses)
  const data = warehouse.filter((warehouse: any) => warehouse.type == 'MAKER')
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllWarehouse())
  }, [])
  const [detailDialog, setDetailDialog] = useState<boolean>(false)
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [makerId, setMakerId] = useState<string>('')
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
      {editDialog ? <EditDialog id={makerId} show={setEditDialog} /> : null}
      {deleteDialog ? <DeleteDialog id={makerId} show={setDeleteDialog} /> : null}
      {detailDialog ? <DetailDialog id={makerId} show={setDetailDialog} /> : null}

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>#</TableCell>
              <TableCell align='justify'>Tên</TableCell>
              <TableCell align='center'>Vị trí</TableCell>
              <TableCell align='right'>Trạng thái</TableCell>
              <TableCell align='justify'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rows: any, index: any) => (
              <TableRow
                hover
                key={index}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setMakerId(rows.id)
                }}
              >
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {index + 1}
                </TableCell>
                <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                  {rows.name}
                </TableCell>
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {rows.address}
                </TableCell>
                <TableCell align='right' onClick={() => setDetailDialog(true)}>
                  {rows.state == 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động'}
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
