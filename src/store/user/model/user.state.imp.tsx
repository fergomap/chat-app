import UserState from './user.state';
import {APP_CONSTANTS} from 'config/app.config';

export default class UserStateImp implements UserState {
    username: string;
    chatListener?: EventSource;

    constructor(username: string = localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE.USERNAME) || '', chatListener?: EventSource) {
        this.username = username;
        this.chatListener = chatListener;
    }
}
