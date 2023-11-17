import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { MakerTable } from './MakerTable'
import { AddDialog } from './AddDialog'

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách Maker' action={<AddDialog />} />
          <CardContent>
            <MakerTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
Page.acl = {
  action: 'manage',
  subject: 'maker-page'
}
