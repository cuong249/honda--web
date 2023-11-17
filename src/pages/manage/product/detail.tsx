import CustomTextField from '@/@core/components/mui/text-field'
import { Product } from '@/api/types'
import DialogCustomizedInfo from '@/views/components/dialogs/DialogCustomizedInfo'
import { Grid } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => void
  product: Product | undefined
}

export default function DialogDetail({ open, handleClose, product }: Props) {
  return (
    <DialogCustomizedInfo open={open} handleClose={handleClose} title='Thông tin chi tiết XCD'>
      <Grid container spacing={6} justifyContent='center'>
        <Grid item xs={5}>
          <CustomTextField label='Tên' defaultValue={product?.name} id='name' InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Mã máy'
            defaultValue={product?.numberCode}
            id='numberCode'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Loại'
            defaultValue={product?.category.name}
            id='category'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho hiện tại'
            defaultValue={product?.currentWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho sử dụng'
            defaultValue={product?.deliveryWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField
            label='Kho lưu trữ'
            defaultValue={product?.storageWarehouse.name}
            id='name'
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={5}>
          <CustomTextField label='Qr code' defaultValue={product?.name} id='name' InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </DialogCustomizedInfo>
  )
}
