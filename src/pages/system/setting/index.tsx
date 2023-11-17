import { Typography } from '@mui/material'

export default function Page() {
  return (
    <>
      <Typography>Setting Page</Typography>
    </>
  )
}
Page.acl = {
  action:'manage',
  subject:'setting-page'
}
