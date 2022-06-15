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
            query: () => '/cast_iron/all-cast-iron',
            transformResponse: responseData => {
                const loadedCastIrons = responseData.map(castIron => {
                    if (!castIron?.reactions) castIron.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return castIron;
                });
                return castIronsAdapter.setAll(initialState, loadedCastIrons)
            },
            providesTags: (result, error, arg) => [
                { type: 'Cast Iron', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Cast Iron', id }))
            ]
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
} = extendedApiSlice



// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = castIronsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)