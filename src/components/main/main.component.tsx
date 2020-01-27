import React, {ReactElement, FunctionComponent} from 'react';
import {connect} from 'react-redux';
import MainState from 'store/model/main.state';
import {BrowserRouter} from 'react-router-dom';
import RegisterComponent from '../register/register.component';
import DashboardComponent from '../dashboard/dashboard.component';

interface MainComponentProps {
    username: string;
}

const MainComponent: FunctionComponent<MainComponentProps> = ({username}): ReactElement => {
    return <BrowserRouter>
        { username ? <DashboardComponent/> : <RegisterComponent/> }
    </BrowserRouter>;
}

const mapStateToProps = (state: MainState): MainComponentProps => ({
    username: state.user.username
});

export default connect(mapStateToProps)(MainComponent);
