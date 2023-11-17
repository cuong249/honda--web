import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import { AddDialog } from './AddDialog'
import { AccountTable } from './AccountTable'

export default function Account() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách tài khoản' action={<AddDialog />} />
          <CardContent>
            <AccountTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}



