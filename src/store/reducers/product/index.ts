import { Product, completeMaintainProductParams, getListParams, getParams, maintainProductParams } from '@/api/types'
import productApi from '@/api/product'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { number } from 'yup'

interface updateParams {
  id: string
  product: Product
}

export const getListProduct = createAsyncThunk('appProduct/getList', async (params: getListParams) => {
  const response = await productApi.getList(params)

  return response.data
})

export const getProduct = createAsyncThunk('appProduct/get', async (params: getParams) => {
  const response = await productApi.get(params)

  return response.data
})

export const createProduct = createAsyncThunk('appProduct/create', async (product: Product) => {
  const response = await productApi.create(product)

  return response.data
})

export const updateProduct = createAsyncThunk('appProduct/update', async ({ id, product }: updateParams) => {
  const response = await productApi.update(id, product)

  return response.data
})

export const deleteProduct = createAsyncThunk('appProduct/delete', async (id: string) => {
  const response = await productApi.delete(id)

  return response.data
})

export const maintainProduct = createAsyncThunk('appProduct/delete', async (params: maintainProductParams) => {
  const response = await productApi.maintain(params)

  return response.data
})

export const completeMaintainProduct = createAsyncThunk(
  'appProduct/delete',
  async (params: completeMaintainProductParams) => {
    const response = await productApi.completeMaintain(params)

    return response.data
  }
)

export const appProductSlice = createSlice({
  name: 'appProduct',
  initialState: {
    products: [] as Product[],
    amount: number
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListProduct.fulfilled, (state, action) => {
      state.products = action.payload.products
      state.amount = action.payload.amount
    })
  }
})

export default appProductSlice.reducer
