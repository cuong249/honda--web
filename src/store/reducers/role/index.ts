import roleApi from '@/api/role'
import { Role } from '@/api/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface updateParams {
  id: string
  role: Role
}

export const getListRole = createAsyncThunk('appRole/getList', async () => {
  const response = await roleApi.getList()

  return response.data
})

export const getRole = createAsyncThunk('appRole/get', async (id: string) => {
  const response = await roleApi.get(id)

  return response.data
})

export const createRole = createAsyncThunk('appRole/create', async (role: Role) => {
  const response = await roleApi.create(role)

  return response.data
})

export const updateRole = createAsyncThunk('appRole/update', async ({ id, role }: updateParams) => {
  const response = await roleApi.update(id, role)

  return response.data
})

export const deleteRole = createAsyncThunk('appRole/delete', async (id: string) => {
  const response = await roleApi.delete(id)

  return response.data
})

export const appRoleSlice = createSlice({
  name: 'appRole',
  initialState: {
    roles: [] as Role[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListRole.fulfilled, (state, action) => {
      state.roles = action.payload.roles
    })
  }
})

export default appRoleSlice.reducer
