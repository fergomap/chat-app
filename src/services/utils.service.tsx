import Chat from 'model/chat';
import {APP_CONSTANTS} from 'config/app.config';
import ChatImp from 'model/chat.imp';
import {JsonConvert} from 'json2typescript';

const jsonConvert: JsonConvert = new JsonConvert();

export const getInitialChats = (): Chat[] => {
    if (!navigator.onLine) {
        return jsonConvert.deserializeArray(JSON.parse(localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE.CHATS) || '[]'), ChatImp);
    } else {
        return [];
    }
};
