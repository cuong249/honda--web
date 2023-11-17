import { Machine, getListParams, getParams } from '@/api/types'
import machineApi from '@/api/machine'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { number } from 'yup'

interface updateParams {
  id: string
  machine: Machine
}

export const getListMachine = createAsyncThunk('appMachine/getList', async (params: getListParams) => {
  const response = await machineApi.getList(params)

  return response.data
})

export const getMachine = createAsyncThunk('appMachine/get', async (params: getParams) => {
  const response = await machineApi.get(params)

  return response.data
})

export const createMachine = createAsyncThunk('appMachine/create', async (machine: Machine) => {
  const response = await machineApi.create(machine)

  return response.data
})

export const updateMachine = createAsyncThunk('appMachine/update', async ({ id, machine }: updateParams) => {
  const response = await machineApi.update(id, machine)

  return response.data
})

export const deleteMachine = createAsyncThunk('appMachine/delete', async (id: string) => {
  const response = await machineApi.delete(id)

  return response.data
})

export const appMachineSlice = createSlice({
  name: 'appMachine',
  initialState: {
    machines: [] as Machine[],
    amount: number
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListMachine.fulfilled, (state, action) => {
      state.machines = action.payload.machines
      state.amount = action.payload.amount
    })
  }
})

export default appMachineSlice.reducer
