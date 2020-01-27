import React, {ChangeEvent, FormEvent, Fragment, FunctionComponent, useEffect, useState} from 'react';
import './create-chat.component.scss';
import axios from 'axios';
import {APP_CONSTANTS} from 'config/app.config';
import {connect} from 'react-redux';
import MainState from 'store/model/main.state';
import MessageImp from 'model/message.imp';
import moment from 'moment';
import {RouterProps} from 'react-router';
import DispatchProps from 'model/dispatch.props';
import {SET_SHOW_CHAT_LIST_ACTION} from 'store/chat/actions';
import GoBackHeader from '../go-back-header/go-back-header.component';

interface CreateChatComponentProps {
    username: string;
}

const CreateChatComponent: FunctionComponent<CreateChatComponentProps & RouterProps & DispatchProps> = (props) => {
    const [ searched, setSearched ] = useState(false);
    const [ searchUsername, setSearchUsername ] = useState('');
    const [ usernameError, setUsernameError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messageError, setMessageError ] = useState('');
    const [ results, setResults ] = useState([]);
    const [ createChat, setCreateChat ] = useState(false);
    const [ receiver, setReceiver ] = useState('');

    const setShowChatListAction = (): void => {
        props.dispatch(SET_SHOW_CHAT_LIST_ACTION);
    };

    useEffect(() => {
        window.addEventListener("popstate", setShowChatListAction);

        return () => {
            window.removeEventListener("popstate", setShowChatListAction);
        };
    });
    window.addEventListener("popstate", () => {
        props.dispatch(SET_SHOW_CHAT_LIST_ACTION);
    });

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        setSearchUsername(e.target.value);
        setUsernameError('');
        setSearched(false);
    };

    const onMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        setMessage(e.target.value);
        setMessageError('');
    };

    const searchUser = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (searchUsername.length < 3) {
            setUsernameError('At least 3 characters long.')
        } else {
            axios.get(APP_CONSTANTS.ENDPOINTS.SEARCH_CLIENT + props.username + '/' + searchUsername)
                .then(res => setResults(res.data))
                .catch(err => setUsernameError(err))
                .finally(() => setSearched(true));
        }
    };

    const selectReceiver = (receiver: string): void => {
        setReceiver(receiver);
        setCreateChat(true);
    };

    const sendFirstMessage = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!message.length) {
            setMessageError('The message cannot be empty.');
        } else {
            axios.post(APP_CONSTANTS.ENDPOINTS.CREATE_CHAT, { emitter: props.username, receiver })
                .then(res => {
                    const chatId = res.data.id;
                    axios.post(APP_CONSTANTS.ENDPOINTS.SEND_MESSAGE, new MessageImp(props.username, receiver, message, moment(), chatId))
                        .then(() => props.history.push(APP_CONSTANTS.ROUTES.CHATS + '/' + chatId))
                        .catch(err => setMessageError(err.response.data));
                })
                .catch(err => setMessageError(err.response.data));
        }
    };

    return <div className="create-chat-component">
        <GoBackHeader history={props.history} title="Create chat"/>
        { createChat ?
            <div>
                <form noValidate={true} onSubmit={sendFirstMessage}>
                    <h2>Send message to {receiver}</h2>
                    <input
                        className={`${messageError ? 'input-error' : ''}`}
                        placeholder="Type the first message"
                        value={message}
                        onChange={onMessageChange}
                    />
                    { messageError && <small className="error">{ messageError }</small> }
                    <button>SEND</button>
                    <button className="danger-button" onClick={() => setCreateChat(false)}>CANCEL</button>
                </form>
            </div> :
            <Fragment>
                <form noValidate={true} onSubmit={searchUser}>
                    <h2>Search user</h2>
                    <input
                        className={`${usernameError ? 'input-error' : ''}`}
                        placeholder="Search username"
                        value={searchUsername}
                        onChange={onUsernameChange}
                    />
                    { usernameError && <small className="error">{ usernameError }</small> }
                    <button>SEARCH</button>
                </form>
                { searched && <div className="results">
                    <h4>{ results.length ? `${results.length} user${results.length > 1 ? 's' : ''} found` : 'No user matches the query' }</h4>
                    { results.map((result: string, index: number) => {
                        return <span className="result" key={index} onClick={() => selectReceiver(result)}>{ result }</span>;
                    }) }
                </div> }
            </Fragment>
        }
    </div>;
};

const mapStateToProps = (state: MainState): CreateChatComponentProps => ({
    username: state.user.username
});

export default connect(mapStateToProps)(CreateChatComponent);
