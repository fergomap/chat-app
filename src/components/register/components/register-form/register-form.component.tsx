import React, {FormEvent, ReactElement, FunctionComponent, useState, ChangeEvent} from 'react';
import './register-form.component.scss';
import axios from 'axios';
import DispatchProps from 'model/dispatch.props';
import {REGISTER_ACTION} from 'store/user/actions';
import {connect} from 'react-redux';
import {APP_CONSTANTS} from 'config/app.config';

const RegisterFormComponent: FunctionComponent<DispatchProps> = ({dispatch}): ReactElement => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const register = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (username.length < 3) {
            setError('At least 3 characters long.');
        } else {
            axios.get(APP_CONSTANTS.ENDPOINTS.CHECK_CLIENT_CONNECTED + username)
                .then(response => {
                    if (response.data) {
                        setError('Username already registered');
                    } else {
                        localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE.USERNAME, username);
                        const registerAction = {...REGISTER_ACTION};
                        registerAction.username = username;
                        dispatch(registerAction);
                    }
                });
        }
    };

    const changeUsername = (e: ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value);
        setError('');
    };

    return <div className="register-form-component">
        <form noValidate={true} onSubmit={register}>
            <h1>Register</h1>
            <input
                className={`${error ? 'input-error' : ''}`}
                placeholder="Set your username"
                value={username}
                onChange={changeUsername}
            />
            { error && <small className="error">{ error }</small> }
            <button>REGISTER</button>
        </form>
    </div>;
}

export default connect()(RegisterFormComponent);
