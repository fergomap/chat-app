import UserState from '../user/model/user.state';
import ChatState from '../chat/model/chat.state';

export default interface MainState {
    user: UserState;
    chat: ChatState;
}