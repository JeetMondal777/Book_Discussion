import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Slices/userSlice'; 
import isProfileOpenReducer from '../Slices/isProfileOpenSlice'; 
import isDiscussionPanelOpenReducer from '../Slices/isDiscussionPanelOpenSlice'; 
import searchReducer from "../Slices/searchSlice"


export default configureStore({
    reducer: {
    user: userReducer, // Add the slice(s) here
    isProfileOpen : isProfileOpenReducer ,
    isDiscussionPanelOpen : isDiscussionPanelOpenReducer ,
    search:searchReducer
        
    }
})