import MainAction from '../model/main.action';
import {ChatActionTypesEnum} from './types';
import ChatState from './model/chat.state';
import ChatStateImp from './model/chat.state.imp';
import {ReduxTypesEnum} from '../model/types';
import {SetChatsAction, AddChatAction, AddMessageAction, SetShowChatListAction} from './actions';
import Chat from 'model/chat';
import ChatImp from 'model/chat.imp';
import {APP_CONSTANTS} from 'config/app.config';

const initialState: ChatState = new ChatStateImp();

const chatReducer = (state = initialState, action: MainAction) => {
    switch (action.type) {
        case ReduxTypesEnum.RESET: {
            return new ChatStateImp();
        }
        case ChatActionTypesEnum.SET_CHATS: {
            const chats = (action as SetChatsAction).chats;
            localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE.CHATS, JSON.stringify(chats));

            return Object.assign({}, state, {
                chats
            });
        }
        case ChatActionTypesEnum.ADD_CHAT: {
            const chats = [...state.chats];
            chats.push((action as AddChatAction).chat);
            localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE.CHATS, JSON.stringify(chats));

            return Object.assign({}, state, {
                chats
            });
        }
        case ChatActionTypesEnum.ADD_MESSAGE: {
            const message = (action as AddMessageAction).message;
            const chats = [...state.chats];
            const chat = chats.find((c: Chat) => c.id === message.chatId);

            if (chat) {
                chat.messages.push(message);
            } else {
                chats.push(new ChatImp(message.chatId, message.emitter, message.receiver, [message]));
            }

            localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE.CHATS, JSON.stringify(chats));

            return Object.assign({}, state, {
                chats
            });
        }
        case ChatActionTypesEnum.SET_SHOW_CHAT_LIST: {
            return Object.assign({}, state, {
                showChatList: (action as SetShowChatListAction).showChatList
            });
        }
        default:
            return state;
    }
};

export default chatReducer;
