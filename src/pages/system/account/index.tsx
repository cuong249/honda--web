import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { AccountTable } from './AccountTable'
import React from 'react'
import { AddDialog } from './AddDialog'
export default function Account() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Danh sách tài khoản' action={<AddDialog />} />
          <CardContent>
            <AccountTable warehouseType='' />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
