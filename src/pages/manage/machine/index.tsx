import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { MachineTable } from './MachineTable'
import React from 'react'
import { AddDialog } from './AddDialog'

export default function Page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách máy quét' action={<AddDialog />} />
          <CardContent>
            <MachineTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
Page.acl = {
  action: 'manage',
  subject: 'machine-page'
}
