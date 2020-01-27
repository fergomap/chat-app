import React, {ChangeEvent, FormEvent, FunctionComponent, useEffect, useState} from 'react';
import './chat.component.scss';
import {connect} from 'react-redux';
import MainState from 'store/model/main.state';
import {RouteComponentProps} from 'react-router';
import Chat from 'model/chat';
import ChatImp from 'model/chat.imp';
import Message from 'model/message';
import axios from 'axios';
import {APP_CONSTANTS} from 'config/app.config';
import MessageImp from 'model/message.imp';
import moment from 'moment';
import {SET_SHOW_CHAT_LIST_ACTION} from 'store/chat/actions';
import DispatchProps from 'model/dispatch.props';
import GoBackHeader from '../go-back-header/go-back-header.component';

interface ChatComponentProps {
    username: string;
    chats: Chat[];
}

const ChatComponent: FunctionComponent<ChatComponentProps & RouteComponentProps<{ id: string }> & DispatchProps> = (props) => {
    const [ chat, setChat ] = useState(new ChatImp());
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState(false);

    const setShowChatListAction = (): void => {
        props.dispatch(SET_SHOW_CHAT_LIST_ACTION);
    };

    useEffect(() => {
        window.addEventListener("popstate", setShowChatListAction);

        return () => {
            window.removeEventListener("popstate", setShowChatListAction);
        };
    }, []);

    useEffect(() => {
        setChat(props.chats.find((c: Chat) => c.id === props.match.params.id) || new ChatImp());
    }, [props.chats, props.match.params.id]);

    const changeMessage = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        setMessage(e.target.value);
        setError(false);
    };

    const sendMessage = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (message.length) {
            axios.post(APP_CONSTANTS.ENDPOINTS.SEND_MESSAGE, new MessageImp(props.username, chat.user1 === props.username ? chat.user2 : chat.user1, message, moment(), chat.id))
                .then(() => setMessage(''))
                .catch(err => console.log(err));
        } else {
            setError(true);
        }
    };

    return <div className="chat-component">
        <GoBackHeader history={props.history} title={chat.user1 === props.username ? chat.user2 : chat.user1}/>
        <div className="messages">
            { chat.messages.map((message: Message, index: number) => {
                return <div key={index} className={`message ${message.emitter === props.username ? 'sent-message' : 'received-message'}`}>
                    <span>{message.message}</span>
                    <span className="time">{message.timestamp.format('MM/DD/YYYY HH:mm')}</span>
                </div>
            }) }
        </div>
        <form className="message-input" onSubmit={sendMessage} noValidate={true}>
            <input
                className={`${error ? 'input-error' : ''}`}
                placeholder="Type a message"
                value={message}
                onChange={changeMessage}
            />
            <button>SEND</button>
        </form>
    </div>;
};

const mapStateToProps = (state: MainState): ChatComponentProps => ({
    chats: state.chat.chats,
    username: state.user.username
});

export default connect(mapStateToProps)(ChatComponent);
