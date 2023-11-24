import CustomTextField from '@/@core/components/mui/text-field'
import { STATE_MAINTAIN } from '@/api/enum'
import { Product, Takeout } from '@/api/types'
import DialogCustomizedInfo from '@/views/components/dialogs/DialogCustomizedInfo'
import { Grid } from '@mui/material'
import { format } from 'date-fns'

interface Props {
  open: boolean
  handleClose: () => void
  takeout: Takeout | undefined
}

export default function DialogDetail({ open, handleClose, product }: Props) {
  return (
    <DialogCustomizedInfo open={open} handleClose={handleClose} title='Thông tin chi tiết XCD'>
      <Grid container spacing={6} justifyContent='center'>
        <Grid item xs={5}>
          <CustomTextField
            fullWidth
            label='Tên'
            defaultValue={product?.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Mã máy'
            fullWidth
            defaultValue={product?.numberCode}
            id='numberCode'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Loại'
            fullWidth
            defaultValue={product?.category.name}
            id='category'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho hiện tại'
            fullWidth
            defaultValue={product?.currentWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho sử dụng'
            fullWidth
            defaultValue={product?.deliveryWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho lưu trữ'
            fullWidth
            defaultValue={product?.storageWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          {product?.state == STATE_MAINTAIN.ACTIVE && product.maintainNext ? (
            <CustomTextField
              label='Lần bảo trì tiếp theo'
              fullWidth
              defaultValue={format(new Date(product.maintainNext), 'dd/MM/yyyy')}
              id='maintain'
              InputProps={{ readOnly: true }}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </DialogCustomizedInfo>
  )
}
