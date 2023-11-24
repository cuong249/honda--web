import CustomTextField from '@/@core/components/mui/text-field'
import { Product } from '@/api/types'
import DialogCustomized from '@/views/components/dialogs/DialogCustomized'
import { Typography } from '@mui/material'

interface Props {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
  product: Product
  setProduct: any
}

export default function DialogMaintain({ open, handleClose, handleConfirm, product, setProduct }: Props) {
  return (
    <DialogCustomized open={open} handleClose={handleClose} handleConfirm={handleConfirm} title='Bảo trì XCD'>
      <CustomTextField
        label='Ghi chú'
        fullWidth
        value={product?.descriptionMaintenance ? product?.descriptionMaintenance : ''}
        id='description'
        onChange={e => {
          setProduct({
            ...product,
            descriptionMaintenance: e.target.value
          })
        }}
      />
      <Typography></Typography>
    </DialogCustomized>
  )
}
