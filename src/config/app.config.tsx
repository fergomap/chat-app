interface AppConfig {
    ROUTES: {
        REGISTER: string;
        CHATS: string;
        CHAT: string;
        CREATE_CHAT: string;
    };
    ENDPOINTS: {
        CHECK_CLIENT_CONNECTED: string;
        LISTEN_CHATS: string;
        SEARCH_CLIENT: string;
        CREATE_CHAT: string;
        SEND_MESSAGE: string;
    };
    LOCAL_STORAGE: {
        USERNAME: string;
        CHATS: string;
    };
}

export const APP_CONSTANTS: AppConfig = {
    ROUTES: {
        REGISTER: '/register',
        CHATS: '/chats',
        CHAT: '/chats/:id',
        CREATE_CHAT: '/create-chat'
    },
    ENDPOINTS: {
        CHECK_CLIENT_CONNECTED: 'http://localhost:8000/check-client-connected/',
        LISTEN_CHATS: 'http://localhost:8000/chats/',
        SEARCH_CLIENT: 'http://localhost:8000/search-client/',
        CREATE_CHAT: 'http://localhost:8000/create-chat',
        SEND_MESSAGE: 'http://localhost:8000/message'
    },
    LOCAL_STORAGE: {
        USERNAME: 'username',
        CHATS: 'chats'
    }
};
