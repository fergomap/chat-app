import React, {FunctionComponent} from 'react';
import ChatsComponent from './components/chats/chats.component';
import HeaderComponent from './components/header/header.component';

const DashboardComponent: FunctionComponent = () => {
    return <div>
        <HeaderComponent/>
        <ChatsComponent/>
    </div>;
};

export default DashboardComponent;
