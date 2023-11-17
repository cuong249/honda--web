import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { WarehouseTable } from './WarehouseTable'
import { AddDialog } from './AddDialog'

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách nhà kho' action={<AddDialog />} />
          <CardContent>
            <WarehouseTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
Page.acl = {
  action: 'manage',
  subject: 'warehouse-page'
}
