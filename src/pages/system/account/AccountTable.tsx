import { AppDispatch } from '@/store'
import { getAllAccount } from '@/store/reducers/account'
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
import { DeleteDialog } from './DeleteDialog'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { TablePagination } from '@mui/material'
import { getAllWarehouse } from '@/store/reducers/warehouse'
import CircleIcon from '@mui/icons-material/Circle';

export const AccountTable = () => {
  const data = useSelector((store: any) => store.account.accounts)
  const warehouses = useSelector((store: any) => store.warehouse.warehouses).filter((item: any) => item.type == 'MAKER')
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllAccount())
    dispatch(getAllWarehouse())
  }, [])
  const [detailDialog, setDetailDialog] = useState<boolean>(false)
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [accountId, setAccountId] = useState<string>('')
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
      {editDialog ? <EditDialog id={accountId} show={setEditDialog} /> : null}
      {detailDialog ? <DetailDialog id={accountId} show={setDetailDialog} /> : null}
      {deleteDialog ? <DeleteDialog id={accountId} show={setDeleteDialog} /> : null}
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>#</TableCell>
              <TableCell align='justify'>Họ và tên</TableCell>
              <TableCell align='justify'>Số điện thoại</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Vai trò</TableCell>
              <TableCell align='right'>Trạng thái</TableCell>
              <TableCell align='justify'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rows: any, index: any) => (
              <TableRow
                hover
                key={rows.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setAccountId(rows.id)
                }}
              >
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {index + 1}
                </TableCell>
                <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                  {rows.displayName}
                </TableCell>
                <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                  {rows.phone}
                </TableCell>
                <TableCell align='center' onClick={() => setDetailDialog(true)}>
                  {rows.email}
                </TableCell>
                <TableCell align='right' onClick={() => setDetailDialog(true)}>
                  {rows.role == 'ADMIN'
                    ? 'Quản trị viên'
                    : rows.role == 'MAKER'
                    ? 'MAKER'
                    : rows.role == 'DELIVERY'
                    ? 'Tài xế'
                    : 'Quản lý kho'}
                </TableCell>
                <TableCell align='right' onClick={() => setDetailDialog(true)}>
                  {rows.state == 'ACTIVE' ? <CircleIcon sx={{ fontSize: 8 }} color='success'/> : <CircleIcon  sx={{ fontSize: 8 }} color='error'/>}
                  &nbsp;&nbsp;
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
