import React, {FunctionComponent} from 'react';
import MainState from 'store/model/main.state';
import {connect} from 'react-redux';
import './header.component.scss';
import DispatchProps from 'model/dispatch.props';
import {RESET_ACTION} from 'store/model/main.action';
import {APP_CONSTANTS} from 'config/app.config';

interface HeaderComponentProps {
    chatListener?: EventSource;
    showChatList: boolean;
}

const HeaderComponent: FunctionComponent<HeaderComponentProps & DispatchProps> = (props) => {

    const logout = (): void => {
        localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE.CHATS);
        localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE.USERNAME);
        props.chatListener && props.chatListener.close();
        props.dispatch(RESET_ACTION);
    };

    return <div className={`header-component ${!props.showChatList && 'hidden-mobile'}`}>
        <h2>Chat App</h2>
        <button onClick={logout}>Log out</button>
    </div>;
};

const mapStateToProps = (state: MainState): HeaderComponentProps => ({
    chatListener: state.user.chatListener,
    showChatList: state.chat.showChatList
});

export default connect(mapStateToProps)(HeaderComponent);
