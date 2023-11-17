import { configureStore } from '@reduxjs/toolkit'
import category from './reducers/category'
import machine from './reducers/machine'
import product from './reducers/product'
import role from './reducers/role'
import takeout from './reducers/takeout'
import warehouse from './reducers/warehouse'
import account from './reducers/account'
import maker from './reducers/maker'

const store = configureStore({
  reducer: {
    account,
    category,
    machine,
    product,
    role,
    takeout,
    warehouse,
    maker
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
