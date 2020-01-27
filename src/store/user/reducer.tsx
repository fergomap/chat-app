import MainAction from '../model/main.action';
import {UserActionTypesEnum} from './types';
import UserState from './model/user.state';
import UserStateImp from './model/user.state.imp';
import {ReduxTypesEnum} from '../model/types';
import {RegisterAction, SetChatListenerAction} from './actions';

const initialState: UserState = new UserStateImp();

const userReducer = (state = initialState, action: MainAction) => {
    switch (action.type) {
        case ReduxTypesEnum.RESET: {
            return new UserStateImp();
        }
        case UserActionTypesEnum.REGISER: {
            return Object.assign({}, state, {
                username: (action as RegisterAction).username
            });
        }
        case UserActionTypesEnum.SET_CHAT_LISTENER: {
            return Object.assign({}, state, {
                chatListener: (action as SetChatListenerAction).chatListener
            });
        }
        default:
            return state;
    }
};

export default userReducer;
