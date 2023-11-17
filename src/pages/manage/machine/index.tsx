import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { AddDialog } from './AddDialog'
import { MachineTable } from './MachineTable'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React from 'react'

export default function Page() {
  const [addDialog, setAddDialog] = React.useState(false)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {addDialog ? <AddDialog show={setAddDialog} /> : null}
          <CardHeader
            title='Danh sách máy quét'
            action={
              <Button variant='outlined' onClick={() => setAddDialog(true)}>
                <AddCircleIcon />
                &nbsp; Thêm máy quét
              </Button>
            }
          />
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
