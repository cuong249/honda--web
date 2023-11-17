import takeoutApi from '@/api/takeout'
import { Takeout, getListParams, getParams } from '@/api/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { number } from 'yup'

interface updateParams {
  id: string
  takeout: Takeout
}

export const getListTakeout = createAsyncThunk('appTakeout/getList', async (params: getListParams) => {
  const response = await takeoutApi.getList(params)

  return response.data
})

export const getTakeout = createAsyncThunk('appTakeout/get', async (params: getParams) => {
  const response = await takeoutApi.get(params)

  return response.data
})

export const createTakeout = createAsyncThunk('appTakeout/create', async (takeout: Takeout) => {
  const response = await takeoutApi.create(takeout)

  return response.data
})

export const updateTakeout = createAsyncThunk('appTakeout/update', async ({ id, takeout }: updateParams) => {
  const response = await takeoutApi.update(id, takeout)

  return response.data
})

export const deleteTakeout = createAsyncThunk('appTakeout', async (id: string) => {
  const response = await takeoutApi.delete(id)

  return response.data
})

export const appTakeoutSlice = createSlice({
  name: 'appTakeout',
  initialState: {
    takeouts: [] as Takeout[],
    amount: number
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListTakeout.fulfilled, (state, action) => {
      state.takeouts = action.payload.takeouts
      state.amount = action.payload.amount
    })
  }
})

export default appTakeoutSlice.reducer
