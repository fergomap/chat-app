import {combineReducers} from 'redux';
import userReducer from './user/reducer';
import chatReducer from './chat/reducer';

export const mainReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
});