import {UserActionTypesEnum} from './types';
import MainAction from '../model/main.action';

export interface RegisterAction extends MainAction {
    username: string;
}

export interface SetChatListenerAction extends MainAction {
    chatListener?: EventSource;
}

export const REGISTER_ACTION: RegisterAction = {
    type: UserActionTypesEnum.REGISER,
    username: ''
};

export const SET_CHAT_LISTENER_ACTION: SetChatListenerAction = {
    type: UserActionTypesEnum.SET_CHAT_LISTENER,
    chatListener: undefined
};
