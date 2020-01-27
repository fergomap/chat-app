import {ChatActionTypesEnum} from './types';
import MainAction from '../model/main.action';
import Chat from 'model/chat';
import ChatImp from 'model/chat.imp';
import Message from 'model/message';
import MessageImp from 'model/message.imp';

export interface SetChatsAction extends MainAction {
    chats: Chat[];
}

export interface AddChatAction extends MainAction {
    chat: Chat;
}

export interface AddMessageAction extends MainAction {
    message: Message;
}

export interface SetShowChatListAction extends MainAction {
    showChatList: boolean;
}

export const SET_CHATS_ACTION: SetChatsAction = {
    type: ChatActionTypesEnum.SET_CHATS,
    chats: []
};

export const ADD_CHAT_ACTION: AddChatAction = {
    type: ChatActionTypesEnum.ADD_CHAT,
    chat: new ChatImp()
};

export const ADD_MESSAGE_ACTION: AddMessageAction = {
    type: ChatActionTypesEnum.ADD_MESSAGE,
    message: new MessageImp()
};

export const SET_SHOW_CHAT_LIST_ACTION: SetShowChatListAction = {
    type: ChatActionTypesEnum.SET_SHOW_CHAT_LIST,
    showChatList: true
};
