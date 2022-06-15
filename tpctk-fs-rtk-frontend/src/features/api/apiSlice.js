import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fastapi.precasttoolkit.com' }),
    tagTypes: ['Cast Iron'],
    endpoints: builder => ({})
})