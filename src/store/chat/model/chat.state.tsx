import Chat from 'model/chat';

export default interface ChatState {
    chats: Chat[];
    showChatList: boolean;
}