import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const castIronsAdapter = createEntityAdapter()

const initialState = castIronsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCastIrons: builder.query({
            query: () => '/api/v1/cast_iron/all-cast-iron/',
            transformResponse: responseData => {
                const loadedCastIrons = responseData.results.map(castIron => {
                    return castIron;
                });
                return castIronsAdapter.setAll(initialState, loadedCastIrons)
            },
            providesTags: (result, error, arg) => [
                { type: 'Cast Iron', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Cast Iron', id }))
            ]
        }),
        getCastIronById: builder.query({
            query: castIronId => `/api/v1/cast_iron/all-cast-iron/${castIronId}`,
            transformResponse: responseData => {
                const loadedCastIrons = responseData.map(castIron => {
                    return castIron;
                });
                return castIronsAdapter.setAll(initialState, loadedCastIrons)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Cast Iron', id }))
            ]
        }),
    })
})

export const {
    useGetCastIronsQuery,
    useGetCastIronByIdQuery
} = extendedApiSlice

// returns the query result object
export const selectCastIronsResult = extendedApiSlice.endpoints.getCastIrons.select()

// Creates memoized selector
const selectCastIronsData = createSelector(
    selectCastIronsResult,
    castIronsResult => castIronsResult.data, // normalized state object with ids & entities
)
//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCastIrons,
    selectById: selectCastIronById
    // Pass in a selector that returns the posts slice of state
} = castIronsAdapter.getSelectors(state => selectCastIronsData(state) ?? initialState)