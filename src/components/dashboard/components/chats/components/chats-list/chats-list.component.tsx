import React, {FunctionComponent} from 'react';
import './chats-list.component.scss';
import Chat from 'model/chat';
import MainState from 'store/model/main.state';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {APP_CONSTANTS} from 'config/app.config';
import {SET_SHOW_CHAT_LIST_ACTION} from 'store/chat/actions';
import DispatchProps from 'model/dispatch.props';

interface ChatsListComponentProps {
    chats: Chat[];
    username: string;
}

const ChatsListComponent: FunctionComponent<ChatsListComponentProps & DispatchProps> = (props) => {

    const showChatList = (): void => {
        const setShowChatListAction = {...SET_SHOW_CHAT_LIST_ACTION};
        setShowChatListAction.showChatList = false;
        props.dispatch(setShowChatListAction);
    };

    return <div className="chats-list-component">
        <Link to={APP_CONSTANTS.ROUTES.CREATE_CHAT} onClick={showChatList}><button>Create chat</button></Link>
        { props.chats.map((chat: Chat, index: number) => {
            return <Link to={APP_CONSTANTS.ROUTES.CHATS + '/' + chat.id} onClick={showChatList} className="chat-item" key={index}>
                <img src={process.env.PUBLIC_URL + '/user.jpg'} alt="User"/>
                <div className="info">
                    <span className="username text-ellipsis">
                        { chat.id.replace(props.username, '').replace('-', '') }
                    </span>
                    <span className="last-message text-ellipsis">
                        { chat.messages[0] ? chat.messages[chat.messages.length - 1].message : '...'}
                    </span>
                </div>
            </Link>
        }) }
    </div>;
};

const mapStateToProps = (state: MainState): ChatsListComponentProps => ({
    username: state.user.username,
    chats: state.chat.chats
});

export default connect(mapStateToProps)(ChatsListComponent);