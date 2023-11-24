import { AppDispatch, RootState } from '@/store'

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
import CircleIcon from '@mui/icons-material/Circle'
import { ROLE, STATE, STATE_MAINTAIN } from '@/api/enum'
import { getListAccount } from '@/store/reducers/account'
import { useAuth } from '@/hooks/useAuth'
import { getListWarehouse } from '@/store/reducers/warehouse'
import { getListMaker } from '@/store/reducers/maker'

interface Data {
  warehouseType: string
}
export const AccountTable = (props: Data) => {
  const { user } = useAuth()
  const query =
    user?.role == ROLE.ADMIN
      ? JSON.stringify({
          state: [STATE_MAINTAIN.ACTIVE, STATE_MAINTAIN.INACTIVE, STATE_MAINTAIN.MAINTAIN]
        })
      : JSON.stringify({
          state: [STATE_MAINTAIN.ACTIVE, STATE_MAINTAIN.MAINTAIN]
        })
  const data = useSelector((store: RootState) => store.account.accounts)

  const dataFilter = data.filter((items: any) => items.role == props.warehouseType)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getListAccount({ limit: 10, offset: 0, search: '', order: undefined, arrange: undefined, query: query }))
    dispatch(getListWarehouse({ limit: 10, offset: 0, search: '', order: undefined, arrange: undefined, query: query }))
    dispatch(getListMaker({ limit: 10, offset: 0, search: '', order: undefined, arrange: undefined, query: query }))
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
            {(props.warehouseType ? dataFilter : data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rows: any, index: any) => (
                <TableRow
                  hover
                  key={rows.name}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setAccountId(rows.id)
                    console.log(rows.id)
                  }}
                >
                  <TableCell align='center' onClick={() => setDetailDialog(true)}>
                    {index + 1}
                  </TableCell>
                  <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                    {rows.lastName.concat(' ').concat(rows.firstName)}
                  </TableCell>
                  <TableCell align='justify' onClick={() => setDetailDialog(true)}>
                    {rows.phone}
                  </TableCell>
                  <TableCell align='center' onClick={() => setDetailDialog(true)}>
                    {rows.email}
                  </TableCell>
                  <TableCell align='right' onClick={() => setDetailDialog(true)}>
                    {rows.role == ROLE.ADMIN
                      ? 'Quản trị viên'
                      : rows.role == ROLE.MAKER
                      ? 'Maker'
                      : rows.role == ROLE.DELIVERY
                      ? 'Tài xế'
                      : 'Quản lý kho'}
                  </TableCell>
                  <TableCell align='right' onClick={() => setDetailDialog(true)}>
                    {rows.state == STATE.ACTIVE ? (
                      <CircleIcon sx={{ fontSize: 8 }} color='success' />
                    ) : (
                      <CircleIcon sx={{ fontSize: 8 }} color='error' />
                    )}
                    &nbsp;&nbsp;
                    {rows.state == STATE.ACTIVE ? 'Đang hoạt động' : 'Không hoạt động'}
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
