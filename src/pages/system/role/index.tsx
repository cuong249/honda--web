import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography,
  alpha,
  styled
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '@/store'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import { getListRole } from '@/store/reducers/role'
import { ROLE } from '@/api/enum'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
export default function Page() {
  const warehouse = useSelector((store: any) => store.warehouse.warehouses)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getListRole())
  }, [])
  const [addRoll, setAddRoll] = React.useState(false)
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sm={6} md={3} lg={3}>
        <Card>
          <IconButton
            aria-label='close'
            onClick={() => setAddRoll(true)}
            sx={{
              left: '85%',
              color: theme => theme.palette.grey[500]
            }}
          >
            <AddIcon />
          </IconButton>
          {addRoll ? (
            <ListItem>
              <TextField variant='standard' label='Vai trò'></TextField>
              &nbsp;
              <IconButton edge='end' aria-label='Cancel' onClick={() => setAddRoll(false)}>
                <CancelIcon />
              </IconButton>
              &nbsp; &nbsp;
              <IconButton edge='end' aria-label='save'>
                <SaveIcon />
              </IconButton>
            </ListItem>
          ) : null}
          <List>
            <ListItem
              key={ROLE.WAREHOUSE}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={'Kho'} />
            </ListItem>
            <ListItem
              key={ROLE.DELIVERY}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={'Tài xế'} />
            </ListItem>
            <ListItem
              key={ROLE.MAKER}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={'Maker'} />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={9} lg={9}>
        <Card>
          <CardHeader title='Chỉnh sửa vai trò'></CardHeader>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Thành viên' {...a11yProps(0)} />
              <Tab label='Phân quyền' {...a11yProps(1)} />
            </Tabs>
            <Box sx={{ p: 3 }} />
          </Box>
          <CustomTabPanel value={value} index={0}>
            Thành viên
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Phân quyền
          </CustomTabPanel>
        </Card>
      </Grid>
    </Grid>
  )
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))
