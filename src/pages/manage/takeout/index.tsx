import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import { Card, Grid, Typography } from '@mui/material'

export default function Page() {
  return (
    <DatePickerWrapper>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Card>
            <Typography>hien</Typography>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
Page.acl = {
  action: 'manage',
  subject: 'takeout-page'
}
