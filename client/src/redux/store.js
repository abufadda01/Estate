import {configureStore , combineReducers} from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import storage from "redux-persist/lib/storage"
import {persistReducer , persistStore} from "redux-persist"


// combineReducers({all other slices reducers})
// rootReducer will contain all slices reducers
const rootReducer = combineReducers({user : userReducer})


const persistConfig = {
    key : "root",
    storage ,
    version : 1
}


// to keep our redux state slices saved in the local storage so we can access them any time , with no need to re-dispatch the actions  
const persistedReducer = persistReducer(persistConfig , rootReducer)


export const store = configureStore({
    reducer : persistedReducer
    // to prevent any error in the browser
    // middleware : (getDefaultMiddleware) => {
    //     getDefaultMiddleware({
    //         serializableCheck : false 
    //     })
    // } 
})


export const persistor = persistStore(store)
