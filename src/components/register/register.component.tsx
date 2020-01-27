import React, {ReactElement, FunctionComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import RegisterFormComponent from './components/register-form/register-form.component';
import {APP_CONSTANTS} from 'config/app.config';

const RegisterComponent: FunctionComponent = (): ReactElement => {
    return <Switch>
        <Route path={APP_CONSTANTS.ROUTES.REGISTER} component={RegisterFormComponent} />
        <Redirect to={APP_CONSTANTS.ROUTES.REGISTER} />
    </Switch>;
}

export default RegisterComponent;
