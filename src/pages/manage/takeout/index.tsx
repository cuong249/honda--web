import { Box, Card, Grid, LinearProgress, Pagination, Typography } from '@mui/material'
import TableHeader from './TableHeader'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useSelector } from 'react-redux'
import { getListProduct, createProduct, updateProduct, deleteProduct } from '@/store/reducers/product'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { Takeout } from '@/api/types'
import CustomChip from '@/@core/components/mui/chip'
import { ROLE, STATE, STATE_MAINTAIN } from '@/api/enum'
import Icon from '@/@core/components/icon'
import OptionsMenu from '@/@core/components/option-menu'
import DialogDetail from './detail'
import DialogUpdate from './update'
import DialogCreate from './create'
import React from 'react'
import DialogDelete from './delete'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import { createTakeout, deleteTakeout, getListTakeout, updateTakeout } from '@/store/reducers/takeout'
import { format } from 'date-fns'

interface CellType {
  row: Takeout
}

export default function Page() {
  const { user } = useAuth()
  const query =
    user?.role == ROLE.ADMIN
      ? JSON.stringify({
          state: [STATE.ACTIVE, STATE.INACTIVE]
        })
      : JSON.stringify({
          state: [STATE.INACTIVE]
        })
  const [searchValue, setSearchValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'createdAt',
      sort: 'desc'
    }
  ])

  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [openUpdate, setOpenUpdate] = useState<boolean>(false)
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.takeout)
  const [takeoutExist, setTakeoutExist] = useState<Takeout>()
  const [takeoutNew, setTakeoutNew] = useState<Takeout>()

  const fetchData = () => {
    dispatch(
      getListTakeout({
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize,
        search: searchValue,
        order: sortModel[0] ? sortModel[0].field : undefined,
        arrange: sortModel[0] ? (sortModel[0].sort as string) : undefined,
        query: query
      })
    )
  }

  useEffect(() => {
    // console.log(productNew?.deliveryWarehouse.name)
  })

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchValue, setSearchValue, sortModel])

  const handleChangePage = (event: any, page: number) => {
    dispatch(
      getListProduct({
        limit: paginationModel.pageSize,
        offset: (page - 1) * paginationModel.pageSize,
        search: searchValue,
        order: sortModel[0] ? sortModel[0].field : undefined,
        arrange: sortModel[0] ? (sortModel[0].sort as string) : undefined,
        query: query
      })
    ).then(() => {
      setPaginationModel(prev => {
        return {
          ...prev,
          page: page - 1
        }
      })
    })
  }

  const handleOpenDetail = () => {
    setOpenDetail(true)
  }

  const handleCloseDetail = () => {
    setOpenDetail(false)
  }
  const handleOpenUpdate = () => {
    setOpenUpdate(true)
  }

  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  }
  const handleConfirmUpdate = async () => {
    if (
      !takeoutExist?.title ||
      !takeoutExist?.fromWarehouseId ||
      !takeoutExist?.toWarehouseId ||
      !takeoutExist?.transferDate ||
      !takeoutExist?.status ||
      !takeoutExist?.state
    ) {
      return true
    }
    const res = await dispatch(updateTakeout({ id: takeoutExist?.id as string, takeout: takeoutExist as Takeout }))
    if (res.meta.requestStatus == 'fulfilled') {
      toast.success('Chỉnh sửa thành công!')
    } else {
      toast.error('Chỉnh sửa thất bại!')
    }

    setOpenUpdate(false)
    await fetchData()

    return true
  }
  const handleOpenCreate = () => {
    setOpenCreate(true)
  }

  const handleCloseCreate = () => {
    setOpenCreate(false)
  }
  const handleConfirmCreate = async () => {
    if (
      !takeoutNew?.title ||
      !takeoutNew?.fromWarehouseId ||
      !takeoutNew?.toWarehouseId ||
      !takeoutNew?.transferDate ||
      !takeoutNew?.status ||
      !takeoutNew?.state
    ) {
      return true
    }
    const res = await dispatch(createTakeout(takeoutNew as Takeout))
    if (res.meta.requestStatus == 'fulfilled') {
      toast.success('Thêm takeout thành công!')
    } else {
      toast.error('Thêm takeout thất bại!')
    }
    setOpenCreate(false)
    await fetchData()

    return true
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const handleConfirmDelete = async () => {
    const res = await dispatch(deleteTakeout(takeoutExist!.id))
    if (res.meta.requestStatus == 'fulfilled') {
      toast.success('Xoá takeout thành công!')
    } else {
      toast.error('Xoá takeout thất bại!')
    }
    setOpenDelete(false)
    await fetchData()
  }

  const columns: GridColDef[] = [
    {
      flex: 0.05,
      field: 'id',
      minWidth: 50,
      headerName: '#',
      renderCell: ({ api, id }) => {
        const condition = api.getRowIndexRelativeToVisibleRows(id)
        const index = condition + paginationModel.page * paginationModel.pageSize

        return (
          <Typography>
            {condition != undefined ? `${index + 1}` : `${paginationModel.page * paginationModel.pageSize}`}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'fromWarehouse',
      minWidth: 100,
      headerName: 'Từ kho',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.fromWarehouse ? `${row.fromWarehouse.name || 0}` : ``}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'toWarehouse',
      headerName: 'Đến kho',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.toWarehouse ? `${row.toWarehouse.name || 0}` : ``}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'transferDate',
      headerName: 'Thời gian',
      sortable: false,
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.transferDate ? format(new Date(row.transferDate), 'HH:mm MM/dd/yyyy') : ''}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'state',
      headerName: 'Trạng thái',
      sortable: false,
      renderCell: ({ row }: CellType) => {
        switch (row.state) {
          case STATE.ACTIVE:
            return <CustomChip rounded size='small' skin='light' color='success' label='Đang hoạt động' />
          case STATE.INACTIVE:
            return <CustomChip rounded size='small' skin='light' color='error' label='Không hoạt động' />
        }
      }
    },
    {
      flex: 0.05,
      minWidth: 50,
      sortable: false,
      field: 'actions',
      headerName: '',
      renderCell: ({ row }: CellType) => (
        <div onClick={e => e.stopPropagation()}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionsMenu
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
              options={[
                {
                  text: 'Chỉnh sửa',
                  icon: <Icon icon='tabler:edit' fontSize={20} />,
                  menuItemProps: {
                    onClick: () => {
                      const product = store.takeouts.find((takeout: Takeout) => {
                        return takeout.id == row.id
                      })
                      setTakeoutExist(product)
                      handleOpenUpdate()
                    }
                  }
                },
                {
                  text: 'Xoá',
                  icon: <Icon icon='ic:outline-delete' fontSize={20} />,
                  menuItemProps: {
                    onClick: () => {
                      const product = store.takeouts.find((takeout: Takeout) => {
                        return takeout.id == row.id
                      })
                      setTakeoutExist(product)
                      handleOpenDelete()
                    }
                  }
                }
              ]}
            />
          </Box>
        </div>
      )
    }
  ]

  function CustomPagination() {
    return (
      <Pagination
        color='primary'
        page={paginationModel.page + 1}
        onChange={handleChangePage}
        count={Math.floor((Number(store.amount) - 1) / paginationModel.pageSize) + 1}
      />
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={searchValue} handleFilter={setSearchValue} handleClick={handleOpenCreate} />
            <DataGrid
              autoHeight
              paginationMode='server'
              slots={{
                pagination: CustomPagination,
                loadingOverlay: LinearProgress
              }}
              sortModel={sortModel}
              onSortModelChange={newSortModel => setSortModel(newSortModel)}
              rowHeight={62}
              sx={{
                // disable cell selection style
                '.MuiDataGrid-cell:focus': {
                  outline: 'none'
                },

                // pointer cursor on ALL rows
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer'
                }
              }}
              hideFooterSelectedRowCount
              rowCount={Number(store.amount)}
              rows={store.takeouts}
              columns={columns}
              disableRowSelectionOnClick
              onRowClick={async ({ id }) => {
                handleOpenDetail()
                const takeout = store.takeouts.find(takeout => {
                  return takeout.id == id
                })
                setTakeoutExist(takeout)
              }}
            />
            {openDetail && <DialogDetail handleClose={handleCloseDetail} open={openDetail} takeout={takeoutExist} />}
            {openUpdate && (
              <DialogUpdate
                handleClose={handleCloseUpdate}
                handleConfirm={handleConfirmUpdate}
                open={openUpdate}
                takeout={takeoutExist}
                setTakeout={setTakeoutExist}
              />
            )}
            {openCreate && (
              <DialogCreate
                handleClose={handleCloseCreate}
                handleConfirm={handleConfirmCreate}
                open={openCreate}
                takeout={takeoutNew}
                setTakeout={setTakeoutNew}
              />
            )}
            {openDelete && (
              <DialogDelete handleClose={handleCloseDelete} handleConfirm={handleConfirmDelete} open={openDelete} />
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
Page.acl = {
  action: 'manage',
  subject: 'takeout-page'
}
