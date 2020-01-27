import React, {ReactElement, FunctionComponent, useEffect} from 'react';
import './chats.component.scss';
import MainState from 'store/model/main.state';
import {connect} from 'react-redux';
import {JsonConvert} from 'json2typescript';
import ChatImp from 'model/chat.imp';
import MessageImp from 'model/message.imp';
import DispatchProps from 'model/dispatch.props';
import {ADD_MESSAGE_ACTION, SET_CHATS_ACTION} from 'store/chat/actions';
import {APP_CONSTANTS} from 'config/app.config';
import {SET_CHAT_LISTENER_ACTION} from 'store/user/actions';
import ChatsListComponent from './components/chats-list/chats-list.component';
import {Redirect, Route, Switch} from 'react-router';
import CreateChatComponent from './components/create-chat/create-chat.component';
import ChatComponent from './components/chat/chat.component';

const jsonConvert: JsonConvert = new JsonConvert();

interface ChatsComponentProps {
    username: string;
    showChatList: boolean;
}

const ChatsComponent: FunctionComponent<ChatsComponentProps & DispatchProps> = ({dispatch, username, showChatList}): ReactElement => {
    
    useEffect(() => {
        const chatListener = new EventSource(APP_CONSTANTS.ENDPOINTS.LISTEN_CHATS + username);
        const setChatListenerAction = {...SET_CHAT_LISTENER_ACTION};
        setChatListenerAction.chatListener = chatListener;
        dispatch(setChatListenerAction);

        chatListener.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (Array.isArray(data)) {
                const setChatsAction = {...SET_CHATS_ACTION};
                setChatsAction.chats = jsonConvert.deserializeArray(data, ChatImp);
                dispatch(setChatsAction);
            } else {
                const addMessageAction = {...ADD_MESSAGE_ACTION};
                addMessageAction.message = jsonConvert.deserializeObject(data, MessageImp);
                dispatch(addMessageAction);
            }
        };
    }, [username, dispatch]);

    
    return <div className={`chats-component ${!showChatList && 'chats-component-no-header'}`}>
        <div className={`chats-list ${!showChatList && 'hidden-mobile'}`}>
            <ChatsListComponent/>
        </div>
        <div className={`chat-info ${showChatList && 'hidden-mobile'}`}>
            <Switch>
                <Route path={APP_CONSTANTS.ROUTES.CREATE_CHAT} component={CreateChatComponent} />
                <Route path={APP_CONSTANTS.ROUTES.CHAT} component={ChatComponent} />
                <Redirect to={APP_CONSTANTS.ROUTES.CREATE_CHAT} />
            </Switch>
        </div>
    </div>;
}

const mapStateToProps = (state: MainState): ChatsComponentProps => ({
    username: state.user.username,
    showChatList: state.chat.showChatList
});

export default connect(mapStateToProps)(ChatsComponent);
