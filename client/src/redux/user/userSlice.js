import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    currentUser : null,
    error : null ,
    loading : false,
    token : null
}


const userSlice = createSlice({
    name : "user" ,
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true
        }, 
        signInSuccess : (state  , action) => {
            state.currentUser = action.payload.user ,
            state.loading = false ,
            state.error = null,
            state.token = action.payload.token
        },
        saveTokenInLocalStorage : (_ , action) => {
            window.localStorage.setItem("token" , action.payload.token)
        },
        removeTokenInLocalStorage : () => {
            window.localStorage.removeItem("token")
        },
        signInFailure : (state , action) => {
            state.error = action.payload ,
            state.loading = false
        },
        updateUserStart : (state , action) => {
            state.loading = true
        },
        updateUserSuccess : (state , action) => {
            state.currentUser = action.payload,
            state.loading = false ,
            state.error = null
        },
        updateUserFailure : (state , action) => {
            state.error = action.payload,
            state.loading = false
        },
        deleteUserProfileStart : (state , action) => {
            state.loading = true            
        },
        deleteUserProfileSuccess : (state , action) => {
            state.loading = false,
            state.currentUser = null,
            state.error = null            
        },
        deleteUserProfileFailure : (state , action) => {
            state.loading = false,
            state.error = action.payload            
        },
     }
})



export const 
{
    signInStart, 
    signInSuccess , 
    signInFailure , 
    updateUserStart , 
    updateUserSuccess , 
    updateUserFailure , 
    saveTokenInLocalStorage,
    removeTokenInLocalStorage,
    deleteUserProfileStart,
    deleteUserProfileSuccess,
    deleteUserProfileFailure
} = userSlice.actions

export default userSlice.reducer